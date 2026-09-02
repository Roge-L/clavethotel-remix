import { Resend } from "resend";
import type { AppLoadContext } from "react-router";

type BookingData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  room: string;
  checkIn: string;
  checkOut: string;
  specialRequests?: string;
};

function getResendClient(context: AppLoadContext) {
  const resendApiKey = context.cloudflare.env.RESEND_API_KEY;

  if (!resendApiKey) {
    throw new Error("Missing Resend API key in environment variables");
  }

  return new Resend(resendApiKey);
}

/** Guest-supplied values land in an HTML email, so escape before interpolating. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function row(label: string, value: string) {
  return `<p><strong>${label}:</strong> ${escapeHtml(value)}</p>`;
}

export async function sendBookingEmail(
  bookingData: BookingData,
  context: AppLoadContext
) {
  const resend = getResendClient(context);
  const guest = `${bookingData.firstName} ${bookingData.lastName}`;

  const { data, error } = await resend.emails.send({
    from: "Clavet Motor Inn Bookings <book@clavethotel.com>",
    to: ["management@clavethotel.com"],
    replyTo: bookingData.email,
    subject: `New Booking Request - ${guest}`,
    html: [
      "<h2>New Booking Request</h2>",
      row("Guest", guest),
      row("Email", bookingData.email),
      row("Phone", bookingData.phone),
      row("Room Type", bookingData.room),
      row("Check-in", bookingData.checkIn),
      row("Check-out", bookingData.checkOut),
      bookingData.specialRequests
        ? row("Special Requests", bookingData.specialRequests)
        : "",
    ].join("\n"),
  });

  if (error) {
    console.error("Resend error:", error);
    return Response.json(
      { error: "Failed to send booking email." },
      { status: 502 }
    );
  }

  return Response.json(data);
}
