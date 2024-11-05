
export function ReviewPreview({ review }) {

    return (
        <section className="review-preview">
            <p>{review.content}</p>
            <p>by: {review.user.fullname}</p>
        </section>
    )
}