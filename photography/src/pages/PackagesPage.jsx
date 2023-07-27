import { Link, useParams } from "react-router-dom";
import PackageFormPage from "./PackageFormPage";
import { useEffect, useState } from "react";
import axios from "axios";

export default function PackagePage() {
  const { action } = useParams();
  const [package_, setPackage] = useState([]);

  useEffect(() => {
    axios.get("/owner-packages").then(({ data }) => {
      console.log(data);
      setPackage(data);
    });
  }, []);

  return (
    <div>
      <div className=" mt-10">
        {package_.length > 0 &&
          package_.map((pack) => {
            return (
              <Link key={pack._id} to={`/account/packages/${pack._id}`}>
                <div className="border bg-gray-100 rounded-xl p-4 mt-3 cursor-pointer">
                  <div className="flex gap-3">
                    {pack.photos.length > 0 && (
                      <img
                        className="w-48 h-72 rounded-md object-cover"
                        src={`http://localhost:4000/${pack.photos[0]}`}
                      />
                    )}
                    <div className="flex flex-col">
                      <div className="text-xl font-normal">{pack.title}</div>
                      <p className="font-thin">{pack.description}</p>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
      </div>

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
      {action === "new" && <PackageFormPage />}
    </div>
  );
}
