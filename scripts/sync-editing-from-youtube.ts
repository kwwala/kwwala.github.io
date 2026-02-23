import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const DEFAULT_PLAYLIST_ID = "PLlwe9mu279CgLWky8z6HyxXBYaNrifyfi";
const DEFAULT_MAX_VIDEOS_PER_CREATOR = 24;
const FALLBACK_AVATAR_URL = "https://placehold.co/96x96/141414/ebebeb?text=YT";

const SNAPSHOT_PATH = resolve(
  process.cwd(),
  "src/app/data/generated/editing.snapshot.json",
);

type CreatorVideo = {
  id: string;
  title: string;
  videoId: string;
  thumbnailUrl: string;
  videoUrl: string;
  position: number;
};

type EditingCreator = {
  id: string;
  name: string;
  channelId: string;
  channelUrl: string;
  avatarUrl: string;
  playlistUrl: string;
  videos: CreatorVideo[];
};

type EditingSnapshot = {
  playlistId: string;
  generatedAt: string;
  creators: EditingCreator[];
};

type ThumbnailSet = {
  default?: { url?: string };
  medium?: { url?: string };
  high?: { url?: string };
  standard?: { url?: string };
  maxres?: { url?: string };
};

type PlaylistItem = {
  snippet?: {
    title?: string;
    position?: number;
    channelId?: string;
    channelTitle?: string;
    videoOwnerChannelId?: string;
    videoOwnerChannelTitle?: string;
    thumbnails?: ThumbnailSet;
    resourceId?: {
      videoId?: string;
    };
  };
  contentDetails?: {
    videoId?: string;
  };
};

type PlaylistItemsResponse = {
  items?: PlaylistItem[];
  nextPageToken?: string;
  error?: {
    message?: string;
  };
};

type ChannelItem = {
  id?: string;
  snippet?: {
    title?: string;
    thumbnails?: ThumbnailSet;
  };
};

type ChannelsResponse = {
  items?: ChannelItem[];
  error?: {
    message?: string;
  };
};

type FlatVideo = {
  channelId: string;
  channelTitle: string;
  videoId: string;
  title: string;
  thumbnailUrl: string;
  position: number;
};

const resolveThumbnailUrl = (thumbnails?: ThumbnailSet): string | null => {
  return (
    thumbnails?.maxres?.url ??
    thumbnails?.standard?.url ??
    thumbnails?.high?.url ??
    thumbnails?.medium?.url ??
    thumbnails?.default?.url ??
    null
  );
};

const chunk = <T,>(items: T[], size: number): T[][] => {
  const chunks: T[][] = [];

  for (let i = 0; i < items.length; i += size) {
    chunks.push(items.slice(i, i + size));
  }

  return chunks;
};

const parsePositiveInteger = (value: string | undefined, fallback: number): number => {
  const parsed = Number.parseInt((value ?? "").trim(), 10);

  if (!Number.isFinite(parsed) || parsed <= 0) {
    return fallback;
  }

  return parsed;
};

const fetchJson = async <T>(url: URL): Promise<T> => {
  const response = await fetch(url);

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`HTTP ${response.status} ${response.statusText}: ${body}`);
  }

  return (await response.json()) as T;
};

const fetchAllPlaylistItems = async (
  playlistId: string,
  apiKey: string,
): Promise<FlatVideo[]> => {
  const flatVideos: FlatVideo[] = [];
  let pageToken: string | undefined;

  do {
    const url = new URL("https://youtube.googleapis.com/youtube/v3/playlistItems");
    url.searchParams.set("part", "snippet,contentDetails");
    url.searchParams.set("maxResults", "50");
    url.searchParams.set("playlistId", playlistId);
    url.searchParams.set("key", apiKey);

    if (pageToken) {
      url.searchParams.set("pageToken", pageToken);
    }

    const data = await fetchJson<PlaylistItemsResponse>(url);

    if (data.error?.message) {
      throw new Error(data.error.message);
    }

    for (const item of data.items ?? []) {
      const videoId =
        item.contentDetails?.videoId ?? item.snippet?.resourceId?.videoId ?? "";
      const channelId =
        item.snippet?.videoOwnerChannelId ?? item.snippet?.channelId ?? "";
      const channelTitle =
        item.snippet?.videoOwnerChannelTitle?.trim() ||
        item.snippet?.channelTitle?.trim() ||
        "Unknown channel";
      const title = item.snippet?.title?.trim() || "Untitled video";
      const position = item.snippet?.position ?? Number.MAX_SAFE_INTEGER;

      if (!videoId || !channelId) {
        continue;
      }

      const thumbnailUrl =
        resolveThumbnailUrl(item.snippet?.thumbnails) ??
        `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

      flatVideos.push({
        channelId,
        channelTitle,
        videoId,
        title,
        thumbnailUrl,
        position,
      });
    }

    pageToken = data.nextPageToken;
  } while (pageToken);

  return flatVideos;
};

const fetchChannelMeta = async (
  channelIds: string[],
  apiKey: string,
): Promise<Map<string, { name: string; avatarUrl: string }>> => {
  const result = new Map<string, { name: string; avatarUrl: string }>();

  for (const idsChunk of chunk(channelIds, 50)) {
    const url = new URL("https://youtube.googleapis.com/youtube/v3/channels");
    url.searchParams.set("part", "snippet");
    url.searchParams.set("id", idsChunk.join(","));
    url.searchParams.set("maxResults", "50");
    url.searchParams.set("key", apiKey);

    const data = await fetchJson<ChannelsResponse>(url);

    if (data.error?.message) {
      throw new Error(data.error.message);
    }

    for (const item of data.items ?? []) {
      const id = item.id;

      if (!id) {
        continue;
      }

      result.set(id, {
        name: item.snippet?.title?.trim() || "Unknown channel",
        avatarUrl: resolveThumbnailUrl(item.snippet?.thumbnails) ?? FALLBACK_AVATAR_URL,
      });
    }
  }

  return result;
};

const buildCreators = (
  flatVideos: FlatVideo[],
  channelMeta: Map<string, { name: string; avatarUrl: string }>,
  playlistId: string,
  maxVideosPerCreator: number,
): EditingCreator[] => {
  const buckets = new Map<
    string,
    {
      firstPosition: number;
      fallbackName: string;
      videos: FlatVideo[];
    }
  >();

  for (const video of flatVideos) {
    const existing = buckets.get(video.channelId);

    if (existing) {
      existing.firstPosition = Math.min(existing.firstPosition, video.position);
      existing.videos.push(video);
      continue;
    }

    buckets.set(video.channelId, {
      firstPosition: video.position,
      fallbackName: video.channelTitle,
      videos: [video],
    });
  }

  return [...buckets.entries()]
    .sort((a, b) => a[1].firstPosition - b[1].firstPosition)
    .map(([channelId, bucket]) => {
      const meta = channelMeta.get(channelId);
      const name = meta?.name || bucket.fallbackName || "Unknown channel";
      const avatarUrl = meta?.avatarUrl || FALLBACK_AVATAR_URL;
      const sortedVideos = [...bucket.videos]
        .sort((a, b) => a.position - b.position)
        .slice(0, maxVideosPerCreator)
        .map((video) => ({
          id: `${channelId}-${video.videoId}-${video.position}`,
          title: video.title,
          videoId: video.videoId,
          thumbnailUrl: video.thumbnailUrl,
          videoUrl: `https://www.youtube.com/watch?v=${video.videoId}`,
          position: video.position,
        }));

      return {
        id: channelId,
        name,
        channelId,
        channelUrl: `https://www.youtube.com/channel/${channelId}`,
        avatarUrl,
        playlistUrl: `https://www.youtube.com/playlist?list=${playlistId}`,
        videos: sortedVideos,
      };
    });
};

const writeSnapshot = async (snapshot: EditingSnapshot): Promise<void> => {
  await mkdir(dirname(SNAPSHOT_PATH), { recursive: true });
  await writeFile(SNAPSHOT_PATH, `${JSON.stringify(snapshot, null, 2)}\n`, "utf8");
};

const run = async (): Promise<void> => {
  const apiKey = (process.env.YOUTUBE_API_KEY ?? "").trim();
  const playlistId =
    (process.env.YOUTUBE_PLAYLIST_ID ?? "").trim() || DEFAULT_PLAYLIST_ID;
  const maxVideosPerCreator = parsePositiveInteger(
    process.env.EDITING_MAX_VIDEOS_PER_CREATOR,
    DEFAULT_MAX_VIDEOS_PER_CREATOR,
  );

  if (!apiKey) {
    console.warn(
      "[sync:editing] YOUTUBE_API_KEY is not set. Skipping sync and keeping existing snapshot.",
    );
    return;
  }

  const flatVideos = await fetchAllPlaylistItems(playlistId, apiKey);

  if (!flatVideos.length) {
    throw new Error("Playlist returned no valid videos.");
  }

  const uniqueChannelIds = [...new Set(flatVideos.map((video) => video.channelId))];
  const channelMeta = await fetchChannelMeta(uniqueChannelIds, apiKey);
  const creators = buildCreators(
    flatVideos,
    channelMeta,
    playlistId,
    maxVideosPerCreator,
  );

  const snapshot: EditingSnapshot = {
    playlistId,
    generatedAt: new Date().toISOString(),
    creators,
  };

  await writeSnapshot(snapshot);

  console.log(
    `[sync:editing] Snapshot updated at ${SNAPSHOT_PATH} (${creators.length} creators, ${flatVideos.length} videos).`,
  );
};

run().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  console.warn(
    `[sync:editing] Sync failed (${message}). Keeping existing snapshot as fallback.`,
  );
});
