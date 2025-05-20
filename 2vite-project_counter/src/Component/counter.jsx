import { useState } from "react"
import '../Component/counter.css'


const Counter = () => {
    const [count, setcounter] = useState(0)

    const Increment = () => {
        setcounter(count + 1);
    }
    const Decrement = () => {
        if (count > 0) {
            setcounter(count - 1);
        }
        else {
            alert("Please Check Your Count Number.....")
        }
    }

    const Reset = () => {
        setcounter(0);
    }

    return (
        <div>
            <h1>Counter App</h1>
            <div className="counter">
                <h2>{count}</h2>
                <button onClick={Increment}> + </button>
                <button onClick={Reset}> ↺ </button>
                <button onClick={Decrement}> - </button>
            </div>
        </div>
    )
}

export default Counter