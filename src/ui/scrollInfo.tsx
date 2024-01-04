import { useContext, useEffect, useState } from "react";
import { ScrollContext, UserIsScrollingContext } from "../providers/scrollContext";

export default function ScrollInfo() {

    const { isReportsListScrollbar } = useContext(ScrollContext);
    const { userIsScrolling } = useContext(UserIsScrollingContext);

    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (event) => {
            let x = event.clientX;
            let y = event.clientY;
            setPosition({ x: x - 45, y: y - 60 });
        }
        document.addEventListener("mousemove", handleMouseMove);

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    let span = null;
    if (isReportsListScrollbar && !userIsScrolling) {
        span = <span>Click to scroll</span>;
    } else if (userIsScrolling) {
        span = <span>Click to resume</span>;
    }
    return (
        <div className="scroll-info" style={{ top: position.y, left: position.x }}>
            {span}
        </div>
    );
}