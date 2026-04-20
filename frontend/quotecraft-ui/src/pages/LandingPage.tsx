import { Link } from "react-router-dom";


const featureCards = [
  {
    title: 'AI Quote Generation',
    description: 'Create high-quality quotes instantly by selecting topic, tone, and style.'
  },
  {
    title: 'Shareable Quote Cards',
    description: 'Export polished cards as PNG with one click for social-ready content.'
  },
  {
    title: 'Personal Library',
    description: 'Save, favorite, and filter your quotes with pagination and quick access.'
  }
];

export default function LandingPage() {
  return (
    <>
    <section className="mx-auto flex w-full max-w-6xl flex-col items-center px-6 pt-36 text-center md:px-12 lg:px-20">
        <div className="inline-flex items-center gap-2
         rounded-full border border-slate-300 bg-white/70 px-4 py-1.5
          dark:border-slate-700 dark:bg-slate-900/50">
          <p className="text-xs text-slate-600 dark:text-slate-300">Join community of 1m+ founders</p>
        </div>
        <h1 className="mt-4 max-w-3xl text-5xl font-semibold leading-[1.2] md:text-6xl">
          Every brand grows faster with a{' '}
          <span className="bg-gradient-to-r from-[#923FEF] to-[#C35DE8] bg-clip-text text-transparent">
            quote engine
          </span>
        </h1>
        <p className="mt-4 max-w-2xl text-base text-slate-600 dark:text-slate-300">
          QuoteCraft AI helps you generate, organize, and publish premium quote content in minutes.
        </p>

        <div className="mt-8 flex items-center gap-4">
          <Link to="/login" className="button primary px-6 py-2.5">
            Get Started
          </Link>
          <a href="#features" className="button secondary px-6 py-2.5">
            Explore Features
          </a>
        </div>
    </section>
    <section id="generate" className="mx-auto mt-24 w-full max-w-6xl px-6 md:px-12 lg:px-20">
        <div className="rounded-2xl border border-slate-200 bg-white/80 p-8 dark:border-slate-800 dark:bg-slate-900/45">
          <p className="eyebrow">Generate</p>
          <h2 className="mt-2 text-3xl font-semibold">Write powerful quotes with one prompt</h2>
          <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-300">
            Move from idea to final quote in seconds. Pick your tone, topic, and style and let AI do
            the heavy lifting.
          </p>
        </div>
    </section>

    <section id="community" className="mx-auto mt-16 w-full max-w-6xl px-6 md:px-12 lg:px-20">
       <div className="rounded-2xl border border-slate-200 bg-white/80 p-8 dark:border-slate-800 dark:bg-slate-900/45">
          <p className="eyebrow">Community</p>
          <h2 className="mt-2 text-3xl font-semibold">Built for creators and teams</h2>
          <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-300">
            Whether you are a solo founder or marketing team, QuoteCraft keeps your messaging
            consistent and publish-ready.
          </p>
        </div>
    </section>

    <section id="features" className="mx-auto mt-16 w-full max-w-6xl px-6 md:px-12 lg:px-20">
        <p className="eyebrow text-center">Features</p>
        <h2 className="mt-2 text-center text-3xl font-semibold">Everything to ship quote content</h2>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
            {featureCards.map((card) => (
                <article
              key={card.title}
              className="rounded-xl border border-slate-200
               bg-white/90 p-6 dark:border-slate-800 dark:bg-slate-900/45"
            >
              <h3 className="text-base font-semibold">{card.title}</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{card.description}</p>
            </article>
            ))}
        </div>
    </section>

    <section id="pricing" className="mx-auto mt-16 w-full max-w-6xl px-6 pb-24 md:px-12 lg:px-20">
        <div className="rounded-2xl border border-slate-200 bg-white/90 p-8 text-center dark:border-slate-800 dark:bg-slate-900/45">
          <p className="eyebrow">Pricing</p>
          <h2 className="mt-2 text-3xl font-semibold">Start free, scale as you grow</h2>
          <p className="mx-auto mt-3 max-w-xl text-slate-600 dark:text-slate-300">
            Get started with core generation features at no cost and upgrade when your publishing
            volume increases.
          </p>
          <Link to="/login" className="button primary mx-auto mt-7 w-fit px-6 py-2.5">
            Get Started
          </Link>
        </div>
      </section>
    </>
  )
}