import { Mail, Phone } from "lucide-react";
import { site } from "@/config/site";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/icons";

/**
 * Footer — slim bar matching the Aug 5 mockup: GK. logo, copyright,
 * social icons. Every contact value resolves from config/site.ts.
 */
export function Footer() {
  const year = new Date().getFullYear();

  const socials = [
    {
      label: `${site.name} on LinkedIn`,
      href: site.linkedin,
      icon: LinkedInIcon,
      external: true,
    },
    {
      label: `${site.name} on GitHub`,
      href: site.github,
      icon: GitHubIcon,
      external: true,
    },
    { label: `Email ${site.name}`, href: site.emailHref, icon: Mail, external: false },
    { label: `Call ${site.name}`, href: site.phoneHref, icon: Phone, external: false },
  ];

  return (
    <footer className="relative border-t">
      <div className="container-x flex flex-col items-center justify-between gap-4 py-7 sm:flex-row">
        <a
          href="#top"
          aria-label={`${site.name} — back to top`}
          className="font-display text-xl font-bold transition-transform duration-small hover:scale-105"
        >
          <span className="text-gradient">GK</span>
          <span className="text-primary">.</span>
        </a>

        <p className="order-last text-caption text-muted sm:order-none">
          © {year} {site.name}. All rights reserved.
        </p>

        <div className="flex items-center gap-2">
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
                className="inline-flex size-10 items-center justify-center rounded-full border text-muted transition-all duration-micro hover:-translate-y-0.5 hover:border-primary/60 hover:text-primary"
              >
                <Icon className="size-[18px]" aria-hidden />
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
