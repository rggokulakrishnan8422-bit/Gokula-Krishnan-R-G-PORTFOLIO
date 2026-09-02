"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Check, Copy, Mail, MapPin, Phone, Send } from "lucide-react";
import { site } from "@/config/site";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { LinkedInIcon, GitHubIcon } from "@/components/ui/icons";
import { useToast } from "@/components/ui/toast";
import { SPRING } from "@/lib/motion";
import type { AsyncState } from "@/types";

const channels = [
  { label: "Email", value: site.email, href: site.emailHref, icon: Mail, copyable: true },
  { label: "Phone", value: site.phone, href: site.phoneHref, icon: Phone, copyable: true },
  { label: "Location", value: "Coimbatore, India · Open to work globally", href: "#", icon: MapPin, copyable: false },
  {
    label: "LinkedIn",
    value: site.linkedin.replace("https://www.", ""),
    href: site.linkedin,
    icon: LinkedInIcon,
    copyable: false,
    external: true,
  },
] as const;

type FormValues = { name: string; email: string; message: string };
type FormErrors = Partial<FormValues>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};
  if (values.name.trim().length < 2) errors.name = "Please enter your name.";
  if (!EMAIL_RE.test(values.email)) errors.email = "Please enter a valid email address.";
  if (values.message.trim().length < 10)
    errors.message = "Tell me a little more (10+ characters).";
  return errors;
}

/**
 * 05 — LET'S CONNECT (reference). Existing working form (client-side
 * validation → pre-filled mailto draft) and copy-to-clipboard channels,
 * restyled to the luxury gold system.
 */
export function Contact() {
  const { toast } = useToast();
  const [values, setValues] = useState<FormValues>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [state, setState] = useState<AsyncState>("idle");
  const [copied, setCopied] = useState<string | null>(null);

  const setField =
    (key: keyof FormValues) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setValues((v) => ({ ...v, [key]: e.target.value }));

  const copyValue = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(label);
      toast({ type: "success", title: `${label} copied`, description: text });
      window.setTimeout(() => setCopied(null), 1600);
    } catch {
      toast({
        type: "error",
        title: "Couldn't copy",
        description: "Copy failed — please select the text manually.",
      });
    }
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      toast({
        type: "error",
        title: "Check the form",
        description: "A few fields need attention before sending.",
      });
      return;
    }

    setState("loading");
    window.setTimeout(() => {
      try {
        const subject = encodeURIComponent(`Portfolio inquiry from ${values.name}`);
        const body = encodeURIComponent(`${values.message}\n\n— ${values.name} (${values.email})`);
        window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
        setState("success");
        setValues({ name: "", email: "", message: "" });
        toast({
          type: "success",
          title: "Opening your email client",
          description: "Your draft is pre-filled — just hit send.",
        });
        window.setTimeout(() => setState("idle"), 2500);
      } catch {
        setState("error");
        toast({
          type: "error",
          title: "Something went wrong",
          description: `Please email me directly at ${site.email}.`,
        });
      }
    }, 600);
  };

  return (
    <section
      id="contact"
      aria-label="Contact"
      className="section-line section-pad scroll-mt-20"
    >
      <div className="container-x grid items-start gap-14 lg:grid-cols-12 lg:gap-10">
        {/* Left — heading, channels, socials */}
        <div className="flex flex-col gap-8 lg:col-span-6">
          <Reveal>
            <SectionHeading
              index="05"
              eyebrow="Let's Connect"
              title={
                <>
                  Let&apos;s Build Something{" "}
                  <span className="text-gradient">Great Together</span>
                </>
              }
              description="I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions."
            />
          </Reveal>

          <ul className="flex flex-col gap-6">
            {channels.map((channel, i) => {
              const Icon = channel.icon;
              return (
                <Reveal key={channel.label} delay={Math.min(0.05 + i * 0.07, 0.26)} y={14}>
                  <li className="flex items-center gap-4">
                    <span className="neu-control flex size-12 shrink-0 items-center justify-center rounded-xl text-gold-400">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="overline-caps !text-[10px]">{channel.label}</p>
                      <a
                        href={channel.href}
                        {...("external" in channel && channel.external
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                        className="mt-0.5 block truncate text-[15px] font-medium text-text transition-colors duration-micro hover:text-gold-300"
                      >
                        {channel.value}
                      </a>
                    </div>
                    {channel.copyable && (
                      <button
                        type="button"
                        onClick={() => copyValue(channel.value, channel.label)}
                        aria-label={`Copy ${channel.label}`}
                        className="rounded-md p-2 text-muted transition-colors duration-micro hover:text-gold-300"
                      >
                        {copied === channel.label ? (
                          <Check className="size-4 text-success" aria-hidden />
                        ) : (
                          <Copy className="size-4" aria-hidden />
                        )}
                      </button>
                    )}
                  </li>
                </Reveal>
              );
            })}
          </ul>

          <Reveal delay={0.28}>
            <div className="flex items-center gap-3 pt-1">
              <a
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${site.name} on LinkedIn`}
                className="neu-control inline-flex size-10 items-center justify-center rounded-full text-muted transition-all duration-small hover:-translate-y-0.5 hover:text-gold-300"
              >
                <LinkedInIcon className="size-[17px]" aria-hidden />
              </a>
              <a
                href={site.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${site.name} on GitHub`}
                className="neu-control inline-flex size-10 items-center justify-center rounded-full text-muted transition-all duration-small hover:-translate-y-0.5 hover:text-gold-300"
              >
                <GitHubIcon className="size-[17px]" aria-hidden />
              </a>
            </div>
          </Reveal>
        </div>

        {/* Right — premium form card */}
        <Reveal className="lg:col-span-6" delay={0.12}>
          <motion.div
            whileHover={{ y: -3 }}
            transition={SPRING.gentle}
            className="glass-card relative overflow-hidden p-6 sm:p-8"
          >
            {/* Ambient gold wash */}
            <div
              aria-hidden
              className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[radial-gradient(closest-side,rgb(var(--color-primary)/0.14),transparent_72%)] blur-2xl"
            />
            <h3 className="relative mb-6 font-display text-xl font-semibold text-text">
              Send Me a Message
            </h3>
            <form onSubmit={onSubmit} noValidate className="relative flex flex-col gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Input
                  id="contact-name"
                  label="Name"
                  autoComplete="name"
                  placeholder="Your name"
                  required
                  value={values.name}
                  onChange={setField("name")}
                  error={errors.name}
                />
                <Input
                  id="contact-email"
                  label="Email"
                  type="email"
                  autoComplete="email"
                  placeholder="Your email"
                  required
                  value={values.email}
                  onChange={setField("email")}
                  error={errors.email}
                />
              </div>
              <Textarea
                id="contact-message"
                label="Message"
                placeholder="Tell me about your project…"
                required
                value={values.message}
                onChange={setField("message")}
                error={errors.message}
              />
              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  loading={state === "loading"}
                  className="w-full"
                >
                  {state === "success" ? "Draft ready" : "Send Message"}
                  {state !== "loading" && <Send className="size-4" aria-hidden />}
                </Button>
              </div>
            </form>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
