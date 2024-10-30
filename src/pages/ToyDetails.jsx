import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toyService } from "../services/toy.service";
import { showErrorMsg } from "../services/event-bus.service";

export function ToyDetails() {

    const { toyId } = useParams()
    const [toy, setToy] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        loadToy()
    }, [])

    function loadToy() {
        toyService.get(toyId)
            .then(setToy)
            .catch(err => {
                console.log('Toy details-> failed to load toy', err)
                showErrorMsg('Toy not found')
                navigate('/')
            })
    }

    if (!toy) return <div>Loading...</div>

    return (
        <section className="toy-details">
            <h3>{toy.name} {toy.price}</h3>
            <h6>Labels: {toy.labels.join(', ')}</h6>
            <h6>Created: {toy.createdAt}</h6>
            <div className={`stock ${toy.inStock ? "in" : "out-of"}`}>{toy.inStock ? 'In Stock!' : 'Out Of Stock'}</div>
            <Link to={`/toy/edit/${toy._id}`}>Edit</Link>
            <Link to='/toy'>Back</Link>
        </section>
    )
}
