import { useNavigate } from "react-router-dom"

export function ToyPreview({ toy }) {
    const baseUrl= 'http://res.cloudinary.com/dsymwlagn/image/upload/v1730835218/iyan9c9r6uk0ekx7ekmz.webp'
    const navigate= useNavigate()

function onGoToDetails(){
    navigate(`/toy/${toy._id}`)
}
    return (
        <section className="toy-preview" onClick={()=>onGoToDetails()}>
            <img src={toy.url || baseUrl}/>
            <p>{toy.name}</p>
            <p>price: {toy.price}₪</p>
            <p className={`stock ${toy.inStock ? "in" : "out-of"}`}>{toy.inStock ? 'In Stock!' : 'Out Of Stock'}</p>
        </section>
    )
}