import React from "react";
import axios from "axios";

import "./Questions.css";
import LoadingScreen from "./LoadingScreen";
import {onError} from "./Error";

function Questions() {
    const [questions, setQuestions] = React.useState();
    const [refreshKey, setRefreshKey] = React.useState(0);
    React.useEffect(() => {
        async function getQuestions() {
            axios.get(
                process.env.REACT_APP_BACKEND_ADDRESS + "/your_questions",
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

    function handleDeleteQuestion(id) {
        const params = new URLSearchParams();
        params.append("question_id", id);

        axios.post(
            process.env.REACT_APP_BACKEND_ADDRESS + "/delete",
            params,
            {}
        )
            .then(response => {
                console.log(response);
                setRefreshKey(oldKey => oldKey +1)
                return response.statusText;
            })
            .catch(error => {
                onError(error);
                console.log(error);
                return error.message;
            });
    }

    function renderTableData(dataObject) {
        return dataObject.map((data, key) => {
            return (
                <tr key={key}>
                    <td><img src={`${process.env.REACT_APP_BACKEND_ADDRESS}/images/${data.profileimage}`} className="question-picture"/></td>
                    <td>{data.question}</td>
                    <td className={data.corr_ans === "1" ? "correct-answer" : "invalid-answer"}>{data.answer_1}</td>
                    <td className={data.corr_ans === "2" ? "correct-answer" : "invalid-answer"}>{data.answer_2}</td>
                    <td className={data.corr_ans === "3" ? "correct-answer" : "invalid-answer"}>{data.answer_3}</td>
                    <td><button className="button" onClick={() => handleDeleteQuestion(data._id)}>Delete</button></td>
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
                <table class="questions-table">
                    <tbody>
                        {renderTableData(questions)}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Questions;