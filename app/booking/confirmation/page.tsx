import React from "react";
import BookingSuccessPage from "./success";
import { redirect } from "next/navigation";

interface ConfirmationPageProps {
  searchParams: Promise<{
    ref?: string;
  }>;
}

const ConfirmationPage = async ({ searchParams }: ConfirmationPageProps) => {
  const params = await searchParams;

  const ref = params.ref;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/booking?id=${ref}`,
    {
      method: "GET",
      headers: {
        "Accept-Content": "text/json",
      },
    },
  );

  //const booking = await response.json();
  // // console.log(booking);
  // return;

  if (response.status === 404) {
    return redirect("/404");
  }
  if (response.status === 200) {
    const data = await response.json();
    return <BookingSuccessPage booking={data.booking} />;
  }
  return "Serve error";
};

export default ConfirmationPage;
