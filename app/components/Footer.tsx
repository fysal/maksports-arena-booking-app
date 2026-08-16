import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-500 text-sm font-black text-white shadow-lg shadow-green-500/20">
                MA
              </div>

              <div>
                <span className="block text-lg font-black tracking-tight">
                  Maksports
                </span>

                <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Arena
                </span>
              </div>
            </Link>

            <p className="mt-6 max-w-sm text-sm leading-6 text-slate-400">
              Your team&apos;s home for easy arena bookings. Find a time, secure
              your slot, and get ready to play.
            </p>

            <Link
              href="/booking"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-green-500">
              Book a Slot
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Platform */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Platform
            </h3>

            <ul className="mt-5 space-y-3 text-sm">
              {[
                { link: "/", item: "home" },
                { link: "/booking", item: "Book Arena" },
                { link: "/dashboard", item: "Team Dashboard" },
                { link: "/auth", item: "Login / Register" },
              ].map((item, idx: number) => (
                <li key={idx}>
                  <Link
                    href={item.link}
                    className="text-slate-400 transition capitalize hover:text-green-400">
                    {item.item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Support
            </h3>

            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <Link
                  href="/help"
                  className="text-slate-400 transition hover:text-green-400">
                  Help Centre
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="text-slate-400 transition hover:text-green-400">
                  Contact Us
                </Link>
              </li>

              <li>
                <Link
                  href="/terms"
                  className="text-slate-400 transition hover:text-green-400">
                  Terms & Conditions
                </Link>
              </li>

              <li>
                <Link
                  href="/privacy"
                  className="text-slate-400 transition hover:text-green-400">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Get in touch
            </h3>

            <div className="mt-5 space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/5 text-green-400">
                  <MapPin className="h-4 w-4" />
                </div>

                <div>
                  <p className="text-sm font-semibold text-white">
                    Maksports Arena
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Kampala, Uganda
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/5 text-green-400">
                  <Phone className="h-4 w-4" />
                </div>

                <span className="text-sm text-slate-400">+256 700 000 000</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/5 text-green-400">
                  <Mail className="h-4 w-4" />
                </div>

                <span className="text-sm text-slate-400">
                  hello@maksportsarena.com
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 h-px bg-white/10" />

        {/* Bottom */}
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} Maksports Arena. All rights reserved.
          </p>

          <div className="flex items-center gap-5">
            <Link
              href="/privacy"
              className="text-xs text-slate-500 transition hover:text-white">
              Privacy
            </Link>

            <Link
              href="/terms"
              className="text-xs text-slate-500 transition hover:text-white">
              Terms
            </Link>

            <span className="h-3 w-px bg-white/10" />

            <span className="flex items-center gap-2 text-xs text-slate-500">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
              Arena booking made simple
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
