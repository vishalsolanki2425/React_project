import { useState } from "react"
import "../Component/Reviewform.css"


const Reviewform = () => {
    const [name, setName] = useState("")
    const [review, setReview] = useState("")
    const [rating, setRating] = useState("0")
    const [errors, setErrors] = useState({})

    const erro = () => {
        const err = {}

        if (!name.trim()) err.name = "Name is required"
        if (!review.trim()) err.review = "Review is required"
        if (rating === "0") err.rating = "Please select a rating"

        setErrors(err)
        return Object.keys(err).length === 0
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (erro()) {
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
                <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)}  placeholder={errors.name || "Enter your name"} />

                <label>Review</label>
                <textarea id="review" name="review" value={review} onChange={(e) => setReview(e.target.value)}  placeholder={errors.review || "Enter your review"} />

                <label>Rating</label>
                <select id="rating" name="rating" value={rating} onChange={(e) => setRating(e.target.value)}  placeholder={errors.rating || "Select a rating"} >
                    <option value="0">{errors.rating || "Select a rating"}</option>
                    <option value="5">5 - Excellent</option>
                    <option value="4">4 - Very Good</option>
                    <option value="3">3 - Good</option>
                    <option value="2">2 - Fair</option>
                    <option value="1">1 - Poor</option>
                </select>

                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Reviewform