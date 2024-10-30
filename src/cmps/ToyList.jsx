import { Link } from "react-router-dom";

import { ToyPreview } from "./ToyPreview";

export function ToyList({ toys, onRemoveToy }) {
    return (
        <ul className="toy-list">
            {toys.map((toy) => (
                <li key={toy._id} className="toy-card">
                    <ToyPreview toy={toy} />
                    <div className="toy-actions">
                        <button onClick={() => onRemoveToy(toy._id)}>Remove</button>
                        <Link to={`/toy/${toy._id}`}>Details</Link>
                        <Link to={`/toy/edit/${toy._id}`}>Edit</Link>
                    </div>
                </li>
            ))}
        </ul>
    )
}