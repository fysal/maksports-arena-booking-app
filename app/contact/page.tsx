"use client";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Clock3,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Trophy,
} from "lucide-react";
import Navbar from "../components/nav/Navbar";
import Footer from "../components/Footer";

const contactDetails = [
  {
    icon: Phone,
    title: "Call Us",
    description: "Speak directly with our team.",
    value: "+256 700 000 000",
    href: "tel:+256700000000",
  },
  {
    icon: Mail,
    title: "Email Us",
    description: "Send us an email anytime.",
    value: "support@maksportsarena.com",
    href: "mailto:support@maksportsarena.com",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    description: "Come by the Maksports Arena.",
    value: "Kampala, Uganda",
    href: "#location",
  },
  {
    icon: Clock3,
    title: "Opening Hours",
    description: "We're available during arena hours.",
    value: "Mon – Sun · 8:00 AM – 10:00 PM",
    href: "#hours",
  },
];

export default function ContactUsPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-950">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-green-500/10 blur-3xl" />
        <div className="absolute -bottom-40 right-0 h-96 w-96 rounded-full bg-green-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-6 py-20 text-center md:py-24">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-green-500 text-white shadow-lg shadow-green-500/20">
            <MessageCircle className="h-7 w-7" />
          </div>

          <p className="mt-6 text-sm font-bold uppercase tracking-[0.2em] text-green-400">
            Get In Touch
          </p>

          <h1 className="mt-3 text-4xl font-black tracking-tight text-white md:text-5xl">
            Contact Maksports Arena
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-slate-400">
            Have a question about bookings, your team, or the arena? Our team is
            ready to help.
          </p>
        </div>
      </section>

      {/* Contact Details */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {contactDetails.map((contact) => {
            const Icon = contact.icon;

            return (
              <a
                key={contact.title}
                href={contact.href}
                className="group rounded-2xl border border-slate-200 bg-white p-6 transition duration-200 hover:-translate-y-1 hover:border-green-200 hover:shadow-lg">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-600 transition group-hover:bg-green-600 group-hover:text-white">
                  <Icon className="h-5 w-5" />
                </div>

                <h2 className="mt-5 font-bold text-slate-900">
                  {contact.title}
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  {contact.description}
                </p>

                <p className="mt-4 text-sm font-bold text-green-600">
                  {contact.value}
                </p>
              </a>
            );
          })}
        </div>

        {/* Main Contact Section */}
        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          {/* Support */}
          <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200 md:p-10">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
              <Trophy className="h-5 w-5" />
            </div>

            <p className="mt-6 text-sm font-bold uppercase tracking-wider text-green-600">
              Arena Support
            </p>

            <h2 className="mt-2 text-2xl font-black text-slate-900">
              Need help with your booking?
            </h2>

            <p className="mt-4 max-w-lg text-sm leading-7 text-slate-500">
              Whether you need help finding an available slot, managing your
              team, or understanding your booking, our support team is available
              to assist you.
            </p>

            <div className="mt-7 space-y-4">
              <a
                href="tel:+256700000000"
                className="flex items-center gap-4 rounded-xl border border-slate-200 p-4 transition hover:border-green-200 hover:bg-green-50/50">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-50 text-green-600">
                  <Phone className="h-4 w-4" />
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Phone
                  </p>
                  <p className="mt-1 text-sm font-bold text-slate-800">
                    +256 700 000 000
                  </p>
                </div>
              </a>

              <a
                href="mailto:support@maksportsarena.com"
                className="flex items-center gap-4 rounded-xl border border-slate-200 p-4 transition hover:border-green-200 hover:bg-green-50/50">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-50 text-green-600">
                  <Mail className="h-4 w-4" />
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Email
                  </p>
                  <p className="mt-1 text-sm font-bold text-slate-800">
                    support@maksportsarena.com
                  </p>
                </div>
              </a>
            </div>
          </div>

          {/* Location */}
          <div
            id="location"
            className="rounded-3xl bg-slate-900 p-8 text-white md:p-10">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-500 text-white">
              <MapPin className="h-5 w-5" />
            </div>

            <p className="mt-6 text-sm font-bold uppercase tracking-wider text-green-400">
              Find Us
            </p>

            <h2 className="mt-2 text-2xl font-black">Maksports Arena</h2>

            <p className="mt-4 max-w-md text-sm leading-7 text-slate-400">
              Visit us at our arena in Kampala, Uganda. Our team will be happy
              to assist you when you arrive.
            </p>

            <div className="mt-8 border-t border-white/10 pt-6">
              <div className="flex items-start gap-4">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-green-400" />

                <div>
                  <p className="text-sm font-semibold text-white">
                    Kampala, Uganda
                  </p>
                  <p className="mt-1 text-sm text-slate-500">Arena location</p>
                </div>
              </div>
            </div>

            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-green-500">
              Get Directions
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Hours */}
        <div
          id="hours"
          className="mt-8 flex flex-col gap-6 rounded-2xl border border-slate-200 bg-white p-6 md:flex-row md:items-center md:justify-between md:p-8">
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-600">
              <Clock3 className="h-5 w-5" />
            </div>

            <div>
              <h3 className="font-bold text-slate-900">Arena Opening Hours</h3>
              <p className="mt-1 text-sm text-slate-500">
                We&apos;re open every day.
              </p>
            </div>
          </div>

          <div className="text-sm font-bold text-slate-700">
            Monday – Sunday
            <span className="mx-2 text-slate-300">•</span>
            8:00 AM – 10:00 PM
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-sm font-medium text-slate-500">Ready to play?</p>

          <h2 className="mt-2 text-2xl font-black text-slate-900">
            Book your next game at Maksports Arena.
          </h2>

          <Link
            href="/booking"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-green-600/20 transition hover:-translate-y-0.5 hover:bg-green-700">
            Book a Slot
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Back */}
        <div className="mt-12 flex justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-slate-900">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}
