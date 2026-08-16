"use client";

import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  Check,
  CheckCircle2,
  Clock3,
  Copy,
  Home,
  MapPin,
  Share2,
  Trophy,
  Users,
} from "lucide-react";
import { UserContext } from "@/app/lib/context";
import { BookingType } from "@/app/types/booking";

type ConfettiPiece = {
  id: number;
  left: number;
  delay: number;
  duration: number;
  rotation: number;
  size: number;
};

export default function BookingSuccessPage({
  booking,
}: {
  booking: BookingType;
}) {
  const [copied, setCopied] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [showPopConfetti, setShowPopConfetti] = useState(true);

  const { currentUser } = useContext(UserContext);

  /*
   * Generate the falling confetti once.
   */
  const [confetti] = useState<ConfettiPiece[]>(() =>
    Array.from({ length: 80 }, (_, index) => ({
      id: index,
      left: Math.random() * 100,
      delay: Math.random() * 1.5,
      duration: 3 + Math.random() * 3,
      rotation: Math.random() * 360,
      size: 5 + Math.random() * 7,
    })),
  );

  const [popConfetti] = useState(() =>
    Array.from({ length: 65 }, (_, index) => {
      const angle = (index / 65) * Math.PI * 2;
      const distance = 180 + Math.random() * 260;
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance + Math.random() * 80;
      const size = 5 + Math.random() * 7;
      const rotation = Math.random() * 720 - 360;

      return {
        id: index,
        x,
        y,
        size,
        rotation,
        delay: Math.random() * 80,
      };
    }),
  );

  /*
   * Page entrance + initial confetti explosion.
   */
  useEffect(() => {
    const contentTimer = setTimeout(() => {
      setShowContent(true);
    }, 150);

    const confettiTimer = setTimeout(() => {
      setShowPopConfetti(false);
    }, 1000);

    return () => {
      clearTimeout(contentTimer);
      clearTimeout(confettiTimer);
    };
  }, []);

  function playAudio() {
    try {
      const audio = new Audio("/audio/success.mp3");
      audio.volume = 1;
      audio.muted = true;
      audio.play().then(() => {
        audio.muted = false;
      });
    } catch (error) {
      console.warn("Failed to play", error);
    }
  }
  //Play success sound
  useEffect(() => {
    playAudio();
  }, []);

  /*
   * Copy booking reference.
   */
  const copyReference = async () => {
    try {
      await navigator.clipboard.writeText(booking.bookingId!);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Unable to copy booking reference:", error);
    }
  };

  const formattedDate = new Date(booking.date).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f7faf8]">
      {/* ========================================================= */}
      {/* FALLING CONFETTI */}
      {/* ========================================================= */}

      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
        {confetti.map((piece) => (
          <span
            key={piece.id}
            className="absolute -top-5 animate-confetti rounded-sm"
            style={{
              left: `${piece.left}%`,
              width: `${piece.size}px`,
              height: `${piece.size * 1.8}px`,
              animationDelay: `${piece.delay}s`,
              animationDuration: `${piece.duration}s`,
              transform: `rotate(${piece.rotation}deg)`,
            }}
          />
        ))}
      </div>

      {/* ========================================================= */}
      {/* INITIAL FLYING CONFETTI POP */}
      {/* ========================================================= */}

      {showPopConfetti && (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[60] overflow-hidden relative z-10">
          {popConfetti.map((piece) => (
            <span
              key={`pop-${piece.id}`}
              className="absolute left-1/2 top-[38%] rounded-sm animate-confetti-pop"
              style={
                {
                  width: `${piece.size}px`,
                  height: `${piece.size * 1.8}px`,
                  "--x": `${piece.x}px`,
                  "--y": `${piece.y}px`,
                  "--rotation": `${piece.rotation}deg`,
                  animationDelay: `${piece.delay}ms`,
                } as React.CSSProperties
              }
            />
          ))}
        </div>
      )}

      {/* ========================================================= */}
      {/* BACKGROUND DECORATION */}
      {/* ========================================================= */}

      <div className="pointer-events-none absolute left-1/2 top-0 h-[650px] w-[650px] -translate-x-1/2 rounded-full bg-green-200/30 blur-3xl" />

      <div className="pointer-events-none absolute -left-40 top-1/3 h-96 w-96 rounded-full bg-emerald-200/20 blur-3xl" />

      <div className="pointer-events-none absolute -right-40 top-1/2 h-96 w-96 rounded-full bg-lime-200/20 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 py-12 md:py-20">
        <div
          className={`text-center transition-all duration-1000 ${
            showContent
              ? "translate-y-0 opacity-100"
              : "translate-y-6 opacity-0"
          }`}>
          {/* Success Icon */}
          <div className="relative mx-auto mb-8 h-32 w-32">
            {/* Outer pulse */}
            <div className="absolute inset-0 animate-ping rounded-full bg-green-400/20" />

            {/* Glow */}
            <div className="absolute -inset-4 rounded-full bg-green-400/10 blur-xl" />

            {/* Main circle */}
            <div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-600 shadow-2xl shadow-green-500/30">
              <div className="flex h-24 w-24 items-center justify-center rounded-full border border-white/30 bg-white/10">
                <Check
                  className="h-14 w-14 animate-success-check text-white"
                  strokeWidth={3}
                />
              </div>
            </div>

            {/* Floating trophy */}
            <div className="absolute -right-5 -top-2 flex h-12 w-12 rotate-12 items-center justify-center rounded-2xl border border-white bg-white shadow-xl">
              <Trophy className="h-6 w-6 text-amber-500" />
            </div>
          </div>

          {/* Status badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-2 text-sm font-semibold text-green-700">
            <CheckCircle2 className="h-4 w-4" />
            Booking Confirmed
          </div>

          <h1 className="mt-6 text-4xl font-black tracking-tight text-slate-900 md:text-6xl">
            You&apos;re All Set!
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate-500">
            Your arena booking has been successfully confirmed. Get your team
            ready — it&apos;s game time!
          </p>
        </div>

        {/* ======================================================= */}
        {/* BOOKING REFERENCE */}
        {/* ======================================================= */}

        <div
          className={`mx-auto mt-10 max-w-xl transition-all delay-200 duration-700 ${
            showContent
              ? "translate-y-0 opacity-100"
              : "translate-y-6 opacity-0"
          }`}>
          <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Booking Reference
              </p>

              <p className="mt-1 font-mono text-lg font-bold text-slate-900">
                {booking.bookingId!}
              </p>
            </div>

            <button
              type="button"
              onClick={copyReference}
              className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-slate-900">
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-green-600" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  Copy
                </>
              )}
            </button>
          </div>
        </div>

        {/* ======================================================= */}
        {/* BOOKING CARD */}
        {/* ======================================================= */}

        <div
          className={`mx-auto mt-8 max-w-4xl transition-all delay-300 duration-700 ${
            showContent
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          }`}>
          <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_25px_80px_rgba(15,23,42,0.08)]">
            {/* Card Header */}
            <div className="flex flex-col gap-4 border-b border-slate-100 bg-slate-50/70 p-6 md:flex-row md:items-center md:justify-between md:px-8">
              <div>
                <p className="text-sm font-medium text-slate-400">
                  Your Reservation
                </p>

                <h2 className="mt-1 text-xl font-bold text-slate-900">
                  {booking.teamName}
                </h2>
              </div>

              <div className="flex w-fit items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700 capitalize">
                <span className="h-2 w-2 animate-pulse rounded-full bg-green-500 " />
                {booking.status}
              </div>
            </div>

            {/* Main Details */}
            <div className="grid md:grid-cols-2">
              {/* Date */}
              <div className="border-b border-slate-100 p-8 md:border-r">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-green-600">
                    <CalendarDays className="h-6 w-6" />
                  </div>

                  <div>
                    <p className="text-sm text-slate-400">Playing Date</p>

                    <p className="mt-1 text-lg font-bold text-slate-900">
                      {formattedDate}
                    </p>
                  </div>
                </div>
              </div>

              {/* Time */}
              <div className="border-b border-slate-100 p-8">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-green-600">
                    <Clock3 className="h-6 w-6" />
                  </div>

                  <div>
                    <p className="text-sm text-slate-400">Playing Time</p>

                    <p className="mt-1 text-lg font-bold text-slate-900">
                      {booking.startTime}

                      <span className="mx-2 text-slate-300">—</span>

                      {booking.endTime}
                    </p>
                  </div>
                </div>
              </div>

              {/* Team */}
              <div className="border-b border-slate-100 p-8 md:border-b-0 md:border-r">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-green-600">
                    <Users className="h-6 w-6" />
                  </div>

                  <div>
                    <p className="text-sm text-slate-400">Team</p>

                    <p className="mt-1 text-lg font-bold text-slate-900">
                      {booking.teamName}
                    </p>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="p-8">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-green-50 text-green-600">
                    <MapPin className="h-6 w-6" />
                  </div>

                  <div>
                    <p className="text-sm text-slate-400">Location</p>

                    <p className="mt-1 text-lg font-bold text-slate-900">
                      Mak Sports Arena
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment */}
            <div className="border-t border-slate-100 bg-slate-50/50 p-6 md:px-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-slate-400">Payment Status</p>

                  <div className="mt-1 flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />

                    <span className="font-semibold text-green-700">
                      Payment Successful
                    </span>
                  </div>
                </div>

                <div className="sm:text-right">
                  <p className="text-sm text-slate-400">Total Paid</p>

                  <p className="text-2xl font-black text-slate-900">
                    UGX {booking?.fee?.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ======================================================= */}
        {/* WHAT'S NEXT */}
        {/* ======================================================= */}

        <div
          className={`mx-auto mt-10 max-w-4xl transition-all delay-500 duration-700 ${
            showContent
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          }`}>
          <div className="rounded-[28px] border border-green-100 bg-gradient-to-br from-green-50 to-emerald-50 p-6 md:p-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-center">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white shadow-sm">
                <Trophy className="h-7 w-7 text-green-600" />
              </div>

              <div className="flex-1">
                <h3 className="text-lg font-bold text-slate-900">
                  What&apos;s next?
                </h3>

                <p className="mt-1 text-sm leading-relaxed text-slate-600">
                  Your booking is secured. Arrive a few minutes before your
                  scheduled time and get your team ready to play.
                </p>
              </div>

              <div className="rounded-xl bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm">
                See you on the pitch! ⚽
              </div>
            </div>
          </div>
        </div>

        {/* ======================================================= */}
        {/* ACTIONS */}
        {/* ======================================================= */}

        <div
          className={`mt-10 flex flex-col justify-center gap-3 transition-all delay-700 duration-700 sm:flex-row ${
            showContent
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          }`}>
          {booking.uid !== " " && (
            <Link
              href="/team-management"
              className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-7 py-4 font-semibold text-white shadow-lg transition hover:-translate-y-1 hover:shadow-xl">
              Go to Dashboard
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          )}

          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-7 py-4 font-semibold text-slate-700 shadow-sm transition hover:-translate-y-1 hover:bg-slate-50">
            <Share2 className="h-5 w-5" />
            Share Booking
          </button>

          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-2xl px-7 py-4 font-semibold text-slate-500 transition hover:text-slate-900">
            <Home className="h-5 w-5" />
            Back Home
          </Link>
        </div>

        {/* ======================================================= */}
        {/* FOOTER MESSAGE */}
        {/* ======================================================= */}

        <p
          className={`mt-12 text-center text-sm text-slate-400 transition-opacity delay-1000 duration-1000 ${
            showContent ? "opacity-100" : "opacity-0"
          }`}>
          A confirmation has been sent to your registered contact details.
        </p>
      </div>
    </main>
  );
}
