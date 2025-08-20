import { useEffect, useState } from "react";
import LanguageBlockedWordListResolver from "../util/LanguageBlockedListResolver"
import BlockedWordFinder from "../util/BlockedWordFinder"
import AhocorasickWordFinder from "../util/BlockedWordFinder"

interface NameCheckerFormProps {
    blockedWordResolver: LanguageBlockedWordListResolver
}

function NameCheckerForm(props: NameCheckerFormProps) {
    const [blockedWordsList, setBlockedWordsList] = useState<string[]>([]);
    const [blockedWordFinder, setBlockedWordFinder] = useState<BlockedWordFinder>();

    const [inputNameValue, setInputNameValue] = useState("");
    const [nameInputDisabled, setNameInputDisabled] = useState(true);
    const [nameLabelValue, setNameLabelValue] = useState("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let newValue = e.target.value
        setInputNameValue(newValue)
        console.log(`Checking words for: ${newValue}`)
        const blockedWords = blockedWordFinder!.findBlockedWords(newValue.toLowerCase())

        console.log(`Blocked words response: ${Array.from(blockedWords) }`)
        if (blockedWords.size == 0) {
            console.log("No conflicting words!");
            setNameLabelValue("No conflicting words!")
        } else {
            const badCaseMessage = `Name blocked. Conflicting words: ${Array.from(blockedWords).join(",")}`
            // TODO: Generate censored name preview based on replacing blocked words in reverse order of length
            
            // TODO: Cutesy images and styles and whatnot
            setNameLabelValue(badCaseMessage)
        }
    };

    const blockedWordsFile: string = props.blockedWordResolver.getBlockedWordsFilename();

    // Load word list when blocked words file changes
    useEffect(() => {
        fetch(blockedWordsFile)
        .then((data) => data.text())
        .then(res => {
                console.log("res: " + res)
                let lines: string[] = res.split("\n").map(line => line.trim()).filter(Boolean)
                setBlockedWordsList(lines)
                console.log("blocked words: " + lines)
                setBlockedWordFinder(new AhocorasickWordFinder(lines))
                setNameInputDisabled(false)
            })
    }, [blockedWordsFile])

    return (
        <div>
        <input
            type="text"
            disabled={nameInputDisabled}
            value={inputNameValue}
            onChange={handleInputChange}
            placeholder="Test out your name:"
        />
        <p>{nameLabelValue ? nameLabelValue : undefined}</p>
        </div>
    );
}

export default NameCheckerForm;