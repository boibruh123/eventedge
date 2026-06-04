import Link from "next/link";

type Section = {
  title: string;
  body: string[];
};

export function LegalPage({ title, updated, sections }: { title: string; updated: string; sections: Section[] }) {
  return (
    <main className="min-h-screen bg-night px-5 py-8 text-white">
      <div className="mx-auto max-w-4xl">
        <Link href="/" className="text-sm font-bold text-primary">
          Back to game
        </Link>
        <h1 className="mt-5 text-4xl font-black">{title}</h1>
        <p className="mt-2 text-sm text-slate-400">Last updated: {updated}</p>
        <div className="mt-6 rounded-[8px] border border-accent/30 bg-accent/10 p-4 text-sm leading-6 text-orange-100">
          This page is a practical template for the MVP and not legal advice. Have a qualified attorney review it before running paid ads, collecting account data, or scaling traffic.
        </div>
        <div className="mt-8 space-y-6">
          {sections.map((section) => (
            <section key={section.title} className="glass rounded-[8px] p-5">
              <h2 className="text-2xl font-black">{section.title}</h2>
              <div className="mt-3 space-y-3 text-sm leading-7 text-slate-300">
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
