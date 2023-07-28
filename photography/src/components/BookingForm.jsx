import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function BookingForm({ price, id }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const navigate = useNavigate();
  const bookThisPackage = () => {
    const data = { packageId: id, name, email, number, price };
    axios
      .post("/bookings", data)
      .then((response) => {
        navigate(`/account/bookings/${response.data._id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <div className="bg-white mt-4 shadow shadow-gray-600 rounded-lg px-4 py-8">
        <div className="text-center">
          Price: <b className="text-primary">${price}</b>
        </div>
        <div className="mt-2 rounded-lg">
          <div className=" p-2">
            <label className="text-sm">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="outline-none"
              placeholder="John Doe"
              type="text"
            />
          </div>
          <div className=" p-2 ">
            <label className="text-sm">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="outline-none"
              placeholder="abc@gmail.com"
              type="text"
            />
          </div>
          <div className=" p-2 ">
            <label className="text-sm">Contact Number</label>
            <input
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              className="outline-none"
              placeholder="+91-xxx-xxx-xxxx"
              type="tel"
            />
          </div>
        </div>
        <button onClick={bookThisPackage} className="primary">
          Book This Package
        </button>
      </div>
    </div>
  );
}
