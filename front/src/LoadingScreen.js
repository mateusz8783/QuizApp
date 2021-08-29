import React from "react";
import './LoadingScreen.scss';

function LoadingScreen() {
    return (
        <div className="loader-body">
            <h2 className="h2-loader">Loading...</h2>
            <div className="mosaic-loader">
                <div className="loader-cell d-0"></div>
                <div className="loader-cell d-1"></div>
                <div className="loader-cell d-2"></div>
                <div className="loader-cell d-3"></div>
                <div className="loader-cell d-1"></div>
                <div className="loader-cell d-2"></div>
                <div className="loader-cell d-3"></div>
                <div className="loader-cell d-4"></div>
                <div className="loader-cell d-2"></div>
                <div className="loader-cell d-3"></div>
                <div className="loader-cell d-4"></div>
                <div className="loader-cell d-5"></div>
                <div className="loader-cell d-3"></div>
                <div className="loader-cell d-4"></div>
                <div className="loader-cell d-5"></div>
                <div className="loader-cell d-6"></div>
            </div>
        </div>
    );
}

export default LoadingScreen;