import Link from "next/link";
import {
  ArrowLeft,
  ChevronRight,
  FileText,
  Mail,
  MapPin,
  ShieldCheck,
} from "lucide-react";
import Footer from "../components/Footer";
import Navbar from "../components/nav/Navbar";

const sections = [
  { id: "introduction", title: "Introduction" },
  { id: "information", title: "Information We Collect" },
  { id: "use", title: "How We Use Information" },
  { id: "bookings", title: "Bookings & Payments" },
  { id: "sharing", title: "Sharing Information" },
  { id: "security", title: "Data Security" },
  { id: "retention", title: "Data Retention" },
  { id: "cookies", title: "Cookies & Technologies" },
  { id: "rights", title: "Your Rights" },
  { id: "third-party", title: "Third-Party Services" },
  { id: "children", title: "Children's Privacy" },
  { id: "changes", title: "Changes to This Policy" },
  { id: "contact", title: "Contact Us" },
];

export default function PrivacyPolicyPage() {
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
              <ShieldCheck className="h-6 w-6" />
            </div>

            <p className="mt-6 text-sm font-bold uppercase tracking-[0.2em] text-green-400">
              Privacy
            </p>

            <h1 className="mt-3 text-4xl font-black tracking-tight text-white md:text-5xl">
              Privacy Policy
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-400">
              This Privacy Policy explains how Maksports Arena collects, uses,
              stores, and protects information when you use our booking platform
              and services.
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

          {/* Policy */}
          <article className="min-w-0 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-10 lg:p-12">
            {/* Intro notice */}
            <div className="mb-10 rounded-2xl bg-green-50 p-5">
              <div className="flex items-start gap-4">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />

                <p className="text-sm leading-6 text-green-900">
                  We respect your privacy and are committed to handling your
                  information responsibly. This policy explains what information
                  we collect and why we need it.
                </p>
              </div>
            </div>

            <div className="space-y-12 text-slate-600">
              {/* 1 */}
              <section id="introduction">
                <SectionTitle number="01" title="Introduction" />

                <p>
                  Maksports Arena provides an online platform that allows teams
                  and users to register accounts, manage team information, view
                  arena availability, make bookings, process payments, and
                  receive booking-related communications.
                </p>

                <p>
                  This Privacy Policy applies to information collected through
                  the Maksports Arena website, booking platform, and related
                  services.
                </p>

                <p>
                  By using our services, you acknowledge that you have read and
                  understood this Privacy Policy.
                </p>
              </section>

              {/* 2 */}
              <section id="information">
                <SectionTitle number="02" title="Information We Collect" />

                <p>
                  Depending on how you use Maksports Arena, we may collect
                  information such as:
                </p>

                <BulletList
                  items={[
                    "Name and team information.",
                    "Email address.",
                    "Phone number or other contact information.",
                    "Account login information.",
                    "Booking dates and times.",
                    "Payment and transaction information.",
                    "Information you provide when contacting our support team.",
                    "Technical information about how you interact with our platform.",
                  ]}
                />

                <p>
                  We only request information that is reasonably necessary to
                  provide and improve our services.
                </p>
              </section>

              {/* 3 */}
              <section id="use">
                <SectionTitle number="03" title="How We Use Information" />

                <p>We may use the information we collect to:</p>

                <BulletList
                  items={[
                    "Create and manage your account.",
                    "Register and manage your team.",
                    "Process and manage bookings.",
                    "Process payments and transactions.",
                    "Send booking confirmations and important notifications.",
                    "Respond to support requests.",
                    "Maintain and improve our platform.",
                    "Prevent fraud, misuse, and unauthorised activity.",
                    "Maintain the security and reliability of our services.",
                    "Comply with applicable legal obligations.",
                  ]}
                />
              </section>

              {/* 4 */}
              <section id="bookings">
                <SectionTitle number="04" title="Bookings & Payments" />

                <p>
                  When you make a booking, we collect information necessary to
                  identify and manage that booking, including your team,
                  selected date, time, booking status, and payment status.
                </p>

                <p>
                  Payments may be handled by third-party payment providers.
                  Depending on the payment method used, payment providers may
                  collect and process payment information directly.
                </p>

                <p>
                  Maksports Arena does not need to store sensitive payment
                  credentials such as your full card number when those details
                  are handled directly by a payment provider.
                </p>
              </section>

              {/* 5 */}
              <section id="sharing">
                <SectionTitle number="05" title="Sharing Information" />

                <p>We do not sell your personal information.</p>

                <p>
                  Information may be shared with trusted service providers where
                  necessary to operate the platform and provide our services.
                </p>

                <p>This may include providers involved in:</p>

                <BulletList
                  items={[
                    "Payment processing.",
                    "Email and communication services.",
                    "Cloud hosting and infrastructure.",
                    "Authentication and account management.",
                    "Analytics and technical services.",
                  ]}
                />

                <p>
                  We may also disclose information where required by law or
                  where reasonably necessary to protect the rights, property,
                  security, or users of Maksports Arena.
                </p>
              </section>

              {/* 6 */}
              <section id="security">
                <SectionTitle number="06" title="Data Security" />

                <p>
                  We take reasonable technical and organisational measures to
                  protect information from unauthorised access, alteration,
                  disclosure, or destruction.
                </p>

                <p>
                  However, no online service or method of electronic
                  transmission can be guaranteed to be completely secure.
                </p>

                <p>
                  You are also responsible for keeping your account credentials
                  confidential and should notify us if you believe your account
                  has been compromised.
                </p>
              </section>

              {/* 7 */}
              <section id="retention">
                <SectionTitle number="07" title="Data Retention" />

                <p>
                  We retain information for as long as reasonably necessary to
                  provide our services, maintain business and transaction
                  records, resolve disputes, enforce agreements, and comply with
                  applicable legal obligations.
                </p>

                <p>
                  When information is no longer required for these purposes, it
                  may be securely deleted or anonymised where appropriate.
                </p>
              </section>

              {/* 8 */}
              <section id="cookies">
                <SectionTitle number="08" title="Cookies & Technologies" />

                <p>
                  Maksports Arena may use cookies and similar technologies to
                  support essential platform functionality and improve the user
                  experience.
                </p>

                <p>
                  These technologies may help us maintain sessions, remember
                  preferences, understand platform usage, and improve
                  performance.
                </p>

                <p>
                  Some third-party services integrated into the platform may
                  also use cookies or similar technologies according to their
                  own policies.
                </p>
              </section>

              {/* 9 */}
              <section id="rights">
                <SectionTitle number="09" title="Your Rights" />

                <p>
                  Depending on applicable law, you may have rights relating to
                  your personal information, including the right to:
                </p>

                <BulletList
                  items={[
                    "Request access to information we hold about you.",
                    "Request correction of inaccurate information.",
                    "Request deletion of certain information.",
                    "Object to or restrict certain processing.",
                    "Withdraw consent where processing is based on consent.",
                    "Request information about how your data is used.",
                  ]}
                />

                <p>
                  Requests can be made by contacting us using the details
                  provided at the end of this policy.
                </p>
              </section>

              {/* 10 */}
              <section id="third-party">
                <SectionTitle number="10" title="Third-Party Services" />

                <p>
                  Our platform may use third-party services for functions such
                  as payments, authentication, hosting, analytics,
                  communication, maps, and other technical services.
                </p>

                <p>
                  These providers may process information according to their own
                  privacy policies and terms.
                </p>

                <p>
                  We encourage you to review the privacy policies of third-party
                  services where appropriate.
                </p>
              </section>

              {/* 11 */}
              <section id="children">
                <SectionTitle number="11" title="Children's Privacy" />

                <p>
                  Maksports Arena is intended for users who are able to create
                  and manage accounts or bookings in accordance with applicable
                  law.
                </p>

                <p>
                  We do not knowingly collect personal information from children
                  where such collection is prohibited by applicable law.
                </p>

                <p>
                  If you believe that a child has provided personal information
                  to us without appropriate permission, please contact us so
                  that we can review the situation.
                </p>
              </section>

              {/* 12 */}
              <section id="changes">
                <SectionTitle number="12" title="Changes to This Policy" />

                <p>
                  We may update this Privacy Policy from time to time to reflect
                  changes to our services, technology, business practices, or
                  legal requirements.
                </p>

                <p>
                  When significant changes are made, we may provide an
                  appropriate notice through the platform or other available
                  communication channels.
                </p>

                <p>
                  The updated policy will include a revised &quot;Last
                  updated&quot; date at the top of the page.
                </p>
              </section>

              {/* 13 */}
              <section id="contact">
                <SectionTitle number="13" title="Contact Us" />

                <p>
                  If you have questions about this Privacy Policy or would like
                  to make a request regarding your personal information, please
                  contact the Maksports Arena team.
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <a
                    href="mailto:support@maksportsarena.com"
                    className="flex items-center gap-3 rounded-xl border border-slate-200 p-4 transition hover:border-green-200 hover:bg-green-50">
                    <Mail className="h-5 w-5 shrink-0 text-green-600" />

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
                    <MapPin className="h-5 w-5 shrink-0 text-green-600" />

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
                By using the Maksports Arena platform, you acknowledge that you
                have read and understood this Privacy Policy.
              </p>
            </div>
          </article>
        </div>

        {/* Bottom navigation */}
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-slate-900">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          <Link
            href="/terms"
            className="inline-flex items-center gap-2 text-sm font-semibold text-green-600 transition hover:text-green-700">
            View Terms & Conditions
            <ChevronRight className="h-4 w-4" />
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
