import { useContext, useEffect, useRef, useState } from "react";
import { vaderSentiment } from "../services/ai/vaderSentiment";
import { createRecord, hasReachedDailyCommentLimit } from "../firestore/databaseTransact";
import { UidContext } from "../providers/uidContext";
import { MappingUpdateContext } from "../providers/mappingUpdateContext";
import { Check } from '@mui/icons-material';
import { CircularProgress } from '@mui/material';

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
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showTick, setShowTick] = useState(false);

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

        setIsSubmitting(true);

        createRecord(uid, recordSentiment).then(() => {
            setIsSubmitting(true);

            // this doesn't need a formal response, just a visual cue
            setTimeout(() => {
                setIsSubmitting(false);
                setShowTick(true);
                setCanUpdateMapping(true);

                setTimeout(() => {
                    setShowTick(false);
                }, 1000);
            }, 1000);

        });

        setInput('');
    };

    useEffect(() => {

        if (input !== "") return;

        hasReachedDailyCommentLimit(uid).then((hasReachedLimit) => {
            if (hasReachedLimit) {
                setPlaceholderText("You have reached your daily comment limit. Please visit again soon.");
                setLimitReached(true);
            }
        });
    }, [input, uid]);

    return (
        <form ref={sidePanel} className="input-panel" onSubmit={handleSubmit}>
            <span className="hows-it-going ml-4 text-base font-semibold whitespace-nowrap cursor-default">How's it going?</span>
            <input
                className="ml-4 mr-1 w-[85%] h-10 px-3 rounded-sm border-2 border-gray-100 focus:outline-none focus:border-blue-500" type="text"
                maxLength={200}
                placeholder={placeholderText} value={input}
                onChange={e => setInput(e.target.value)}
                disabled={limitReached || isSubmitting} />
            <button className="w-[15%] h-10 mr-1 px-3 py-2 rounded-sm bg-blue-400 text-white font-semibold focus:outline-none transition duration-500" type="submit">
                {showTick ? <Check /> : isSubmitting ? <CircularProgress color="inherit" size={24} /> : 'Add'}
            </button>
        </form>
    )
}