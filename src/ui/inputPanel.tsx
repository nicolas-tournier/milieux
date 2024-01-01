import { useRef, useState } from "react";
import { vaderSentiment } from "../services/ai/vaderSentiment";

export default function InputPanel() {

    const sidePanel = useRef(null);
    const [inputValue, setInputValue] = useState('');

    const handleMouseEnter = (event) => {
        event.stopPropagation();
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // use sentiment analysis to determine the color of the marker
        const input = event.target[0].value;
        console.log("input", input);
        const compound = vaderSentiment(input).compound;
    };

    return (
        <form ref={sidePanel} className="input-panel" onSubmit={handleSubmit} onMouseEnter={handleMouseEnter}>
            <span className="ml-4 text-base font-semibold whitespace-nowrap cursor-default">How's it going?</span>
            <input className="ml-4 mr-1 w-[75%] h-10 px-3 rounded-sm border-2 border-gray-100 focus:outline-none focus:border-blue-500" type="text" placeholder="Enter your comment here..." />
            <button className="w-[15%] h-10 mr-1 px-3 py-2 rounded-sm bg-blue-500 text-white font-semibold focus:outline-none" type="submit">Add</button>
        </form>
    )
}