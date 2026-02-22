import { BrowserRouter, Navigate, NavLink, Route, Routes } from 'react-router-dom'

type Social = {
  label: string
  handle: string
  href: string
}

const socials: Social[] = [
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

const routes = ['1', '2', '3', '4', '5']

function RouteSwitcher() {
  return (
    <nav className="fixed bottom-5 left-1/2 z-40 -translate-x-1/2 rounded-full border border-white/15 bg-black/70 px-2 py-1 text-xs backdrop-blur">
      <ul className="flex items-center gap-1 font-mono">
        {routes.map((routeId) => (
          <li key={routeId}>
            <NavLink
              to={`/${routeId}`}
              className={({ isActive }) =>
                `flex h-7 w-7 items-center justify-center rounded-full transition ${
                  isActive ? 'bg-[#33cc99] text-black' : 'text-zinc-300 hover:bg-white/10'
                }`
              }
            >
              {routeId}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}

function DesignOne() {
  return (
    <main className="design-fade relative min-h-screen overflow-hidden bg-[#060807] px-6 py-14 text-zinc-100 sm:px-12">
      <div className="grain pointer-events-none absolute inset-0 opacity-25" />
      <div className="relative mx-auto max-w-4xl font-lofi text-[clamp(1.4rem,2.9vw,2.1rem)] leading-none">
        <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">personal corner / internet 24-7</p>
        <h1 className="mt-4 text-[clamp(4rem,17vw,11rem)] text-[#33cc99]">kwwala</h1>
        <p className="mt-1 text-[clamp(1.4rem,2.4vw,2rem)] text-zinc-300">@imkwwala</p>
        <p className="mt-8 max-w-2xl text-zinc-200">{bio}</p>
        <ul className="mt-10 grid gap-2 sm:grid-cols-2">
          {socials.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-zinc-200 transition hover:text-[#33cc99]"
              >
                <span className="text-[#33cc99]">-&gt;</span>
                {social.label} {social.handle}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}

function DesignTwo() {
  return (
    <main className="design-fade relative min-h-screen overflow-hidden bg-[#030504] px-6 py-12 text-zinc-100">
      <div className="pointer-events-none absolute -left-24 top-6 h-80 w-80 rounded-full bg-[#33cc99]/14 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 right-6 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
      <div className="relative mx-auto flex max-w-6xl flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <section className="max-w-xl font-wave">
          <p className="text-xs uppercase tracking-[0.34em] text-zinc-500">kwwala archive</p>
          <h1 className="mt-3 text-[clamp(2.9rem,8vw,6.5rem)] leading-[0.9]">kwwala</h1>
          <p className="mt-1 text-lg text-[#33cc99]">@imkwwala</p>
          <p className="mt-6 text-sm leading-relaxed text-zinc-300">{bio}</p>
          <div className="mt-8 flex flex-wrap gap-2 text-xs uppercase tracking-[0.14em] text-zinc-300">
            <span className="rounded-full border border-white/15 px-3 py-1">ambient/trap</span>
            <span className="rounded-full border border-white/15 px-3 py-1">kwwala²</span>
            <span className="rounded-full border border-white/15 px-3 py-1">notkwwala</span>
            <span className="rounded-full border border-white/15 px-3 py-1">video editing</span>
          </div>
        </section>
        <section className="w-full max-w-[460px] font-wave">
          <div className="float relative aspect-square rounded-[2rem] border border-white/20 bg-gradient-to-br from-[#33cc99]/35 via-black to-black p-6 shadow-[0_40px_100px_-50px_rgba(51,204,153,0.9)]">
            <div className="h-full rounded-[1.4rem] border border-white/15 bg-black/55 p-6">
              <p className="text-xs uppercase tracking-[0.28em] text-zinc-400">latest mood</p>
              <p className="mt-4 text-4xl font-semibold leading-none">soft rain + 808</p>
              <p className="mt-3 text-sm text-zinc-300">mixing at night, editing in daylight. always online.</p>
            </div>
          </div>
          <ul className="mt-5 grid grid-cols-2 gap-2 text-sm">
            {socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-full items-center justify-between rounded-lg border border-white/15 bg-black/45 px-3 py-2 transition hover:border-[#33cc99]/70 hover:text-[#33cc99]"
                >
                  <span>{social.label}</span>
                  <span className="text-zinc-500">+</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  )
}

function DesignThree() {
  return (
    <main className="design-fade relative min-h-screen overflow-hidden bg-[#06070c] px-5 py-12 text-zinc-100 sm:px-9">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_10%,rgba(51,204,153,0.1),transparent_45%),radial-gradient(circle_at_95%_90%,rgba(255,255,255,0.1),transparent_50%)]" />
      <div className="relative mx-auto max-w-6xl font-editorial">
        <header className="max-w-3xl">
          <h1 className="text-[clamp(2.8rem,8vw,6rem)] font-semibold tracking-tight">kwwala</h1>
          <p className="mt-1 text-sm uppercase tracking-[0.22em] text-[#33cc99]">@imkwwala</p>
          <p className="mt-5 text-zinc-300">{bio}</p>
        </header>
        <div className="mt-9 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
          <section className="grid gap-4 sm:grid-cols-2">
            <article className="rounded-2xl border border-white/15 bg-black/45 p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">pt-br</p>
              <p className="mt-3 leading-relaxed">
                faixas calmas, graves pesados, e vídeos com corte preciso. esse site é tipo meu quarto na internet.
              </p>
            </article>
            <article className="rounded-2xl border border-white/15 bg-black/45 p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">en-us</p>
              <p className="mt-3 leading-relaxed">
                ambient haze, trap pulse, and edits made for scrolling culture. this is just my low-light online room.
              </p>
            </article>
            <article className="rounded-2xl border border-[#33cc99]/30 bg-[#33cc99]/8 p-5 sm:col-span-2">
              <p className="text-xs uppercase tracking-[0.2em] text-[#33cc99]">aliases</p>
              <p className="mt-3 text-lg">kwwala² / notkwwala</p>
            </article>
          </section>
          <aside className="rounded-2xl border border-white/15 bg-black/55 p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">links</p>
            <ul className="mt-3 space-y-2">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between rounded-md border border-transparent px-2 py-1 transition hover:border-[#33cc99]/50 hover:bg-white/5"
                  >
                    <span>{social.label}</span>
                    <span className="text-zinc-500">{social.handle}</span>
                  </a>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </main>
  )
}

function DesignFour() {
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

function DesignFive() {
  return (
    <main className="design-fade relative min-h-screen overflow-hidden bg-[#050607] px-5 py-10 text-zinc-100 sm:px-9">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_8%_18%,rgba(51,204,153,0.1),transparent_40%),radial-gradient(circle_at_90%_6%,rgba(255,255,255,0.08),transparent_45%)]" />
      <div className="relative mx-auto max-w-6xl font-serif">
        <header className="rounded-2xl border border-white/15 bg-black/45 p-6 backdrop-blur-sm">
          <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">personal site</p>
          <h1 className="mt-2 text-[clamp(3rem,9vw,6.7rem)] leading-[0.9]">kwwala</h1>
          <p className="mt-1 text-base italic text-[#33cc99]">@imkwwala</p>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-zinc-300">{bio}</p>
        </header>
        <section className="mt-4 grid gap-4 md:grid-cols-2">
          <article className="rounded-2xl border border-white/15 bg-black/35 p-5 backdrop-blur-sm">
            <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">currently</p>
            <p className="mt-3 text-2xl leading-tight">editing videos + sculpting ambient trap textures.</p>
          </article>
          <article className="rounded-2xl border border-white/15 bg-black/35 p-5 backdrop-blur-sm">
            <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">music names</p>
            <p className="mt-3 text-2xl">kwwala², notkwwala.</p>
          </article>
          <article className="rounded-2xl border border-white/15 bg-black/35 p-5 backdrop-blur-sm md:col-span-2">
            <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">everywhere</p>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="block rounded-lg border border-white/15 px-3 py-2 text-sm transition hover:border-[#33cc99]/65 hover:text-[#33cc99]"
                  >
                    {social.label}
                    <span className="mt-1 block text-xs text-zinc-500">{social.handle}</span>
                  </a>
                </li>
              ))}
            </ul>
          </article>
        </section>
      </div>
    </main>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DesignFour />} />
        <Route path="/1" element={<DesignOne />} />
        <Route path="/2" element={<DesignTwo />} />
        <Route path="/3" element={<DesignThree />} />
        <Route path="/4" element={<DesignFour />} />
        <Route path="/5" element={<DesignFive />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <RouteSwitcher />
    </BrowserRouter>
  )
}

export default App
