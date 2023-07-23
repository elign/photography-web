import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import PhotosUploader from "../components/PhotosUploader";
import Perks from "../components/Perks";
export default function PackagePage() {
  const { action } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);

  return (
    <div>
      {action != "new" && (
        <div className="flex justify-center mt-20">
          <Link
            to={"/account/places/new"}
            className="inline-flex gap-2 bg-primary text-white py-2 px-4 rounded-full"
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
                d="M12 6v12m6-6H6"
              />
            </svg>
            Add new places
          </Link>
        </div>
      )}

      {action === "new" && (
        <div className="flex justify-center">
          <form className="mt-10 xl:w-4/5">
            <h4>Title</h4>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="title, e.g. Wedding Photography"
            />
            <h4>Address</h4>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="enter your address here"
            />
            <PhotosUploader addedPhotos={addedPhotos} setAddedPhotos={setAddedPhotos}/>
            <h4>Add Description</h4>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Perks perks={perks} setPerks={setPerks}/>
            <h4>Extra Info</h4>
            <textarea
              value={extraInfo}
              onChange={(e) => setExtraInfo(e.target.value)}
            />
            <h4>Check-in & out Time</h4>
            <div className="grid gap-2 sm:grid-cols-3">
              <div>
                <span className="mt-2 -mb-2 text-sm">Check-in Time</span>
                <input
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  type="text"
                />
              </div>
              <div>
                <span className="mt-2 -mb-2 text-sm">Check-out Time</span>
                <input
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  type="text"
                />
              </div>
              <div>
                <span className="mt-2 -mb-2 text-sm">Max Guests</span>
                <input
                  value={maxGuests}
                  onChange={(e) => setMaxGuests(e.target.value)}
                  type="number"
                />
              </div>
            </div>
            <button className="primary my-4">Save</button>
          </form>
        </div>
      )}
    </div>
  );
}
