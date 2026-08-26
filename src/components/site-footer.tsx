import { nav, site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-navy-600 py-12 text-white">
      <div className="container">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo-white-text.svg"
              alt={site.company}
              width={180}
              height={72}
              className="h-10 w-auto"
            />
            <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-white/55">
              Marketing strategy, execution, and applied AI for practices that want to grow
              without losing what makes them worth choosing.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-7 gap-y-3" aria-label="Footer">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="font-display text-[15px] font-semibold text-white/60 transition-colors hover:text-orange"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-7 text-sm text-white/45 md:flex-row md:items-center md:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {site.company}. Built with excellence.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <a href={`mailto:${site.email}`} className="transition-colors hover:text-orange">
              {site.email}
            </a>
            <span>{site.location}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
