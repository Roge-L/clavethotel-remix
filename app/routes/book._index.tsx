import type { ActionFunctionArgs, MetaFunction } from "@remix-run/cloudflare";
import { redirect } from "@remix-run/cloudflare";
import BookingForm from "~/components/BookingForm";
import { sendBookingEmail } from "~/models/email.server";

export const meta: MetaFunction = () => {
  return [
    { title: "Book Your Stay - Clavet Motor Inn" },
    {
      name: "description",
      content:
        "Book your stay at Clavet Motor Inn. Clean, comfortable rooms at reasonable rates.",
    },
  ];
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const bookingData = {
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
    email: formData.get("email") as string,
    phone: formData.get("phone") as string,
    room: formData.get("room") as string,
    checkIn: formData.get("checkIn") as string,
    checkOut: formData.get("checkOut") as string,
    specialRequests: formData.get("specialRequests") as string,
  };

  const response = await sendBookingEmail(bookingData);

  if (response.status === 400) {
    // If there was an error sending the email
    return response;
  }

  // If email was sent successfully, redirect to success page
  return redirect("/book/success");
};

export default function Book() {
  return <BookingForm />;
}
