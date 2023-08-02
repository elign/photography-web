import { useState } from "react";
import axios from "axios";
// import { useNavigate } from "react-router-dom";
import { SpinningCircles } from "react-loading-icons";
export default function BookingForm({ price, id }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [date, setDate] = useState("");
  const [numOfDays, setNumOfDays] = useState(1);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  // const navigate = useNavigate();
  const bookThisPackage = () => {
    const data = { packageId: id, name, email, number, price, numOfDays, date };
    if (!name || !email || !number || !date || !numOfDays) {
      alert("Please fill in all the fields before submitting the form.");
      return;
    }
    setLoading(true);
    axios
      .post("/bookings", data)
      .then((response) => {
        // navigate(`/account/bookings/${response.data._id}`);
        setMessage(response.data);
        console.log(response);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setMessage("Some error occurred, please try reloading!");
        setLoading(false);
      });
  };
  return message ? (
    <div className="bg-primary text-white p-4 rounded-lg h-15 mt-16">
      {message}
    </div>
  ) : loading ? (
    <SpinningCircles />
  ) : (
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
          <label className="text-sm mx-2">Date: </label>
          <div className=" p-2 border rounded-lg mx-2 my-1">
            <input
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="outline-none"
              type="date"
            />
          </div>
          <div className=" p-2 ">
            <label className="text-sm">Number of Days</label>
            <input
              value={numOfDays}
              onChange={(e) => setNumOfDays(e.target.value)}
              className="outline-none"
              type="number"
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
