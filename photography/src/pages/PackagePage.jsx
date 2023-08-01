import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BookingForm from "../components/BookingForm";

export default function PackagePage() {
  const { id } = useParams();
  const [pack, setPack] = useState(null);
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  useEffect(() => {
    if (!id) return;

    axios.get(`/packages/${id}`).then((res) => {
      console.log(res.data);
      setPack(res.data);
    });
  }, [id]);

  if (showAllPhotos) {
    return (
      <div className="absolute inset-0 min-w-full min-h-full">
        <div className="p-8 grid bg-gray-800 gap-4">
          <div>
            <button
              className="fixed mt-4 p-1 right-8 bg-primary text-white"
              onClick={() => setShowAllPhotos(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          {pack?.photos?.length > 0 &&
            pack.photos.map((photo) => {
              return (
                <div className="m-auto" key={photo}>
                  <img src={`http://localhost:4000/${photo}`} />
                </div>
              );
            })}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8 lg:w-3/4 m-auto">
      {pack && (
        <div className="-mx-4 px-8 py-6 bg-gray-100">
          <h1 className="text-2xl md:text-3xl font-bold ">{pack.title}</h1>
          <p className="block font-basic text-sm pb-4">{pack.address}</p>
          <div className="relative">
            <div
              onClick={() => setShowAllPhotos(true)}
              className="grid gap-2 grid-cols-[2fr_1fr]"
            >
              <div>
                {pack.photos?.[0] && (
                  <img
                    className="h-full object-cover rounded-md"
                    src={`http://localhost:4000/${pack.photos[0]}`}
                  />
                )}
              </div>
              <div className="grid gap-2">
                {pack.photos?.[1] && (
                  <img
                    className="aspect-square object-cover rounded-md"
                    src={`http://localhost:4000/${pack.photos[1]}`}
                  />
                )}
                {pack.photos?.[2] && (
                  <img
                    className="aspect-square object-cover rounded-md"
                    src={`http://localhost:4000/${pack.photos[2]}`}
                  />
                )}
              </div>
            </div>
            <button
              onClick={() => setShowAllPhotos(true)}
              className="flex gap-3 absolute bottom-2 py-2 px-4 bg-white rounded-2xl shadow shadow-gray-700 shadow-md right-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
              More Photos
            </button>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-[4fr_3fr]">
            <div style={{ display: "flex", flexDirection: "column" }}>
              <h2 className="my-4 font-semibold text-2xl">Description</h2>
              <p className="text-justify pb-4">{pack.description}</p>
              <b>Check-in: {pack.checkIn}</b>
              <br />
              <b>Check-out: {pack.checkOut}</b>
              <br />
            </div>
            <div style={{ flex: "1" }}>
              <BookingForm price={pack.price} id={id} />
            </div>
          </div>
          <div className="mt-6 border p-4 rounded-md">
            <h3 className="text-xl font-bold leading-10">Extra Info</h3>
            <p className="font-light">{pack.extraInfo}</p>
          </div>
        </div>
      )}
    </div>
  );
}
