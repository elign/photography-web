import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import PhotosUploader from "../components/PhotosUploader";
import Perks from "../components/Perks";

export default function PackageFormPage() {
  const navigate = useNavigate();
  const {id} = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [photos, setPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);

  useEffect(() => {
    axios.get(`/packages/${id}`).then (({data}) => {
      console.log(data.title);
    })
  }, [id])

  function addNewPlace(event) {
    event.preventDefault();
    axios
      .post("/places", {
        title,
        address,
        photos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
      })
      .then((message) => {
        console.log(message);
        navigate("/account/places");
      })
      .catch((err) => {
        console.log(
          "some error occurred while submiting the data to mongoDB",
          err
        );
      });
  }

  return (
    <>
      <div className="flex justify-center">
        <form onSubmit={addNewPlace} className="mt-10 xl:w-4/5">
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
          <PhotosUploader
            addedPhotos={photos}
            setAddedPhotos={setPhotos}
          />
          <h4>Add Description</h4>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Perks perks={perks} setPerks={setPerks} />
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
    </>
  );
}
