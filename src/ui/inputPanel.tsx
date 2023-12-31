import { useEffect, useRef } from "react";

export default function InputPanel() {
    const sidePanel = useRef(null);
    
    const handleMouseEnter = (event) => {
        event.stopPropagation();
    };
    return (
        <section ref={sidePanel} className="input-panel" onMouseEnter={handleMouseEnter}>
            <span className="ml-4 text-base font-semibold whitespace-nowrap cursor-default">How's it going?</span>
            <input className="ml-4 mr-1 w-[75%] h-10 px-3 rounded-sm border-2 border-gray-100 focus:outline-none focus:border-blue-500" type="text" placeholder="Enter your comment here..." />
            <button className="w-[15%] h-10 mr-1 px-3 py-2 rounded-sm bg-blue-500 text-white font-semibold focus:outline-none">Add</button>
        </section>
    )
}