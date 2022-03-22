import React, { useEffect, useState } from "react";
import Artwork from '../Artwork';
import _ from 'lodash';
import './index.css'

const NUMBER_OF_OPTIONS = 3;

function QuestionPanel({objectIds}) {
    let [options, setOptions] = useState();
    let [answer, setAnswer] = useState();
    let [state, setState] = useState();

    function updateState(option) {
        setState(state => {
            if(answer.objectID === option.objectID) {
                return "correct";
            }
            else if(state !== "correct") {
                return "answered";
            }
        });
    }

    function reset() {
        if(!objectIds) return;
        setOptions(null)
        setAnswer(null)
        setState("unanswered")

        let potentialOptions = _.sampleSize(objectIds, NUMBER_OF_OPTIONS);
        let potentialOptionObjects = potentialOptions.map(async (option) => {
            let request = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${option}`);
            
            if(!request.ok) {
                console.error(request);
                return null;
            }

            return await request.json();
        });

        (async () => {
            let finalOptions = await Promise.all(potentialOptionObjects)
            let answer = _.sample(_.filter(finalOptions, (x) => x.primaryImage));
            if(!answer) {
                return this();
            }
            setOptions(finalOptions)
            setAnswer(answer)
        })();
    }

    useEffect(reset, [objectIds]);

    let stateButton;

    switch(state) {
        case "answered":
            stateButton = <button disabled className="Incorrect">Incorrect</button>;
            break;
        case "correct":
            stateButton = <button className="Correct" onClick={reset}>Correct</button>;
            break;
        default:
            stateButton = null;
            break;
    }

    return <div>
        <h1>Guess the Title!</h1>
        <Artwork artObject={answer} />
        <div>
            {
                options?.map((option) => 
                    <button
                        key={option.objectID}
                        onClick={() => {
                            updateState(option);
                        }}
                    >
                        {option.title}
                    </button>
                )
            }
        </div>
        <hr />
        {stateButton}
    </div>
}

export default QuestionPanel;