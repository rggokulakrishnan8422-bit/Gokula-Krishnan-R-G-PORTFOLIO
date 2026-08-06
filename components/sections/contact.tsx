"use client";

import { useState } from "react";
import Image from "next/image";
import { Check, Clock, Copy, Mail, MapPin, Phone, Send } from "lucide-react";
import { site } from "@/config/site";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { GlassCard } from "@/components/ui/glass-card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { LinkedInIcon } from "@/components/ui/icons";
import { useToast } from "@/components/ui/toast";
import type { AsyncState } from "@/types";

const channels = [
  { label: "Email", value: site.email, href: site.emailHref, icon: Mail, copyable: true },
  { label: "Phone", value: site.phone, href: site.phoneHref, icon: Phone, copyable: true },
  { label: "Location", value: "India, Coimbatore | Open to work globally", href: "#", icon: MapPin, copyable: false },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/gokula-krishnan-rgk",
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
      className="section-line section-pad relative scroll-mt-24 overflow-hidden"
    >
      <div className="container-x flex flex-col gap-10">
        <Reveal>
          <SectionHeading
            eyebrow="LET'S CONNECT"
            title="Let's Build Something Great Together"
          />
        </Reveal>

        <div className="grid items-center gap-8 lg:grid-cols-12">
          {/* Left Column: Contact Channels */}
          <div className="flex flex-col gap-4 lg:col-span-4">
            {channels.map((channel, i) => {
              const Icon = channel.icon;
              return (
                <Reveal key={channel.label} delay={Math.min(i * 0.08, 0.2)} y={16}>
                  <GlassCard hover className="flex items-center gap-4 p-4">
                    <span className="rounded-xl bg-primary/15 p-3 text-primary shadow-sm">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] font-mono uppercase tracking-wider text-muted">
                        {channel.label}
                      </p>
                      <a
                        href={channel.href}
                        {...("external" in channel && channel.external
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                        className="block truncate font-medium text-xs sm:text-sm text-text transition-colors hover:text-primary"
                      >
                        {channel.value}
                      </a>
                    </div>
                    {channel.copyable && (
                      <button
                        type="button"
                        onClick={() => copyValue(channel.value, channel.label)}
                        aria-label={`Copy ${channel.label}`}
                        className="rounded-md p-2 text-muted transition-colors hover:text-primary"
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

          {/* Center Column: Standing Portrait Cutout on Glowing Radial Stage */}
          <div className="hidden lg:col-span-4 lg:block">
            <Reveal className="h-full" delay={0.1}>
              <div className="relative mx-auto h-[440px] w-full max-w-[320px]">
                {/* Glowing Blue Radial Platform Stage Base */}
                <div
                  aria-hidden
                  className="absolute inset-x-4 bottom-2 h-20 rounded-[100%] border-2 border-cyan-400/40 bg-cyan-500/20 blur-sm shadow-[0_0_40px_rgba(34,211,238,0.4)]"
                />

                <Image
                  src="/images/portrait-hero.jpg"
                  alt=""
                  fill
                  sizes="320px"
                  className="mask-fade-b object-cover object-top"
                />

                {/* Floating Glass Pill 1: Email (Left) */}
                <div className="absolute left-0 top-24 flex size-12 items-center justify-center rounded-2xl border border-primary/30 bg-surface/90 text-primary shadow-xl backdrop-blur-md animate-bounce">
                  <Mail className="size-5 text-cyan-400" />
                </div>

                {/* Floating Glass Pill 2: Message/LinkedIn (Right) */}
                <div className="absolute right-0 top-36 flex size-12 items-center justify-center rounded-2xl border border-primary/30 bg-surface/90 text-primary shadow-xl backdrop-blur-md animate-pulse">
                  <LinkedInIcon className="size-5 text-cyan-400" />
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Send Me a Message Form Panel */}
          <Reveal className="lg:col-span-4" delay={0.15}>
            <GlassCard className="h-full p-6 md:p-7 border-primary/20 shadow-2xl">
              <h3 className="mb-5 font-display text-lg font-semibold text-text">Send Me a Message</h3>
              <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
                <Input
                  id="contact-name"
                  label="Name"
                  autoComplete="name"
                  placeholder="Your Name"
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
                  placeholder="Your Email"
                  required
                  value={values.email}
                  onChange={setField("email")}
                  error={errors.email}
                />
                <Textarea
                  id="contact-message"
                  label="Message"
                  placeholder="Your Message"
                  required
                  value={values.message}
                  onChange={setField("message")}
                  error={errors.message}
                />
                <div className="pt-2">
                  <Button type="submit" variant="primary" size="lg" loading={state === "loading"} className="w-full bg-gradient-to-r from-primary to-purple-600">
                    {state === "success" ? "Draft ready" : "Send Message"}
                    {state !== "loading" && <Send className="size-4 ml-2" aria-hidden />}
                  </Button>
                </div>
              </form>
            </GlassCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
