
export function ReviewPreview({ review, isToyDisplay= false }) {
    return (
        <section className="review-preview">
            <h3>{review.content}</h3>
            {!isToyDisplay && <p>Toy: {review.toy.name}</p>}
            <p>by: {review.user.fullname}</p>
        </section>
    )
}