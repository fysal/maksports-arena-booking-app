import { BookingType } from "@/app/types/booking";

const escapeHtml = (value: unknown): string =>
  String(value ?? "—")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const escapeSpace = (value: unknown): string => {
  return String(value).replace(/ /g, "-").replace(/:/g, "-").replace(/,/g, "-");
};

const formatDate = (value: unknown) => {
  if (!value) return "—";

  const date = new Date(String(value));

  if (Number.isNaN(date.getTime())) return escapeHtml(value);

  return date.toLocaleDateString("en-UG", {
    timeZone: "Africa/Kampala",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

const formatAmount = (value: unknown) => {
  const amount = Number(value);

  if (!Number.isFinite(amount)) return escapeHtml(value);

  return `UGX ${new Intl.NumberFormat("en-UG").format(amount)}`;
};

export const printBooking = (data: BookingType) => {
  const printWindow = window.open("", "_blank", "width=900,height=750");

  if (!printWindow) {
    alert("Please allow pop-ups to print the booking.");
    return;
  }

  const bookingId = escapeHtml(data.bookingId);
  const teamName = escapeHtml(data.teamName);
  const customerName = escapeHtml(data.contactInformation?.name);
  const email = escapeHtml(data.contactInformation?.email);
  const phone = escapeHtml(data.contactInformation?.phone);
  const date = formatDate(data.date);
  const startTime = escapeHtml(data.startTime);
  const endTime = escapeHtml(data.endTime);
  const duration = escapeHtml(data.duration);
  const fee = formatAmount(data.fee);
  const status = escapeHtml(data.status);
  const pitch = escapeHtml(data.pitch.name);

  const printedOn = escapeHtml(
    new Date().toLocaleString("en-UG", {
      timeZone: "Africa/Kampala",
      dateStyle: "medium",
      timeStyle: "short",
    }),
  );

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Booking #${escapeSpace(printedOn)} - Maksports Arena</title>

      <style>
        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          padding: 35px;
          font-family: Arial, Helvetica, sans-serif;
          color: #101b3c;
          background: #fff;
        }

        .document {
          max-width: 760px;
          margin: 0 auto;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 25px;
          border-bottom: 3px solid #48b84b;
        }

        .logo {
          width: 170px;
          height: auto;
        }

        .document-label {
          text-align: right;
          color: #64748b;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .title {
          margin-top: 35px;
        }

        h1 {
          font-size: 25px;
          margin: 0 0 8px;
        }

        .subtitle {
          color: #64748b;
          font-size: 14px;
          margin: 0;
        }

        .reference {
          margin: 25px 0;
          padding: 18px 20px;
          background: #f1f8f1;
          border-left: 4px solid #48b84b;
        }

        .reference-label {
          font-size: 11px;
          color: #64748b;
          letter-spacing: 1px;
          margin-bottom: 7px;
        }

        .reference-value {
          font-size: 15px;
          font-weight: bold;
        }

        .section {
          margin-top: 28px;
        }

        h2 {
          font-size: 16px;
          margin: 0 0 12px;
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        td {
          padding: 13px 15px;
          font-size: 13px;
          border-bottom: 1px solid #e5e7eb;
        }

        td:first-child {
          width: 40%;
          color: #64748b;
        }

        td:last-child {
          font-weight: 600;
          text-align: right;
          overflow-wrap: anywhere;
        }

        .status {
          display: inline-block;
          padding: 5px 10px;
          background: #eef7ee;
          color: #218b31;
          border-radius: 20px;
          font-size: 11px;
        }

        .footer {
          margin-top: 45px;
          padding-top: 18px;
          border-top: 1px solid #e5e7eb;
          text-align: center;
          color: #64748b;
          font-size: 12px;
        }

        .footer strong {
          display: block;
          color: #101b3c;
          font-size: 15px;
          margin-bottom: 5px;
        }

        @media print {
          body {
            padding: 0;
          }

          @page {
            size: A4;
            margin: 18mm;
          }
        }
      </style>
    </head>

    <body>
      <main class="document">

        <header class="header">
          <img
            class="logo"
            width="120"
            src="https://book.maksportsarena.com/images/logo.png"
            alt="Maksports Arena"
            style="background-color:#101b3c; padding:8px;border-radius:5px"
          />

          <div class="document-label">
            Booking Receipt
          </div>
        </header>

        <div class="reference">
          <div class="reference-label">BOOKING REFERENCE</div>
          <div class="reference-value">#${bookingId}</div>
        </div>

        <section class="section">
          <h2>Booking Information</h2>

          <table>
            <tr><td>Team Name</td><td>${teamName}</td></tr>
            <tr><td>Booking Date</td><td>${date}</td></tr>
            <tr><td>Start Time</td><td>${startTime}</td></tr>
            <tr><td>End Time</td><td>${endTime}</td></tr>
            <tr><td>Duration</td><td>${duration}</td></tr>
            <tr><td>Booking Amount</td><td>${fee}</td></tr>
            <tr><td>Pitch</td><td>${pitch}</td></tr>
            <tr>
              <td>Payment Status</td>
              <td><span class="status">${status}</span></td>
            </tr>
          </table>
        </section>

        <section class="section">
          <h2>Customer Information</h2>

          <table>
            <tr><td>Contact Person</td><td>${customerName}</td></tr>
            <tr><td>Email Address</td><td>${email}</td></tr>
            <tr><td>Phone Number</td><td>${phone}</td></tr>
          </table>
        </section>

        <footer class="footer">
          <strong>Maksports Arena</strong>
          Making every game count.
          <br /><br />
          Printed on ${printedOn}
        </footer>

      </main>

      <script>
        const logo = document.querySelector(".logo");

        function printDocument() {
          window.focus();
          window.print();
        }

        if (logo.complete) {
          printDocument();
        } else {
          logo.onload = printDocument;
          logo.onerror = printDocument;
        }
      </script>
    </body>
    </html>
  `;

  printWindow.document.open();
  printWindow.document.write(html);
  printWindow.document.close();
};
