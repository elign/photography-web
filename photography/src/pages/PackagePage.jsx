import { Link, useParams } from "react-router-dom";
import PackageFormPage from "./PackageFormPage";
import { useEffect, useState } from "react";
import axios from 'axios';

export default function PackagePage() {
  const { action } = useParams();
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get('/packages').then (({data}) => {
      setPlaces(places);
      console.log(data)
    })
  },[])

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
        <PackageFormPage />
      )}
    </div>
  );
}
