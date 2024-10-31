import { useNavigate } from "react-router-dom"

export function ToyPreview({ toy }) {

    const navigate= useNavigate()

function onGoToDetails(){
    navigate(`/toy/${toy._id}`)
}
    return (
        <section className="toy-preview" onClick={()=>onGoToDetails()}>
            <p>{toy.name}</p>
            <p>price: {toy.price}₪</p>
            <p className={`stock ${toy.inStock ? "in" : "out-of"}`}>{toy.inStock ? 'In Stock!' : 'Out Of Stock'}</p>
        </section>
    )
}