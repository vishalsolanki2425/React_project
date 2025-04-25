import "../Component/Reviewform.css"


const Reviewform = () => {

    return (
        <div className="reviewform">
            <h1>Add Review</h1>
            <form>
                <label>Name </label>
                <input type="text" id="name" name="name" />

                <label>Review </label>
                <textarea id="review" name="review" />
                
                <label>Rating </label>
                <select id="rating" name="rating">
                    <option></option>
                    <option>5</option>
                    <option>4</option>
                    <option>3</option>
                    <option>2</option>
                    <option>1</option>
                </select>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Reviewform