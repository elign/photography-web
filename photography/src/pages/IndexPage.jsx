import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function IndexPage() {
  const [packages, setPackages] = useState([]);
  useEffect(() => {
    axios.get("/packages").then((response) => {
      setPackages(response.data);
    });
  }, []);

  return (
    <div className="grid grid-cols-1 gap-y-8 gap-x-6 mt-10 md:grid-cols-3 lg:grid-cols-4">
      {packages.length > 0 &&
        packages.map((pack) => (
          <Link to={`/package/${pack._id}`} key={pack._id}>
            <div className="rounded-2xl flex">
              {pack.photos?.[0] && (
                <img
                  className="rounded-xl aspect-square object-cover duration-300 hover:rounded-3xl hover:shadow-xl"
                  src={`http://localhost:4000/${pack.photos[0]}`}
                />
              )}
            </div>
            <div className="pl-3 pt-3">
              <h2 className="text-2xl md:text-xl 2xl:text-3xl">{pack.title}</h2>
              <h3 className="text-xs text-gray-600 lg:text-xl">{pack.address}</h3>
              <span className="text-sm font-bold text-primary lg:text-xl">
                $ {pack.price}{" "}
              </span>
            </div>
          </Link>
        ))}
    </div>
  );
}
