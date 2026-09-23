import Link from "next/link";
import {
  ArrowLeft,
  CalendarCheck,
  ChevronRight,
  FileText,
  Mail,
  ShieldCheck,
} from "lucide-react";
import Navbar from "../components/nav/Navbar";
import Footer from "../components/Footer";

const sections = [
  { id: "using-maksports", title: "Using Maksports Arena" },
  { id: "team-accounts", title: "Team Accounts" },
  { id: "bookings", title: "Bookings" },
  { id: "payments", title: "Payments" },
  { id: "rescheduling", title: "Rescheduling & Cancellation" },
  { id: "arena-use", title: "Use of the Arena" },
  { id: "responsibilities", title: "User Responsibilities" },
  { id: "availability", title: "Service Availability" },
  { id: "third-party", title: "Third-Party Services" },
  { id: "privacy", title: "Privacy" },
  { id: "intellectual-property", title: "Intellectual Property" },
  { id: "liability", title: "Limitation of Liability" },
  { id: "changes", title: "Changes to These Terms" },
  { id: "contact", title: "Contact Us" },
];

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-950">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-green-500/10 blur-3xl" />
        <div className="absolute -bottom-40 right-0 h-96 w-96 rounded-full bg-green-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-6 py-16 md:py-20">
          <div className="max-w-3xl">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-500 text-white shadow-lg shadow-green-500/20">
              <FileText className="h-6 w-6" />
            </div>

            <p className="mt-6 text-sm font-bold uppercase tracking-[0.2em] text-green-400">
              Legal
            </p>

            <h1 className="mt-3 text-4xl font-black tracking-tight text-white md:text-5xl">
              Terms & Conditions
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-400">
              Please read these terms carefully before using the Maksports Arena
              booking platform or making a booking.
            </p>

            <p className="mt-6 text-sm font-medium text-slate-500">
              Last updated: September 23, 2026
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-6xl px-6 py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[240px_minmax(0,1fr)]">
          {/* Table of Contents */}
          <aside className="hidden lg:block">
            <div className="sticky top-8 rounded-2xl border border-slate-200 bg-white p-5">
              <p className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                On this page
              </p>

              <nav className="space-y-1">
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-slate-500 transition hover:bg-green-50 hover:text-green-700">
                    <span>{section.title}</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Terms */}
          <article className="min-w-0 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-10 lg:p-12">
            <div className="mb-10 rounded-2xl bg-green-50 p-5">
              <div className="flex items-start gap-4">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />

                <p className="text-sm leading-6 text-green-900">
                  By creating an account, registering a team, or making a
                  booking through Maksports Arena, you acknowledge that you have
                  read and agree to these Terms & Conditions.
                </p>
              </div>
            </div>

            <div className="space-y-12 text-slate-600">
              {/* 1 */}
              <section id="using-maksports">
                <SectionTitle number="01" title="Using Maksports Arena" />

                <p>
                  Maksports Arena provides an online platform that allows teams
                  and users to register teams, view available arena slots, make
                  bookings, manage bookings, make payments, and receive booking
                  confirmations and notifications.
                </p>

                <p>
                  You agree to provide accurate and up-to-date information when
                  using the platform.
                </p>
              </section>

              {/* 2 */}
              <section id="team-accounts">
                <SectionTitle number="02" title="Team Accounts" />

                <p>
                  When registering a team, you are responsible for ensuring that
                  the information provided is accurate and current.
                </p>

                <p>
                  You are responsible for keeping your account credentials
                  secure and for activity carried out through your account.
                </p>

                <p>
                  If you believe your account has been accessed without your
                  permission, please contact Maksports Arena as soon as
                  possible.
                </p>
              </section>

              {/* 3 */}
              <section id="bookings">
                <SectionTitle number="03" title="Bookings" />

                <p>
                  Bookings are subject to availability and are considered
                  confirmed once the booking process has been successfully
                  completed.
                </p>

                <p>A booking may include:</p>

                <BulletList
                  items={[
                    "Team name",
                    "Booking date",
                    "Start time",
                    "End time",
                    "Booking duration",
                    "Payment status",
                  ]}
                />

                <p>
                  You should review your booking details carefully before
                  completing the booking.
                </p>

                <p>
                  Maksports Arena reserves the right to correct booking or
                  scheduling errors where necessary.
                </p>
              </section>

              {/* 4 */}
              <section id="payments">
                <SectionTitle number="04" title="Payments" />

                <p>
                  Where payment is required, the applicable booking fee will be
                  displayed before you complete the payment process.
                </p>

                <p>
                  Payments may be processed through third-party payment
                  providers. By proceeding with a payment, you agree to comply
                  with the applicable payment provider&apos;s terms and
                  requirements.
                </p>

                <p>
                  A booking may not be considered confirmed if payment has not
                  been successfully completed where payment is required.
                </p>
              </section>

              {/* 5 */}
              <section id="rescheduling">
                <SectionTitle number="05" title="Rescheduling & Cancellation" />

                <p>
                  Where rescheduling is available, it is subject to the
                  availability of alternative dates and time slots.
                </p>

                <p>
                  Any applicable cancellation, rescheduling, or refund
                  conditions may depend on the booking and payment status.
                </p>

                <p>
                  Maksports Arena may restrict or decline changes to bookings
                  where the requested change cannot be accommodated.
                </p>
              </section>

              {/* 6 */}
              <section id="arena-use">
                <SectionTitle number="06" title="Use of the Arena" />

                <p>
                  Users and teams are expected to use the arena responsibly and
                  follow all applicable arena rules and instructions.
                </p>

                <p>You agree not to:</p>

                <BulletList
                  items={[
                    "Damage arena property or equipment.",
                    "Engage in unlawful or dangerous activities.",
                    "Disrupt other users or scheduled activities.",
                    "Use the facility for unauthorised purposes.",
                    "Ignore reasonable instructions from arena staff.",
                  ]}
                />

                <p>
                  Teams may be responsible for costs resulting from damage
                  caused by their members or guests, subject to applicable law.
                </p>
              </section>

              {/* 7 */}
              <section id="responsibilities">
                <SectionTitle number="07" title="User Responsibilities" />

                <p>
                  You agree to use the Maksports platform and arena responsibly.
                </p>

                <p>You must not attempt to:</p>

                <BulletList
                  items={[
                    "Gain unauthorised access to another user's account.",
                    "Interfere with the operation of the booking platform.",
                    "Submit false or misleading information.",
                    "Make fraudulent bookings or payments.",
                    "Circumvent booking or payment controls.",
                    "Use the platform for unlawful purposes.",
                  ]}
                />
              </section>

              {/* 8 */}
              <section id="availability">
                <SectionTitle number="08" title="Service Availability" />

                <p>
                  We aim to keep the booking platform available and functioning
                  reliably. However, we cannot guarantee that the platform will
                  always be available without interruption.
                </p>

                <p>Temporary interruptions may occur because of:</p>

                <BulletList
                  items={[
                    "Maintenance.",
                    "Technical problems.",
                    "Network or connectivity issues.",
                    "Third-party service interruptions.",
                    "Circumstances outside our reasonable control.",
                  ]}
                />

                <p>
                  We may temporarily suspend access where maintenance, security,
                  or technical work is required.
                </p>
              </section>

              {/* 9 */}
              <section id="third-party">
                <SectionTitle number="09" title="Third-Party Services" />

                <p>
                  Some features of the platform may rely on third-party
                  services, including payment, communication, mapping, hosting,
                  or authentication providers.
                </p>

                <p>
                  Third-party services may have their own terms and privacy
                  policies. Maksports Arena is not responsible for services
                  operated independently by third parties.
                </p>
              </section>

              {/* 10 */}
              <section id="privacy">
                <SectionTitle number="10" title="Privacy" />

                <p>
                  Information provided when using Maksports Arena is handled in
                  accordance with our Privacy Policy.
                </p>

                <p>
                  By using the platform, you acknowledge that certain
                  information may be required to provide services such as
                  account management, booking, payment processing, and
                  communication.
                </p>

                <Link
                  href="/privacy"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-green-600 hover:text-green-700">
                  View Privacy Policy
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </section>

              {/* 11 */}
              <section id="intellectual-property">
                <SectionTitle number="11" title="Intellectual Property" />

                <p>
                  The Maksports Arena platform, including its design, branding,
                  content, graphics, software, and other materials, may be
                  protected by applicable intellectual property laws.
                </p>

                <p>
                  You may use the platform for its intended purpose but may not
                  copy, reproduce, modify, distribute, or commercially exploit
                  platform content without appropriate permission.
                </p>
              </section>

              {/* 12 */}
              <section id="liability">
                <SectionTitle number="12" title="Limitation of Liability" />

                <p>
                  To the extent permitted by applicable law, Maksports Arena
                  will not be responsible for losses arising from circumstances
                  outside its reasonable control, including service
                  interruptions, third-party service failures, or events
                  affecting the availability of the arena.
                </p>

                <p>
                  Nothing in these terms is intended to exclude or limit
                  liability where such exclusion or limitation is not permitted
                  by law.
                </p>
              </section>

              {/* 13 */}
              <section id="changes">
                <SectionTitle number="13" title="Changes to These Terms" />

                <p>
                  We may update these Terms & Conditions from time to time to
                  reflect changes to our services, policies, or legal
                  requirements.
                </p>

                <p>
                  When significant changes are made, we may provide appropriate
                  notice through the platform or other available communication
                  channels.
                </p>

                <p>
                  Your continued use of Maksports Arena after updated terms
                  become effective constitutes acceptance of the updated terms.
                </p>
              </section>

              {/* 14 */}
              <section id="contact">
                <SectionTitle number="14" title="Contact Us" />

                <p>
                  If you have questions about these Terms & Conditions, please
                  contact the Maksports Arena team.
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <a
                    href="mailto:support@maksportsarena.com"
                    className="flex items-center gap-3 rounded-xl border border-slate-200 p-4 transition hover:border-green-200 hover:bg-green-50">
                    <Mail className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                        Email
                      </p>
                      <p className="mt-1 text-sm font-bold text-slate-800">
                        support@maksportsarena.com
                      </p>
                    </div>
                  </a>

                  <div className="flex items-center gap-3 rounded-xl border border-slate-200 p-4">
                    <CalendarCheck className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                        Location
                      </p>
                      <p className="mt-1 text-sm font-bold text-slate-800">
                        Kampala, Uganda
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Footer note */}
            <div className="mt-14 border-t border-slate-200 pt-8">
              <p className="text-sm leading-6 text-slate-400">
                By continuing to use the Maksports Arena platform, you
                acknowledge that you have read and understood these Terms &
                Conditions.
              </p>
            </div>
          </article>
        </div>

        {/* Back */}
        <div className="mt-10">
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

function SectionTitle({ number, title }: { number: string; title: string }) {
  return (
    <div className="mb-5 flex items-start gap-4">
      <span className="mt-1 text-xs font-black tracking-wider text-green-600">
        {number}
      </span>

      <h2 className="text-xl font-black tracking-tight text-slate-900 md:text-2xl">
        {title}
      </h2>
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="my-4 space-y-2 pl-5">
      {items.map((item) => (
        <li
          key={item}
          className="relative pl-2 text-sm leading-7 text-slate-600">
          <span className="absolute -left-3 top-3 h-1.5 w-1.5 rounded-full bg-green-500" />
          {item}
        </li>
      ))}
    </ul>
  );
}
