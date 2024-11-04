import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { Link } from "react-router-dom";
import { ToyPreview } from "./ToyPreview";

export function ToyList({ toys, onRemoveToy }) {
    return (
        <ul className="toy-list">
            {toys.map((toy) => (
                <li key={toy._id} className="toy-card">
                    <ToyPreview toy={toy} />
                    <div className="toy-actions">
                        <button className="btn btn-sm" onClick={() => onRemoveToy(toy._id)}><DeleteIcon/></button>
                        <Link className="btn btn-sm" to={`/toy/edit/${toy._id}`}><EditIcon/></Link>
                    </div>
                </li>
            ))}
        </ul>
    )
}