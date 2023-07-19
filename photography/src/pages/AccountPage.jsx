import { useContext, useEffect } from "react";
import { UserContext } from "../UserContext";
import { useNavigate, Link, useParams } from "react-router-dom";
import axios from "axios";
export default function AccountPage() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = "profile";
  }

//   if(!ready) {
//       return "Loading!..."
//   }
  useEffect(() => {
    if (user == null) {
        navigate('/login');
      }
      console.log(user);
  }, [user]);
  

  function linkClasses(type) {
    let css = "py-2 px-6";
    if (subpage === type) {
      css += " bg-primary text-white rounded-full";
    }
    return css;
  }

  async function logout() {
    await axios.post("/logout");
    navigate('/login');
  }

  return (
    <div>
      <nav className="w-full flex mt-8 justify-center gap-6">
        <Link className={linkClasses("profile")} to={"/account"}>
          My Profile
        </Link>
        <Link className={linkClasses("bookings")} to={"/account/bookings"}>
          My Bookings
        </Link>
        <Link className={linkClasses("places")} to={"/account/places"}>
          My Accommodations
        </Link>
      </nav>
      {subpage === "profile" && (
        <div className="text-center max-w-lg mx-auto">
          Logged in as {user?.name} ({user?.email})<br />
          <button onClick={logout} className="primary max-w-sm mt-2">
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
