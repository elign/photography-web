import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

export default function SinglePackage () {
    const {id} = useParams();
    useEffect(() => {
        axios.get(`/packages/${id}`).then ((response) => {
            const {data} = response;
            
        })
    }, [])
    return (
        <>
            {id}
        </>
    )
}