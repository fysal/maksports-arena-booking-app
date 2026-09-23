"use client";

import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  ChevronDown,
  CircleHelp,
  CreditCard,
  Mail,
  MessageCircle,
  Search,
  ShieldCheck,
  Users,
} from "lucide-react";
import { useState } from "react";
import Navbar from "../components/nav/Navbar";
import Footer from "../components/Footer";

const helpTopics = [
  {
    icon: CalendarDays,
    title: "Bookings",
    description: "Find, create, reschedule, or cancel your bookings.",
  },
  {
    icon: Users,
    title: "Team Account",
    description: "Manage your team information and account details.",
  },
  {
    icon: CreditCard,
    title: "Payments",
    description: "Get help with payments and booking confirmations.",
  },
  {
    icon: ShieldCheck,
    title: "Account & Security",
    description: "Learn about your account, access, and security.",
  },
];

const faqs = [
  {
    question: "How do I book an arena slot?",
    answer:
      "Log in to your team account, open the booking page, select your preferred date and an available time slot, then follow the payment instructions to confirm your booking.",
  },
  {
    question: "Can I change my booking?",
    answer:
      "If your booking can be changed, open your team dashboard and select the booking you want to update. Available rescheduling options will be shown there.",
  },
  {
    question: "How do I know if my booking is confirmed?",
    answer:
      "After completing the booking process, your confirmed booking will appear in your team dashboard. You may also receive a confirmation notification by email.",
  },
  {
    question: "Can I manage multiple bookings?",
    answer:
      "Yes. Your team dashboard provides a central place to view and manage your team's upcoming and previous bookings.",
  },
  {
    question: "What happens if my payment fails?",
    answer:
      "If a payment does not go through, check that your payment details are correct and try again. If the issue continues, contact the Maksports support team.",
  },
];

export default function HelpCenterPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-950">
        {/* Decorative shapes */}
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-green-500/10 blur-3xl" />
        <div className="absolute -bottom-40 right-0 h-96 w-96 rounded-full bg-green-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-6 py-20 text-center md:py-24">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-green-500 text-white shadow-lg shadow-green-500/20">
            <CircleHelp className="h-7 w-7" />
          </div>

          <p className="mt-6 text-sm font-bold uppercase tracking-[0.2em] text-green-400">
            Maksports Support
          </p>

          <h1 className="mt-3 text-4xl font-black tracking-tight text-white md:text-5xl">
            How can we help?
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-slate-400">
            Find answers to common questions about bookings, your team,
            payments, and your Maksports account.
          </p>

          {/* Search */}
          {/* <div className="mx-auto mt-8 flex max-w-2xl items-center rounded-2xl bg-white p-2 shadow-2xl">
            <Search className="ml-3 h-5 w-5 shrink-0 text-slate-400" />

            <input
              type="text"
              placeholder="Search for answers..."
              className="w-full bg-transparent px-4 py-3 text-sm text-slate-800 outline-none placeholder:text-slate-400"
            />

            <button className="rounded-xl bg-green-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-green-700">
              Search
            </button>
          </div> */}
        </div>
      </section>

      {/* Main */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        {/* Topics */}
        <div>
          <div className="mb-7">
            <p className="text-sm font-bold uppercase tracking-wider text-green-600">
              Browse Help
            </p>

            <h2 className="mt-2 text-2xl font-black text-slate-900">
              What do you need help with?
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {helpTopics.map((topic) => {
              const Icon = topic.icon;

              return (
                <Link
                  href="#faq"
                  key={topic.title}
                  className="group rounded-2xl border border-slate-200 bg-white p-5 transition duration-200 hover:-translate-y-1 hover:border-green-200 hover:shadow-lg">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-600 transition group-hover:bg-green-600 group-hover:text-white">
                    <Icon className="h-5 w-5" />
                  </div>

                  <h3 className="mt-5 font-bold text-slate-900">
                    {topic.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {topic.description}
                  </p>

                  <div className="mt-4 flex items-center gap-1 text-xs font-bold text-green-600">
                    Learn more
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* FAQ */}
        <div id="faq" className="mt-20">
          <div className="mb-7">
            <p className="text-sm font-bold uppercase tracking-wider text-green-600">
              Frequently Asked Questions
            </p>

            <h2 className="mt-2 text-2xl font-black text-slate-900">
              Common questions
            </h2>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;

              return (
                <div
                  key={faq.question}
                  className="border-b border-slate-100 last:border-b-0">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-6 px-5 py-5 text-left transition hover:bg-slate-50 md:px-6">
                    <span className="text-sm font-bold text-slate-800">
                      {faq.question}
                    </span>

                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-slate-400 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-green-600" : ""
                      }`}
                    />
                  </button>

                  <div
                    className={`grid transition-all duration-200 ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}>
                    <div className="overflow-hidden">
                      <p className="px-5 pb-5 text-sm leading-7 text-slate-500 md:px-6">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="mt-16 overflow-hidden rounded-3xl bg-green-600">
          <div className="relative px-6 py-10 md:px-10">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

            <div className="relative flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="flex items-center gap-2 text-green-100">
                  <MessageCircle className="h-5 w-5" />
                  <span className="text-sm font-bold uppercase tracking-wider">
                    Still need help?
                  </span>
                </div>

                <h2 className="mt-3 text-2xl font-black text-white md:text-3xl">
                  We&apos;re here to help.
                </h2>

                <p className="mt-2 max-w-lg text-sm leading-6 text-green-50/80">
                  Can&apos;t find what you&apos;re looking for? Get in touch
                  with the Maksports support team.
                </p>
              </div>

              <Link
                href="/contact"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-green-700 shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl">
                Contact Support
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Quick contact */}
        <div className="mt-6 flex justify-center">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Mail className="h-4 w-4 text-slate-400" />
            <span>Need direct assistance?</span>

            <a
              href="mailto:support@maksportsarena.com"
              className="font-semibold text-green-600 hover:text-green-700">
              Email support
            </a>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
