import { useContext, useEffect, useState } from "react";
import { ScrollContext, UserIsScrollingContext } from "../providers/scrollContext";

export default function ScrollInfo() {

    const { isReportsListScrollbar } = useContext(ScrollContext);
    const { userIsScrolling, setUserIsScrolling } = useContext(UserIsScrollingContext);

    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (event) => {
            let x = event.clientX;
            let y = event.clientY;
            let adjust_x = userIsScrolling ? 65 : 43;
            let adjust_y = userIsScrolling ? 105 : 80;

            setPosition({ x: x - adjust_x, y: y - adjust_y });
        }
        document.addEventListener("mousemove", handleMouseMove);

        if (!isReportsListScrollbar) {
            setUserIsScrolling(false);
        }

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
        };
    }, [userIsScrolling]);

    let span = null;
    if (isReportsListScrollbar && !userIsScrolling) {
        span = <span>Click to scroll</span>;
    } else if (userIsScrolling) {
        span = <div><span className={`wheel-to-scroll ${!isReportsListScrollbar ? 'hide' : ''}`}>Wheel to scroll</span><span>Click to exit scrolling</span></div>;
    }
    return (
        <div className="scroll-info" style={{ top: position.y, left: position.x }}>
            {span}
        </div>
    );
}