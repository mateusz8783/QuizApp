import React from "react";
import LoadingScreen from "./LoadingScreen";

function getQuestionsPromise() {
    console.log("Retrieving questions...");
    return new Promise((resolve, reject) => {
            var response = fetch(process.env.REACT_APP_BACKEND_ADDRESS + "/questions")
                .catch(err => err);
            response ? resolve(response) : reject("API call timed out");
    });
}

function Questions() {
    const [questions, setQuestions] = React.useState();
    React.useEffect(() => {
        async function getQuestions() {
            console.log("AAAAAAAAAAAAAA");
            const res = await getQuestionsPromise(); // type: Promise<Interface>
            var resText = await res.text();
            setQuestions(resText);
            //var json = JSON.parse(resText[0]);
            console.log("BBBBBBBBBBBBB");
            //console.log(res.json());
            console.log(questions);
            console.log(resText);
        }

        getQuestions(); // TODO: ignored Promise
    }, [])

    if (!questions) {
        return <LoadingScreen/>
    }

    return (
        <div className="App">
            <header className="App-header">
                <p>
                    Questions
                </p>
            </header>
            <p>
                {questions}
            </p>
        </div>
    );
}

export default Questions;