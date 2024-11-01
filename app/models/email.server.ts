import { json } from "@remix-run/cloudflare";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

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

export async function sendBookingEmail(bookingData: BookingData) {
  const { data, error } = await resend.emails.send({
    from: "Clavet Motor Inn Bookings <book@clavethotel.com>",
    to: ["management@clavethotel.com"],
    subject: `New Booking Request - ${bookingData.firstName} ${bookingData.lastName}`,
    html: `
        <h2>New Booking Request</h2>
        <p><strong>Guest:</strong> ${bookingData.firstName} ${
      bookingData.lastName
    }</p>
        <p><strong>Email:</strong> ${bookingData.email}</p>
        <p><strong>Phone:</strong> ${bookingData.phone}</p>
        <p><strong>Room Type:</strong> ${bookingData.room}</p>
        <p><strong>Check-in:</strong> ${bookingData.checkIn}</p>
        <p><strong>Check-out:</strong> ${bookingData.checkOut}</p>
        ${
          bookingData.specialRequests
            ? `<p><strong>Special Requests:</strong> ${bookingData.specialRequests}</p>`
            : ""
        }
      `,
  });

  if (error) {
    return json({ error: "Failed to send booking email." }, { status: 400 });
  }

  return json(data, 200);
}
