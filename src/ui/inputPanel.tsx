import { useContext, useRef } from "react";
import { vaderSentiment } from "../services/ai/vaderSentiment";
import { createRecord } from "../firestore/databaseTransact";
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

    const handleSubmit = (event) => {
        event.preventDefault();
        const input = event.target[0].value;
        if(input === "") {
            return;
        }
        const compound = vaderSentiment(input).compound;
        const recordSentiment: RecordSentiment = {
            comment: input,
            compound
        }
        createRecord(uid, recordSentiment).then(() => {
            setCanUpdateMapping(true);
        });
    };

    return (
        <form ref={sidePanel} className="input-panel" onSubmit={handleSubmit}>
            <span className="ml-4 text-base font-semibold whitespace-nowrap cursor-default">How's it going?</span>
            <input className="ml-4 mr-1 w-[75%] h-10 px-3 rounded-sm border-2 border-gray-100 focus:outline-none focus:border-blue-500" type="text" placeholder="Enter your comment here..." />
            <button className="w-[15%] h-10 mr-1 px-3 py-2 rounded-sm bg-blue-400 text-white font-semibold focus:outline-none" type="submit">Add</button>
        </form>
    )
}