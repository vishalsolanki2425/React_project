import { useState } from "react";
import './Button.css';

const Button = () => {
    const [list] = useState([7, 8, 9, '+', 4, 5, 6, '-', 1, 2, 3, '*', '/', 0]);
    const [input, setInput] = useState('');

    const handleClick = (value) => {
        setInput(prev => prev + value);
    };

    const handleClear = () => {
        setInput('');
    };

    const handleEvaluate = () => {
        try {
            const result = eval(input);
            setInput(result.toString());
        } catch (error) {
            setInput('Erro');
        }
    };

    return (
        <div className="calculator">
            <input type="text" value={input} readOnly />
            <div className="button-grid">
                <button onClick={handleClear}>C</button>
                {list.map((item, index) => (
                    <button onClick={() => handleClick(item)} key={index}>
                        {item}
                    </button>
                ))}
                <button onClick={handleEvaluate}>=</button>
            </div>
        </div>
    );
};

export default Button;