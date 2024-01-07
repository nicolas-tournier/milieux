import { useContext, useRef, useState } from "react";
import { vaderSentiment } from "../services/ai/vaderSentiment";
import { createRecord, hasReachedDailyCommentLimit } from "../firestore/databaseTransact";
import { UidContext } from "../providers/uidContext";
import { MappingUpdateContext } from "../providers/mappingUpdateContext";

export interface RecordSentiment {
    comment: string;
    compound: number;
}

export default function InputPanel() {

    const sidePanel = useRef(null);
    const { uid } = useContext(UidContext);
    const { setCanUpdateMapping } = useContext(MappingUpdateContext);
    const [input, setInput] = useState('');
    const [limitReached, setLimitReached] = useState(false);
    const [placeholderText, setPlaceholderText] = useState("Describe your current milieu...");

    const handleSubmit = (event) => {
        event.preventDefault();
        const input = event.target[0].value;
        if (input === "") {
            return;
        }
        const compound = vaderSentiment(input).compound;
        const recordSentiment: RecordSentiment = {
            comment: input,
            compound
        }

        hasReachedDailyCommentLimit(uid).then((hasReachedLimit) => {
            if (hasReachedLimit) {
                alert("You have reached your daily comment limit. \nPlease visit again soon.");
                setPlaceholderText("You have reached your daily comment limit. Please visit again soon.");
                setLimitReached(true);
            } else {
                createRecord(uid, recordSentiment).then(() => {
                    setCanUpdateMapping(true);
                });
            }
        });
        setInput('');
    };

    return (
        <form ref={sidePanel} className="input-panel" onSubmit={handleSubmit}>
            <span className="ml-4 text-base font-semibold whitespace-nowrap cursor-default">How's it going?</span>
            <input className="ml-4 mr-1 w-[75%] h-10 px-3 rounded-sm border-2 border-gray-100 focus:outline-none focus:border-blue-500" type="text" placeholder={placeholderText} value={input} onChange={e => setInput(e.target.value)} disabled={limitReached} />
            <button className="w-[15%] h-10 mr-1 px-3 py-2 rounded-sm bg-blue-400 text-white font-semibold focus:outline-none" type="submit">Add</button>
        </form>
    )
}