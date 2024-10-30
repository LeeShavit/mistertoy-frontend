import { Link } from "react-router-dom";

import { ToyPreview } from "./ToyPreview";

export function ToyList({ toys, onRemoveToy }) {
    return (
        <ul>
            {toys.map(toy =>
                <li key={toy._id}>
                    <ToyPreview toy={toy} />
                    <button onClick={() => onRemoveToy(toy._id)}>Remove</button>
                    <Link to={`/toy/${toy._id}`}>Details</Link>
                    <Link to={`/toy/edit/${toy._id}`}>Edit</Link>
                </li>
            )}
        </ul>
    )
}