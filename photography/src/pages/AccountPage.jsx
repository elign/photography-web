import { useContext } from "react"
import { UserContext } from "../UserContext"
import { Navigate, Link, useParams } from "react-router-dom";

export default function AccountPage () {
    const {ready, user} = useContext(UserContext);
    let {subpage} = useParams();
    if(subpage === undefined) {
        subpage = 'profile';
    }
    // if(!ready) {
    //     return "Loading!..."
    // }

    if(ready && !user) {
        return <Navigate to = {'/login'}/>
    }

    function linkClasses (type) {
        let css = "py-2 px-6"
        if(subpage === type) {
            css += " bg-primary text-white rounded-full";
        }
        return css
    }

    return (
        <div>
            <nav className="w-full flex mt-8 justify-center gap-6">
                <Link className={linkClasses('profile')} to={'/account'}>My Profile</Link>
                <Link className={linkClasses('bookings')} to={'/account/bookings'}>My Bookings</Link>
                <Link className={linkClasses('places')} to={'/account/places'}>My Accommodations</Link>
            </nav>
        </div>
    )
}