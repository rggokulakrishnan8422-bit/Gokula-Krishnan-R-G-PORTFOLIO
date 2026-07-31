import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container-x flex min-h-[70vh] flex-col items-center justify-center gap-6 text-center">
      <p className="font-display text-hero text-gradient">404</p>
      <p className="text-body text-muted">
        This page slipped off the roadmap. Let&apos;s get you back on track.
      </p>
      <Link href="/" className={buttonVariants({ variant: "primary" })}>
        Back to home
      </Link>
    </div>
  );
}
