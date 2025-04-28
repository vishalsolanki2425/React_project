import { useState } from "react"
import "../Component/Reviewform.css"


const Reviewform = () => {
    const [name, setName] = useState("")
    const [review, setReview] = useState("")
    const [rating, setRating] = useState("0")
    const [errors, setErrors] = useState({})
    const [submittedReviews, setSubmittedReviews] = useState([])

    const validate = () => {
        const err = {}

        if (!name.trim()) err.name = "Name is required"
        if (!review.trim()) err.review = "Review is required"
        if (rating === "0") err.rating = "Please select a rating"

        setErrors(err)
        return Object.keys(err).length === 0
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (validate()) {
            setSubmittedReviews([...submittedReviews, {
                name,
                review,
                rating
            }])

            alert(`Thank you for your review ${name}`)
            setName("")
            setReview("")
            setRating("0")
            setErrors({})
        }
    }

    return (
        <div className="reviewform">
            <h1>Add Review</h1>
            <form onSubmit={handleSubmit}>
                <label>Name</label>
                {errors.name && <span className="error">{errors.name}</span>}
                <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} />

                <label>Review</label>
                {errors.review && <span className="error">{errors.review}</span>}
                <textarea id="review" name="review" value={review} onChange={(e) => setReview(e.target.value)} />

                <label>Rating</label>
                {errors.rating && <span className="error">{errors.rating}</span>}
                <select id="rating" name="rating" value={rating} onChange={(e) => setRating(e.target.value)}>
                    <option value="0">Select a rating</option>
                    <option value="5 (Excellent)">5 - Excellent</option>
                    <option value="4 (Very Good)">4 - Very Good</option>
                    <option value="3 (Good)">3 - Good</option>
                    <option value="2 (Fair)">2 - Fair</option>
                    <option value="1 (Poor)">1 - Poor</option>
                </select>

                <button type="submit">Submit</button>
            </form>

            <div className="reviews-table">
                <h2>Submitted Reviews</h2>
                {submittedReviews.length === 0 ? (<p>No Reviews Found</p>) : (
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Rating</th>
                                <th>Review</th>
                            </tr>
                        </thead>
                        <tbody>
                            {submittedReviews.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.name}</td>
                                    <td>{item.rating}</td>
                                    <td>{item.review}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    )
}

export default Reviewform