import axios from "axios";
import { useEffect, useState } from "react";

export default function BookingsPage() {
  const [bookings, setBookings] = useState();
  useEffect(() => {
    axios.get("/bookings").then((response) => {
      console.log(response.data);
      setBookings(response.data);
    });
  }, []);
  return (
    <div>
      {bookings?.length > 0 &&
        bookings.map((booking) => (
          <div className="flex my-4 gap-4 bg-gray-100 rounded-2xl overflow-hidden px-5 py-2" key={booking.id}>
            <div>{booking.name}</div>
            <div>{booking.email}</div>
            <div>{booking.number}</div>
            <div>{booking.price}</div>

            </div>
        ))}
    </div>
  );
}
