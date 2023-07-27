import { useParams } from "react-router-dom"

export default function PackagePage() {

    const {id } = useParams();
    return (
        <div>
            {id}
        </div>
    )
}