import { Mail, Phone } from "lucide-react";
import { site } from "@/config/site";
import { navLinks } from "@/config/content";
import { LinkedInIcon } from "@/components/ui/icons";
import { ResumeButton } from "@/components/ui/resume-button";

/**
 * Footer (Master Prompt Sections 7, 9).
 * Every contact value resolves from config/site.ts.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t">
      <div className="container-x grid gap-12 py-16 md:grid-cols-3">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2.5">
            <span className="flex size-9 items-center justify-center rounded-md bg-gradient-to-br from-primary to-secondary font-display text-sm font-bold text-white">
              GK
            </span>
            <div className="flex flex-col leading-tight">
              <span className="font-display text-sm font-semibold">{site.name}</span>
              <span className="text-xs text-muted">{site.role}</span>
            </div>
          </div>
          <p className="max-w-xs text-caption text-muted">{site.tagline}</p>
          <div className="flex items-center gap-2">
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${site.name} on LinkedIn`}
              className="inline-flex size-10 items-center justify-center rounded-md border text-muted transition-colors duration-micro hover:border-primary/60 hover:text-primary"
            >
              <LinkedInIcon className="size-5" />
            </a>
            <a
              href={site.emailHref}
              aria-label={`Email ${site.name}`}
              className="inline-flex size-10 items-center justify-center rounded-md border text-muted transition-colors duration-micro hover:border-primary/60 hover:text-primary"
            >
              <Mail className="size-5" aria-hidden />
            </a>
            <a
              href={site.phoneHref}
              aria-label={`Call ${site.name}`}
              className="inline-flex size-10 items-center justify-center rounded-md border text-muted transition-colors duration-micro hover:border-primary/60 hover:text-primary"
            >
              <Phone className="size-5" aria-hidden />
            </a>
          </div>
        </div>

        <nav aria-label="Footer" className="flex flex-col gap-4">
          <p className="font-display text-sm font-semibold uppercase tracking-[0.14em] text-muted">
            Explore
          </p>
          <ul className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-muted transition-colors duration-micro hover:text-primary"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col gap-4">
          <p className="font-display text-sm font-semibold uppercase tracking-[0.14em] text-muted">
            Contact
          </p>
          <ul className="flex flex-col gap-2 text-sm">
            <li>
              <a
                href={site.emailHref}
                className="text-muted transition-colors duration-micro hover:text-primary"
              >
                {site.email}
              </a>
            </li>
            <li>
              <a
                href={site.phoneHref}
                className="text-muted transition-colors duration-micro hover:text-primary"
              >
                {site.phone}
              </a>
            </li>
            <li className="text-muted">{site.location}</li>
          </ul>
          <ResumeButton variant="secondary" size="sm" className="w-fit" />
        </div>
      </div>

      <div className="border-t">
        <div className="container-x flex flex-col items-center justify-between gap-2 py-6 text-caption text-muted sm:flex-row">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <p>Designed &amp; built with Next.js, GSAP and Three.js</p>
        </div>
      </div>
    </footer>
  );
}
