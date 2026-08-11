import { TimeSlot } from "@/app/booking/page";
import {
  CalendarDays,
  Clock3,
  Users,
  User,
  Phone,
  CreditCard,
  ArrowRight,
  UnfoldVertical,
  Clock10Icon,
} from "lucide-react";
import { BookingFormData } from "./BookingForm";
import { useEffect } from "react";

interface ReviewPaymentProps {
  date: Date | undefined;
  selectedSlot: TimeSlot;
  booking: BookingFormData;
  amount: number;
  loading?: boolean;
  duration: number;
  error?: string | null;
  onProceedToPayment: () => void;
}

const ReviewAndPayment = ({
  date,
  selectedSlot,
  booking,
  amount,
  loading,
  duration,
  error,
  onProceedToPayment,
}: ReviewPaymentProps) => {
  useEffect(() => {
    console.log("Show this error");
  }, [error]);

  return (
    <div className="grid gap-8 lg:grid-cols-[420px_1fr]">
      {/* LEFT COLUMN */}
      <div className="rounded-xl border border-slate-500 bg-card p-8 shadow-sm">
        <h2 className="mb-6 text-2xl font-bold">Booking Summary</h2>

        <div className="space-y-6">
          {/* Date */}

          <div className="flex gap-4">
            <CalendarDays className="mt-1 h-5 w-5 text-primary" />

            <div>
              <p className="text-sm text-muted-foreground">Playing Date</p>

              <p className="slot-label font-semibold">
                {date?.toLocaleDateString("en-US", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>

          {/* Slot */}
          <div className="flex gap-4">
            <Clock3 className="mt-1 h-5 w-5 text-primary" />

            <div>
              <p className="text-sm text-muted-foreground">Reserved Slot</p>

              <div className="mt-2 flex items-center gap-3">
                <div className={`${error ? "slot-time-error" : "slot-time"}`}>
                  {selectedSlot?.startTime}
                </div>

                <UnfoldVertical
                  className={error ? "text-error" : "text-slate-600"}
                />

                <div className={error ? "slot-time-error" : "slot-time"}>
                  {selectedSlot?.endTime}
                </div>
              </div>
            </div>
          </div>
          {error && (
            <p className="text-red-700 p-2 border border-red-700 bg-red-100 rounded-md text-sm">
              {error}
            </p>
          )}

          <div className="border-t border-t-slate-300 pt-6">
            <h3 className="mb-4 font-semibold">Team Information</h3>

            <div className="space-y-4">
              <div className="flex gap-4">
                <span className="spn">
                  <Users className="h-5 w-5 text-primary" />
                </span>{" "}
                <div>
                  <p className="text-sm text-muted-foreground">Team Name</p>

                  <p className="slot-label font-medium">{booking.teamName}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="spn">
                  <User className="h-5 w-5 text-primary" />
                </span>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Contact Person
                  </p>

                  <p className="slot-label font-medium">
                    {booking.contactPerson}
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="spn">
                  <Phone className="h-5 w-5 text-primary" />
                </span>
                <div>
                  <p className="text-sm text-muted-foreground">Phone Number</p>

                  <p className="slot-label font-medium">{booking.phone}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="spn">
                  <Users className="h-5 w-5 text-primary" />
                </span>

                <div>
                  <p className="text-sm text-muted-foreground">N.O Players</p>

                  <p className="slot-label capitalize font-medium">
                    {booking.numberOfPlayers} players
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN */}
      <div className="rounded-xl border border-slate-500 bg-card p-8 shadow-sm">
        <div className="mb-8">
          <h2 className="text-2xl font-bold">Payment</h2>

          <p className="mt-2 text-muted-foreground">
            Complete your booking by making payment through our secure payment
            partner.
          </p>
        </div>

        <div className="rounded-xl border border-slate-300 bg-green-100 p-6 flex items-center justify-between flex-wrap">
          <div>
            <div className="flex items-center gap-3">
              <CreditCard className="h-5 w-5 text-primary" />

              <span className="font-medium">Amount Payable</span>
            </div>

            <div className="mt-4">
              <h3 className="text-5xl font-black text-green-900 tracking-tight">
                UGX {amount.toLocaleString()}
              </h3>
            </div>
          </div>

          <div className="">
            <div className="flex items-center gap-3">
              <Clock10Icon className="h-5 w-5 text-primary" />{" "}
              <span>Duration</span>
            </div>
            <div className="font-semibold text-3xl mt-4 text-slate-700">
              {duration} Mins
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-xl border border-primary/20 bg-primary/5 p-6">
          <h4 className="font-semibold">Before you continue</h4>

          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li>• You will be redirected to a secure payment platform.</li>

            <li>
              • Complete payment using Mobile Money, Card, or other available
              methods.
            </li>

            <li>
              • Your booking will be confirmed once payment is successfully
              received.
            </li>

            <li>
              • A confirmation message will be sent to your contact number.
            </li>
          </ul>
        </div>

        <button
          onClick={onProceedToPayment}
          disabled={loading}
          className="flex items-center flex-row mt-8 gap-3 justify-center w-full rounded-xl bg-black py-3 font-semibold text-white transition hover:bg-gray-900 disabled:cursor-not-allowed disabled:opacity-60">
          {loading ? (
            "Redirecting..."
          ) : (
            <>
              I&rsquo;m Ready To Pay
              <ArrowRight className="h-5 w-5" />
            </>
          )}
        </button>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          By proceeding, you agree to complete payment for the selected booking
          slot.
        </p>
      </div>
    </div>
  );
};

export default ReviewAndPayment;
