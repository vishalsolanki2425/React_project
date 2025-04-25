import "./Formvalidation.css"

const Review = () => {
    return (
        <>
            <div>
                <h2>Add Review</h2>
                <form>
                    <div>
                        <label for="fname">User Name:</label>
                        <input type="text" id="fname" name="username" placeholder="Enter your first name" required />
                    </div>
                    <div>
                        <label for="lname">Last Name:</label>
                        <input type="text" id="lname" name="lname" placeholder="Enter your last name" required />
                    </div>
                    <div>
                        <input type="submit" value="Submit" />
                    </div>
                </form>
            </div>

        </>
    )
}

export default Review