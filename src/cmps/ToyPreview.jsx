
export function ToyPreview({ toy }) {

    return (
        <section>
            <p>{toy.name}</p>
            <p>price: {toy.price}₪</p>
            <p className={`stock ${toy.inStock ? "in" : "out-of"}`}>{toy.inStock ? 'In Stock!' : 'Out Of Stock'}</p>
        </section>
    )
}