import { BookingType } from "@/app/types/booking";

export default function team_email_template(data: BookingType) {
  const escapeHtml = (value: unknown): string =>
    String(value ?? "N/A").replace(/[&<>"']/g, (char) => {
      const entities: Record<string, string> = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      };
      return entities[char];
    });

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

  const bookingId = escapeHtml(data.bookingId);
  const email = escapeHtml(data.contactInformation?.email);
  const phone = escapeHtml(data.contactInformation?.phone);
  const startTime = escapeHtml(data.startTime);
  const endTime = escapeHtml(data.endTime);
  const duration = escapeHtml(data.duration);
  const fee = escapeHtml(data.fee);
  const status = escapeHtml(data.status ?? "Pending");
  const bookingDate = formatDate(data.date);

  const notificationDate = new Date().toLocaleString("en-UG", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Africa/Kampala",
  });

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="light">
  <meta name="supported-color-schemes" content="light">
  <title>New Booking Received | Mak Sports Arena</title>
</head>

<body style="
  margin: 0;
  padding: 0;
  background-color: #f6f8fa;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
  color: #101b3c;
  -webkit-font-smoothing: antialiased;
">

  <!-- Preheader -->
  <div style="
    display: none;
    max-height: 0;
    overflow: hidden;
    opacity: 0;
    color: transparent;
  ">
    A new booking has been received. Reference: #${bookingId}
  </div>

  <!-- Main Container -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0"
    role="presentation"
    style="background-color: #f6f8fa; padding: 40px 16px;"
  >
    <tr>
      <td align="center">

        <!-- Email Wrapper -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0"
          role="presentation"
          style="max-width: 600px;"
        >

          <!-- Brand Header -->
          <tr>
            <td align="center" style="padding: 0 0 28px;">
              <img
                src="https://book.maksportsarena.com/images/logo.png"
                width="120"
                alt="Mak Sports Arena"
                style="background-color:#101b3c;padding:8px; border-radius:5px;"
              >
            </td>
          </tr>

          <!-- Main Card -->
          <tr>
            <td style="
              background-color: #ffffff;
              border: 1px solid #e5e9ef;
              border-radius: 8px;
              overflow: hidden;
            ">

              <!-- Accent -->
              <table width="100%" cellpadding="0" cellspacing="0"
                role="presentation">
                <tr>
                  <td height="4" style="
                    height: 4px;
                    background-color: #48b84b;
                    font-size: 0;
                    line-height: 4px;
                  ">&nbsp;</td>
                </tr>
              </table>

              <!-- Introduction -->
              <table width="100%" cellpadding="0" cellspacing="0"
                role="presentation">
                <tr>
                  <td style="padding: 36px 36px 24px;">

                    <p style="
                      margin: 0 0 12px;
                      color: #48a94b;
                      font-size: 12px;
                      font-weight: 700;
                      letter-spacing: 1px;
                      text-transform: uppercase;
                    ">
                      Booking notification
                    </p>

                    <h1 style="
                      margin: 0 0 12px;
                      color: #101b3c;
                      font-size: 25px;
                      line-height: 1.35;
                      font-weight: 650;
                      letter-spacing: -0.6px;
                    ">
                      New booking received
                    </h1>

                    <p style="
                      margin: 0;
                      color: #667085;
                      font-size: 14px;
                      line-height: 1.7;
                    ">
                      Hello <span style="font-weight:500">${data.contactInformation.name}</span>, Your booking has been successfully submitted to Maksports Arena! We're pleased to have you with us.
                    </p>

                  </td>
                </tr>
              </table>

              <!-- Booking Reference -->
              <table width="100%" cellpadding="0" cellspacing="0"
                role="presentation">
                <tr>
                  <td style="padding: 0 36px 28px;">

                    <table width="100%" cellpadding="0" cellspacing="0"
                      role="presentation"
                      style="
                        background-color: #f7f9fc;
                        border: 1px solid #e9edf2;
                        border-radius: 6px;
                      ">
                      <tr>
                        <td style="padding: 18px 20px;">

                          <p style="
                            margin: 0 0 7px;
                            color: #667085;
                            font-size: 12px;
                            font-weight: 500;
                          ">
                            BOOKING REFERENCE
                          </p>
                     <div style="font-size:18px;line-height:1.3;font-weight:600;color:#339035;">
                        
                            #${bookingId}
                          </div>

                        </td>
                      </tr>
                    </table>

                  </td>
                </tr>
              </table>

              <!-- Divider -->
              <table width="100%" cellpadding="0" cellspacing="0"
                role="presentation">
                <tr>
                  <td style="padding: 0 36px;">
                    <div style="
                      height: 1px;
                      background-color: #eaecf0;
                      font-size: 0;
                    ">&nbsp;</div>
                  </td>
                </tr>
              </table>

              <!-- Booking Information -->
              <table width="100%" cellpadding="0" cellspacing="0"
                role="presentation">

                <tr>
                  <td style="padding: 28px 36px 14px;">
                    <h2 style="
                      margin: 0;
                      color: #101b3c;
                      font-size: 15px;
                      font-weight: 650;
                    ">
                      Booking information
                    </h2>
                  </td>
                </tr>

                <!-- Booking Date -->
                <tr>
                  <td style="padding: 12px 36px;">
                    <table width="100%" cellpadding="0" cellspacing="0"
                      role="presentation">
                      <tr>
                        <td style="
                          color: #667085;
                          font-size: 13px;
                        ">
                          Booking Date
                        </td>
                        <td align="right" style="
                          color: #101b3c;
                          font-size: 13px;
                          font-weight: 600;
                        ">
                          ${bookingDate}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Start Time -->
                <tr>
                  <td style="padding: 12px 36px;">
                    <table width="100%" cellpadding="0" cellspacing="0"
                      role="presentation">
                      <tr>
                        <td style="color: #667085; font-size: 13px;">
                          Start time
                        </td>
                        <td align="right" style="
                          color: #101b3c;
                          font-size: 13px;
                          font-weight: 600;
                        ">
                          ${startTime}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- End Time -->
                <tr>
                  <td style="padding: 12px 36px;">
                    <table width="100%" cellpadding="0" cellspacing="0"
                      role="presentation">
                      <tr>
                        <td style="color: #667085; font-size: 13px;">
                          End time
                        </td>
                        <td align="right" style="
                          color: #101b3c;
                          font-size: 13px;
                          font-weight: 600;
                        ">
                          ${endTime}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Duration -->
                <tr>
                  <td style="padding: 12px 36px;">
                    <table width="100%" cellpadding="0" cellspacing="0"
                      role="presentation">
                      <tr>
                        <td style="color: #667085; font-size: 13px;">
                          Duration
                        </td>
                        <td align="right" style="
                          color: #101b3c;
                          font-size: 13px;
                          font-weight: 600;
                        ">
                          ${duration}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                                <!-- Pitch -->
                                      <tr>
                  <td style="padding: 12px 36px;">
                    <table width="100%" cellpadding="0" cellspacing="0"
                      role="presentation">
                      <tr>
                        <td style="color: #667085; font-size: 13px;">
                          Pitch
                        </td>
                        <td align="right" style="
                          color: #101b3c;
                          font-size: 13px;
                          font-weight: 600;
                        ">
                          ${data.pitch.name}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

              </table>

              <!-- Customer Information -->
              <table width="100%" cellpadding="0" cellspacing="0"
                role="presentation">

                <tr>
                  <td style="padding: 25px 36px 14px;">
                    <h2 style="
                      margin: 0;
                      color: #101b3c;
                      font-size: 15px;
                      font-weight: 650;
                    ">
                      Customer information
                    </h2>
                  </td>
                </tr>

                <!-- Email -->
                <tr>
                  <td style="padding: 12px 36px;">
                    <table width="100%" cellpadding="0" cellspacing="0"
                      role="presentation">
                      <tr>
                        <td style="color: #667085; font-size: 13px;">
                          Email address
                        </td>
                        <td align="right" style="
                          color: #101b3c;
                          font-size: 13px;
                          font-weight: 600;
                          word-break: break-word;
                        ">
                          ${email}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Phone -->
                <tr>
                  <td style="padding: 12px 36px 26px;">
                    <table width="100%" cellpadding="0" cellspacing="0"
                      role="presentation">
                      <tr>
                        <td style="color: #667085; font-size: 13px;">
                          Phone number
                        </td>
                        <td align="right" style="
                          color: #101b3c;
                          font-size: 13px;
                          font-weight: 600;
                        ">
                          ${phone}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

              </table>

              <!-- Payment Summary -->
              <table width="100%" cellpadding="0" cellspacing="0"
                role="presentation">
                <tr>
                  <td style="padding: 0 36px 30px;">

                    <table width="100%" cellpadding="0" cellspacing="0"
                      role="presentation"
                      style="
                        background-color: #f7f9fc;
                        border: 1px solid #e9edf2;
                        border-radius: 6px;
                      ">

                      <tr>
                        <td style="padding: 18px 20px 10px;">
                          <p style="
                            margin: 0;
                            color: #667085;
                            font-size: 12px;
                            font-weight: 600;
                            letter-spacing: 0.5px;
                            text-transform: uppercase;
                          ">
                            Booking fee
                          </p>
                        </td>
                      </tr>

                      <tr>
                        <td style="padding: 0 20px 16px;">
                          <table width="100%" cellpadding="0" cellspacing="0"
                            role="presentation">
                            <tr>
                              <td style="
                                color: #101b3c;
                                font-size: 25px;
                                font-weight: 700;
                              ">
                                UGX ${fee}
                              </td>
                              <td align="right">
                                <span style="
                                  display: inline-block;
                                  padding: 5px 10px;
                                  border-radius: 20px;
                                  background-color: #eef2f6;
                                  color: #475467;
                                  font-size: 11px;
                                  font-weight: 600;
                                  text-transform:capitalize
                                ">
                                  ${status}
                                </span>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>

                      <tr>
                        <td style="
                          padding: 12px 20px;
                          border-top: 1px solid #e5e9ef;
                        ">
                          <p style="
                            margin: 0;
                            color: #667085;
                            font-size: 12px;
                          ">
                            Payment status
                          </p>
                        </td>
                        <td align="right" style="
                          padding: 12px 20px;
                          border-top: 1px solid #e5e9ef;
                          color: #101b3c;
                          font-size: 12px;
                          font-weight: 600;
                        ">
                          ${status}
                        </td>
                      </tr>

                    </table>

                  </td>
                </tr>
              </table>

              <!-- Admin Notice -->
              <table width="100%" cellpadding="0" cellspacing="0"
                role="presentation">
                <tr>
                  <td style="padding: 0 36px 30px;">
                    <p style="
                      margin: 0;
                      color: #667085;
                      font-size: 13px;
                      line-height: 1.7;
                    ">
                      <strong style="color: #101b3c;">
                        Action required:
                      </strong>
                      Please review this booking in the administration
                      dashboard and take any necessary action.
                    </p>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Dashboard Button -->
          <tr>
            <td align="center" style="padding: 28px 20px 12px;">

              <table cellpadding="0" cellspacing="0" border="0"
                role="presentation">
                <tr>
                  <td align="center" bgcolor="#101b3c"
                    style="border-radius: 5px;">
                    <a
                      href="https://book.maksportsarena.com/team-management"
                      target="_blank"
                      style="
                        display: inline-block;
                        padding: 14px 28px;
                        color: #ffffff;
                        font-size: 14px;
                        font-weight: 600;
                        text-decoration: none;
                        border-radius: 5px;
                      "
                    >
                      View booking in dashboard
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding: 24px 20px 10px;">

              <p style="
                margin: 0 0 8px;
                color: #101b3c;
                font-size: 14px;
                font-weight: 700;
              ">
                Mak Sports Arena
              </p>

              <p style="
                margin: 0 0 12px;
                color: #667085;
                font-size: 12px;
                line-height: 1.6;
              ">
                Making every game count.
              </p>

              <p style="
                margin: 0 0 12px;
                color: #98a2b3;
                font-size: 11px;
                line-height: 1.6;
              ">
                For assistance, contact
                <a href="mailto:info@maksportsarena.ug"
                  style="color: #475467; text-decoration: none;">
                  info@maksportsarena.ug
                </a>
              </p>

              <p style="
                margin: 0;
                color: #98a2b3;
                font-size: 11px;
                line-height: 1.6;
              ">
                This is an automated administrative notification.
                Please do not forward this email.
              </p>

              <p style="
                margin: 14px 0 0;
                color: #98a2b3;
                font-size: 10px;
              ">
                Notification generated on ${notificationDate}
              </p>

            </td>
          </tr>

        </table>
        <!-- End Email Wrapper -->

      </td>
    </tr>
  </table>

</body>
</html>`;
}
