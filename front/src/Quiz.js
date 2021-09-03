import React, {useState} from "react";
import axios from "axios";

import "./Questions.css";
import "./Quiz.css";
import LoadingScreen from "./LoadingScreen";
import {onError} from "./Error";

function Quiz() {
    const [questions, setQuestions] = React.useState();
    const [refreshKey, setRefreshKey] = React.useState(0);
    React.useEffect(() => {
        async function getQuestions() {
            axios.get(
                process.env.REACT_APP_BACKEND_ADDRESS + "/quiz",
                {})
                .then(response => {
                    setQuestions(response.data);
                    console.log(response);
                    return response.statusText;
                })
                .catch(error => {
                    if(error.response !== undefined && error.response.status === 401) {
                        alert("Unauthorized");
                    }
                    else {
                        onError(error);
                        console.log(error);
                        return error.message;
                    }
                });
        }

        getQuestions(); // TODO: ignored Promise
    }, [refreshKey])

    const [isActive, setActive] = useState(false);

    const toggleClass = () => {
        setActive(!isActive);
        alert(isActive);
    };

    function correct() {
        alert("Correct!");
    }

    function incorrect() {

    }

    function renderTableData(dataObject) {
        return dataObject.map((data, key) => {
            return (
                <tr key={key}>
                    <td><img src={`${process.env.REACT_APP_BACKEND_ADDRESS}/images/${data.profileimage}`} className="question-picture"/></td>
                    <td>{data.question}</td>
                    <td onClick={ data.corr_ans === "1" ? () => correct() : () => incorrect() }>{data.answer_1}</td>
                    <td onClick={data.corr_ans === "2" ? () => correct() : () => incorrect() }>{data.answer_2}</td>
                    <td onClick={data.corr_ans === "3" ? () => correct() : () => incorrect() }>{data.answer_3}</td>
                </tr>
            )
        })
    }

    if (!questions) {
        return <LoadingScreen/>
    }

    return (
        <div className="App">
            <h2 className="pb-3 mt-4 mb-3 border-bottom">Your Questions</h2>
            <div className="questions-table-body">
                <table class="questions-table quiz-table">
                    <tbody>
                    {renderTableData(questions)}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Quiz;