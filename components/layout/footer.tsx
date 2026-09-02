import { Mail, Phone } from "lucide-react";
import { navLinks } from "@/config/content";
import { site } from "@/config/site";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/icons";
import { Signature } from "@/components/ui/signature";

/**
 * Footer — minimal luxury signoff: GK. mark + signature, quick nav,
 * copyright, socials.
 */
export function Footer() {
  const year = new Date().getFullYear();

  const socials = [
    { label: `${site.name} on LinkedIn`, href: site.linkedin, icon: LinkedInIcon, external: true },
    { label: `${site.name} on GitHub`, href: site.github, icon: GitHubIcon, external: true },
    { label: `Email ${site.name}`, href: site.emailHref, icon: Mail, external: false },
    { label: `Call ${site.name}`, href: site.phoneHref, icon: Phone, external: false },
  ];

  return (
    <footer className="section-line relative">
      <div className="container-x flex flex-col items-center gap-8 py-10">
        <div className="flex w-full flex-col items-center justify-between gap-8 sm:flex-row">
          <div className="flex flex-col items-center gap-2 sm:items-start">
            <a
              href="#top"
              aria-label={`${site.name} — back to top`}
              className="font-display text-[22px] font-semibold tracking-tight"
            >
              <span className="text-text">GK</span>
              <span className="text-gold-500">.</span>
            </a>
            <Signature
              text="Gokula Krishnan RG"
              className="text-[19px] leading-[1.4] opacity-80"
            />
          </div>

          <nav aria-label="Footer" className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
            {navLinks.slice(1).map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[13px] font-medium text-muted transition-colors duration-micro hover:text-gold-300"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            {socials.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  {...(social.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  aria-label={social.label}
                  className="neu-control inline-flex size-10 items-center justify-center rounded-full text-muted transition-all duration-small hover:-translate-y-0.5 hover:text-gold-300"
                >
                  <Icon className="size-[17px]" aria-hidden />
                </a>
              );
            })}
          </div>
        </div>

        <p className="w-full border-t border-gold-500/10 pt-6 text-center text-[12.5px] text-muted/80">
          © {year} {site.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
