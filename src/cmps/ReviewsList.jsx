import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { useParams } from "react-router-dom";
import { reviewService } from '../services/review.service.js'

import { ReviewPreview } from './ReviewPreview.jsx';
import { useState, useEffect } from 'react';

import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js';

export function ReviewsList({filterBy, user ,isToyDisplay= false}) {

    const { toyId } = useParams()
    const [reviews, setReviews] = useState(null)
    const [reviewToEdit, setReviewToEdit] = useState(reviewService.getEmptyReview())

    useEffect(() => {
        loadReviews()
    }, [filterBy])

    async function loadReviews() {
        try {
            const reviews = await reviewService.query(filterBy)
            setReviews(reviews)
        } catch (err) {
            console.log('failed to load reviews', err)
            showErrorMsg('Reviews not found')
        }
    }

    function handleReviewChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
        setReviewToEdit((review) => ({ ...review, [field]: value }))
    }

    async function onAddReview(ev) {
        ev.preventDefault()
        const reviewToAdd = { ...reviewToEdit, toyId, userId: user._id }
        try {
            const review =await reviewService.save(reviewToAdd)
            setReviews(prevReviews=> [...prevReviews, review])
            showSuccessMsg('Review added successfully')
        } catch (err) {
            showErrorMsg('Failed to add review')
        }
    }

    async function onRemoveReview(reviewId) {
        try {
            await reviewService.remove(reviewId)
            setReviews(prevReviews=> prevReviews.filter(review=> review._id !== reviewId))
            showSuccessMsg('Review removed successfully')
        } catch (err) {
            showErrorMsg('Failed to remove review')
        }
    }

    if (!reviews) return <div>Loading..</div>

    return (
        <div className='reviews'>
            {user && isToyDisplay && 
            <form className="add-review" onSubmit={onAddReview}>
                <input
                    type="text"
                    name="txt"
                    value={reviewToEdit.txt}
                    placeholder="Enter msg"
                    onChange={handleReviewChange}
                    required
                    autoFocus
                />
                <button>Add Review</button>
            </form>}
            <ul className="review-list">
                {reviews.map((review) => (
                    <li key={review._id} className="review-card">
                        <ReviewPreview review={review} isToyDisplay={isToyDisplay}/>
                        {user && user.isAdmin && (
                            <div className="review-actions">
                                <button className="btn btn-sm" onClick={() => onRemoveReview(review._id)}><DeleteIcon /></button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    )
}