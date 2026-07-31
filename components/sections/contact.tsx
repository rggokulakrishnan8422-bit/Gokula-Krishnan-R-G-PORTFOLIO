"use client";

import { useState } from "react";
import { Check, Clock, Copy, Mail, Phone, Send } from "lucide-react";
import { site } from "@/config/site";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { GlassCard } from "@/components/ui/glass-card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ResumeButton } from "@/components/ui/resume-button";
import { LinkedInIcon } from "@/components/ui/icons";
import { useToast } from "@/components/ui/toast";
import type { AsyncState } from "@/types";

/**
 * Contact (Master Prompt Sections 7, 9 — Contact Form + Contact Card).
 * All channel values resolve from config/site.ts. The form validates
 * client-side and composes a pre-filled email via mailto (no backend
 * required) with loading → success/error feedback via toast.
 */
const channels = [
  { label: "Email", value: site.email, href: site.emailHref, icon: Mail, copyable: true },
  { label: "Phone", value: site.phone, href: site.phoneHref, icon: Phone, copyable: true },
  {
    label: "LinkedIn",
    value: "Connect on LinkedIn",
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
        const body = encodeURIComponent(
          `${values.message}\n\n— ${values.name} (${values.email})`,
        );
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
    <section id="contact" aria-label="Contact" className="section-pad relative scroll-mt-24">
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <div className="flex flex-col gap-8 lg:col-span-5">
          <Reveal>
            <SectionHeading
              eyebrow="06 · Contact"
              title="Let's put it on the roadmap."
              description="Have a project, a role, or a question about delivery? My inbox is open — I typically reply within 24 hours."
            />
          </Reveal>

          <div className="flex flex-col gap-4">
            {channels.map((channel, i) => {
              const Icon = channel.icon;
              return (
                <Reveal key={channel.label} delay={Math.min(i * 0.08, 0.2)} y={16}>
                  <GlassCard hover className="flex items-center gap-4 p-4">
                    <span className="rounded-md bg-primary/10 p-2.5 text-primary">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-caption text-muted">{channel.label}</p>
                      <a
                        href={channel.href}
                        {...("external" in channel && channel.external
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                        className="block truncate font-medium transition-colors duration-micro hover:text-primary"
                      >
                        {channel.value}
                      </a>
                    </div>
                    {channel.copyable && (
                      <button
                        type="button"
                        onClick={() => copyValue(channel.value, channel.label)}
                        aria-label={`Copy ${channel.label}`}
                        className="rounded-md p-2 text-muted transition-colors duration-micro hover:text-primary"
                      >
                        {copied === channel.label ? (
                          <Check className="size-4 text-success" aria-hidden />
                        ) : (
                          <Copy className="size-4" aria-hidden />
                        )}
                      </button>
                    )}
                  </GlassCard>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={0.25}>
            <GlassCard className="flex flex-col gap-3 p-6">
              <p className="font-semibold">Prefer async?</p>
              <p className="text-caption text-muted">
                Grab the PDF version — same story, printable.
              </p>
              <ResumeButton variant="secondary" className="mt-1 w-fit" />
            </GlassCard>
          </Reveal>
        </div>

        <Reveal className="lg:col-span-7" delay={0.1}>
          <GlassCard className="h-full p-6 md:p-8">
            <form onSubmit={onSubmit} noValidate className="flex h-full flex-col gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
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
                  placeholder="you@company.com"
                  required
                  value={values.email}
                  onChange={setField("email")}
                  error={errors.email}
                />
              </div>
              <Textarea
                id="contact-message"
                label="Message"
                placeholder="Tell me about your project, role, or question…"
                required
                value={values.message}
                onChange={setField("message")}
                error={errors.message}
              />
              <div className="mt-auto flex flex-wrap items-center justify-between gap-4">
                <p className="flex items-center gap-2 text-caption text-muted">
                  <Clock className="size-4" aria-hidden />
                  Typically replies within 24 hours
                </p>
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  loading={state === "loading"}
                >
                  {state === "success" ? "Draft ready" : "Send message"}
                  {state !== "loading" && <Send className="size-4" aria-hidden />}
                </Button>
              </div>
            </form>
          </GlassCard>
        </Reveal>
      </div>
    </section>
  );
}
