import { BookingType } from "@/app/types/booking";

const escapeHtml = (value: unknown): string =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const formatAmount = (value: unknown): string => {
  const amount = Number(value);

  return Number.isFinite(amount)
    ? new Intl.NumberFormat("en-UG").format(amount)
    : escapeHtml(value || "0");
};

const formatDate = (value: unknown): string => {
  if (!value) return "N/A";

  const date = value instanceof Date ? value : new Date(String(value));

  if (Number.isNaN(date.getTime())) {
    return escapeHtml(value);
  }

  return date.toLocaleString("en-UG", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Africa/Kampala",
  });
};

export default function admin_email_template(data: BookingType) {
  const bookingId = escapeHtml(data.bookingId);
  const teamName = escapeHtml(data.teamName || "N/A");
  const contactName = escapeHtml(data.contactInformation?.name || "N/A");
  const email = escapeHtml(data.contactInformation?.email || "N/A");
  const phone = escapeHtml(data.contactInformation?.phone || "N/A");

  const bookingDate = formatDate(data.date);
  const startTime = escapeHtml(data.startTime || "N/A");
  const endTime = escapeHtml(data.endTime || "N/A");
  const duration = escapeHtml(data.duration || "N/A");
  const fee = formatAmount(data.fee);
  const status = escapeHtml(data.status || "N/A");

  const notificationDate = new Date().toLocaleString("en-UG", {
    timeZone: "Africa/Kampala",
    dateStyle: "medium",
    timeStyle: "short",
  });

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Booking Notification - Maksports Arena</title>
</head>

<body style="margin:0;padding:0;background-color:#f3f4f6;font-family:Arial,Helvetica,sans-serif;color:#101b3c;">

  <table width="100%" cellpadding="0" cellspacing="0" border="0"
    style="background-color:#f3f4f6;padding:30px 15px;">
    <tr>
      <td align="center">

        <!-- Logo -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0"
          style="max-width:640px;">
          <tr>
            <td align="center" style="padding:0 0 22px;">
              <img
                src="https://book.maksportsarena.com/images/logo.png"
                width="120"
                alt="Maksports Arena"
                style="display:block;max-width:120px;height:auto;
                border:0;background-color:#101b3c;padding:8px; border-radius:5px;"
              />
            </td>
          </tr>
        </table>

        <!-- Main Email Card -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0"
          style="max-width:640px;background-color:#ffffff;">

          <!-- Green Accent -->
          <tr>
            <td height="6" style="background-color:#48b84b;font-size:0;line-height:0;">
              &nbsp;
            </td>
          </tr>

          <!-- Heading -->
          <tr>
            <td align="center" style="padding:35px 30px 20px;">

              <div style="display:inline-block;background-color:#e7f8e7;color:#218b31;font-size:12px;font-weight:bold;letter-spacing:1px;padding:8px 14px;">
                ADMIN NOTIFICATION
              </div>

              <h1 style="margin:20px 0 10px;font-size:26px;line-height:1.4;font-weight:700;color:#101b3c;">
                New Booking Received
              </h1>

              <p style="margin:0;font-size:15px;line-height:1.6;color:#6b7280;">
                A new booking has been submitted through the
                Maksports Arena booking platform. Here are the details
                for your review.
              </p>

            </td>
          </tr>

          <!-- Booking Reference -->
          <tr>
            <td align="center" style="padding:5px 30px 25px;">

              <p style="margin:0 0 8px;font-size:12px;font-weight:bold;letter-spacing:1.5px;color:#6b7280;">
                BOOKING REFERENCE
              </p>

              <div style="font-size:18px;line-height:1.3;font-weight:600;color:#339035;">
                #${bookingId}
              </div>

            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding:0 30px;">
              <div style="height:1px;background-color:#e5e7eb;"></div>
            </td>
          </tr>

          <!-- Booking Details -->
          <tr>
            <td style="padding:25px 30px 10px;">

              <h2 style="margin:0 0 15px;font-size:16px;font-weight:700;color:#101b3c;">
                Booking Details
              </h2>

              <table width="100%" cellpadding="0" cellspacing="0" border="0"
                style="background-color:#f7f8fa;">

                <tr>
                  <td width="42%" style="padding:13px 15px;font-size:14px;color:#6b7280;">
                    Team Name
                  </td>
                  <td style="padding:13px 15px;font-size:14px;font-weight:bold;color:#101b3c;">
                    ${teamName}
                  </td>
                </tr>

                <tr>
                  <td style="padding:13px 15px;font-size:14px;color:#6b7280;border-top:1px solid #e5e7eb;">
                    Booking Date
                  </td>
                  <td style="padding:13px 15px;font-size:14px;font-weight:bold;color:#101b3c;border-top:1px solid #e5e7eb;">
                    ${bookingDate}
                  </td>
                </tr>

                <tr>
                  <td style="padding:13px 15px;font-size:14px;color:#6b7280;border-top:1px solid #e5e7eb;">
                    Start Time
                  </td>
                  <td style="padding:13px 15px;font-size:14px;font-weight:bold;color:#101b3c;border-top:1px solid #e5e7eb;">
                    ${startTime}
                  </td>
                </tr>

                <tr>
                  <td style="padding:13px 15px;font-size:14px;color:#6b7280;border-top:1px solid #e5e7eb;">
                    End Time
                  </td>
                  <td style="padding:13px 15px;font-size:14px;font-weight:bold;color:#101b3c;border-top:1px solid #e5e7eb;">
                    ${endTime}
                  </td>
                </tr>

                <tr>
                  <td style="padding:13px 15px;font-size:14px;color:#6b7280;border-top:1px solid #e5e7eb;">
                    Duration
                  </td>
                  <td style="padding:13px 15px;font-size:14px;font-weight:bold;color:#101b3c;border-top:1px solid #e5e7eb;">
                    ${duration}
                  </td>
                </tr>

                <tr>
                  <td style="padding:13px 15px;font-size:14px;color:#6b7280;border-top:1px solid #e5e7eb;">
                    Booking Amount
                  </td>
                  <td style="padding:13px 15px;font-size:15px;font-weight:bold;color:#101b3c;border-top:1px solid #e5e7eb;">
                    UGX ${fee}
                  </td>
                </tr>
                         <tr>
                  <td style="padding:13px 15px;font-size:14px;color:#6b7280;border-top:1px solid #e5e7eb;">
                    Pitch
                  </td>
                  <td style="padding:13px 15px;font-size:15px;font-weight:bold;color:#101b3c;border-top:1px solid #e5e7eb;">
                     ${data.pitch.name}
                  </td>
                </tr>

                <tr>
                  <td style="padding:13px 15px;font-size:14px;color:#6b7280;border-top:1px solid #e5e7eb;">
                    Payment Status
                  </td>
                  <td style="padding:13px 15px;font-size:14px;font-weight:bold;color:#101b3c;border-top:1px solid #e5e7eb;text-transform:capitalize;">
                    ${status}
                  </td>
                </tr>

              </table>
            </td>
          </tr>

          <!-- Customer Information -->
          <tr>
            <td style="padding:20px 30px 25px;">

              <h2 style="margin:0 0 15px;font-size:16px;font-weight:700;color:#101b3c;">
                Customer Information
              </h2>

              <table width="100%" cellpadding="0" cellspacing="0" border="0"
                style="background-color:#f7f8fa;">

                <tr>
                  <td width="42%" style="padding:13px 15px;font-size:14px;color:#6b7280;">
                    Contact Person
                  </td>
                  <td style="padding:13px 15px;font-size:14px;font-weight:bold;color:#101b3c;">
                    ${contactName}
                  </td>
                </tr>

                <tr>
                  <td style="padding:13px 15px;font-size:14px;color:#6b7280;border-top:1px solid #e5e7eb;">
                    Email Address
                  </td>
                  <td style="padding:13px 15px;font-size:14px;font-weight:bold;color:#101b3c;border-top:1px solid #e5e7eb;word-break:break-word;">
                    <a href="mailto:${email}" style="color:#1683e9;text-decoration:none;">
                      ${email}
                    </a>
                  </td>
                </tr>

                <tr>
                  <td style="padding:13px 15px;font-size:14px;color:#6b7280;border-top:1px solid #e5e7eb;">
                    Phone Number
                  </td>
                  <td style="padding:13px 15px;font-size:14px;font-weight:bold;color:#101b3c;border-top:1px solid #e5e7eb;">
                    <a href="tel:${phone}" style="color:#1683e9;text-decoration:none;">
                      ${phone}
                    </a>
                  </td>
                </tr>

              </table>
            </td>
          </tr>

          <!-- Admin Notice -->
          <tr>
            <td style="padding:0 30px 25px;">

              <table width="100%" cellpadding="0" cellspacing="0" border="0"
                style="background-color:#eef7ee;border-left:4px solid #48b84b;">
                <tr>
                  <td style="padding:16px 18px;">
                    <p style="margin:0;font-size:14px;line-height:1.7;color:#374151;">
                      <strong style="color:#101b3c;">Action Required</strong><br />
                      Please review this booking in the admin dashboard
                      and take any necessary action.
                    </p>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Notification Timestamp -->
          <tr>
            <td align="center" style="padding:0 30px 25px;">
              <p style="margin:0;font-size:12px;color:#9ca3af;">
                Notification generated on ${escapeHtml(notificationDate)}
              </p>
            </td>
          </tr>

        </table>

        <!-- Dashboard CTA -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0"
          style="max-width:640px;">
          <tr>
            <td align="center" style="padding:25px 15px 15px;">

              <a
                href="https://book.maksportsarena.com/dashboard"
                target="_blank"
                style="display:inline-block;background-color:#48b84b;color:#ffffff;font-size:15px;font-weight:bold;text-decoration:none;padding:14px 30px;border-radius:4px;"
              >
                View Booking in Dashboard
              </a>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding:15px 15px 5px;">

              <p style="margin:0 0 7px;font-size:16px;font-weight:bold;color:#101b3c;">
                Maksports Arena
              </p>

              <p style="margin:0;font-size:13px;font-style:italic;color:#6b7280;">
                Making every game count.
              </p>

              <p style="margin:15px 0 0;font-size:12px;color:#9ca3af;">
                This is an automated administrative notification.
              </p>

            </td>
          </tr>
        </table>

      </td>
    </tr>
  </table>

</body>
</html>`;
}
