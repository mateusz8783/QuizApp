import React from "react";
import "./NotFound.scss";

function NotFound() {
    return (
        <div className="notfound-body">
            <div className="notfound-text">
                <h3>Sorry, page not found!</h3>
            </div>
            <div className="shrug">
                <span className="left-arm">¯\_</span>
                (ツ)
                <span className="right-arm">_/¯</span>
                <span className="blink"></span>
            </div>
        </div>
    );
}

export default NotFound;