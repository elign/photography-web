import axios from "axios";
import { useState } from "react";
export default function PhotosUploader({ addedPhotos, setAddedPhotos }) {

  const [photoLink, setPhotoLink] = useState("");
  const addPhotoByLink = async (e) => {
    e.preventDefault();
    const { data: filename } = await axios.post("/upload-by-link", {
      link: photoLink,
    });
    setAddedPhotos((prev) => {
      return [...prev, filename];
    });
    setPhotoLink("");
  };

  const uploadPhoto = (event) => {
    event.preventDefault();
    const files = event.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }
    axios
      .post("/upload", data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        const { data } = response;
        console.log(response);
        setAddedPhotos((prev) => {
          return [...prev, ...data];
        });
      });
  };

  return (
    <>
      <h4>Photos</h4>
      <div className="flex gap-2">
        <input
          type="text"
          value={photoLink}
          onChange={(e) => setPhotoLink(e.target.value)}
          placeholder="Add using a link"
        />
        <button onClick={addPhotoByLink} className="px-4 rounded-2xl w-40">
          Add Photo
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3 mt-2"></div>

      <div className="mt-4 grid gap-2 grid-cols-3 md:grid-cols-4 ">
        {addedPhotos.length > 0 &&
          addedPhotos.map((link) => (
            <img
              className="rounded-xl onChange={() => onCheckBoxSelect('wifi')}"
              key={link}
              src={"http://localhost:4000/" + link}
            />
          ))}
        <label className="flex gap-2 h-32 items-center justify-center border bg-transparent rounded-2xl text-gray-600 text-xl cursor-pointer">
          <input
            type="file"
            multiple
            className="hidden"
            onChange={uploadPhoto}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
            />
          </svg>
          Upload
        </label>
      </div>
    </>
  );
}
