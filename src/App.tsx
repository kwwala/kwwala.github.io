function App() {
  const socials = [
    { label: 'YouTube', handle: '@imkwwala', href: 'https://youtube.com/@imkwwala' },
    { label: 'SoundCloud', handle: '/imkwwala', href: 'https://soundcloud.com/imkwwala' },
    { label: 'X', handle: '@imkwwala', href: 'https://x.com/imkwwala' },
    { label: 'Bluesky', handle: 'imkwwala.bsky.social', href: 'https://bsky.app/profile/imkwwala.bsky.social' },
    { label: 'TikTok', handle: '@imkwwala', href: 'https://www.tiktok.com/@imkwwala' },
    { label: 'Instagram', handle: '@imkwwala', href: 'https://instagram.com/imkwwala' },
    { label: 'LinkTree', handle: '/imkwwala', href: 'https://linktr.ee/imkwwala' },
  ]

  const bio =
  'Brazilian internet creator. ambient/trap under kwwala² + notkwwala, video edits online, always sliding between portuguese and english.'

  const sessions = [
    '00:09 booting synth pads + street ambience',
    '00:33 testing clipped 808 + soft room reverb',
    '01:14 exporting video edits with frame-precise cuts',
    '02:22 dropping snippets under kwwala² / notkwwala',
    '03:05 posting drafts, reading replies, looping again',
  ]

  return (
    <main className="design-fade relative min-h-screen overflow-hidden bg-[#070707] px-5 py-12 text-zinc-100 sm:px-10">
      <div className="scanlines pointer-events-none absolute inset-0 opacity-15" />
      <div className="relative mx-auto max-w-5xl font-mono">
        <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">session log</p>
        <h1 className="mt-3 text-[clamp(2.4rem,7vw,5.2rem)] leading-tight">
          kwwala<span className="text-[#33cc99]">::online</span>
        </h1>
        <p className="mt-2 text-sm text-zinc-400">@imkwwala</p>
        <p className="mt-6 max-w-3xl text-sm leading-relaxed text-zinc-300">{bio}</p>
        <ol className="mt-8 space-y-5 border-l border-white/20 pl-4">
          {sessions.map((session) => (
            <li key={session} className="relative">
              <span className="absolute -left-[22px] top-[5px] h-2 w-2 rounded-full bg-[#33cc99]" />
              <p className="text-sm text-zinc-200">{session}</p>
            </li>
          ))}
        </ol>
      </div>
      <div className="relative mt-12 overflow-hidden border-y border-white/15 bg-black/50 py-3 font-mono text-xs uppercase tracking-[0.16em] text-zinc-300">
        <div className="ticker-track flex w-max items-center gap-10 px-5">
          {[...socials, ...socials].map((social, index) => (
            <a
              key={`${social.label}-${index}`}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              className="transition hover:text-[#33cc99]"
            >
              {social.label} {social.handle}
            </a>
          ))}
        </div>
      </div>
    </main>
  )
}

export default App