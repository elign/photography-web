import axios from "axios";
import { useEffect, useState } from "react";

export default function IndexPage() {
  const [packages, setPackages] = useState([]);
  useEffect(() => {
    axios.get("/packages").then((response) => {
      setPackages(response.data);
    });
  }, []);

  return (
      <div className="grid grid-cols-2 gap-8 mt-10 md:grid-cols-3 lg:grid-cols-4">
        {
          packages.length > 0 && packages.map(pack => (
            <div key={pack._id}>
              <div className="rounded-2xl flex">
                {
                  pack.photos?.[0] && (
                    <img className="rounded-2xl aspect-square object-cover" src={`http://localhost:4000/${pack.photos[0]}`} />
                  )
                }
              </div>
              <h2 className="text-md leading-4">{pack.title}</h2>
              <h3 className="text-sm font-bold">{pack.address}</h3>
            </div>
          ))
        }

      </div>
  );
}
