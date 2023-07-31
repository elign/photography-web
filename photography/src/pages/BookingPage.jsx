import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

export default function BookingPage() {

    const {id} = useParams();
    const [booking, setBooking] = useState('');
    useEffect(() => {
        if(id) {
            return ''
        }
    }, [id]);
    return (
        <>
        Booking
        </>
    )
}