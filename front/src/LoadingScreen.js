import React from "react";
import './LoadingScreen.scss';

function LoadingScreen() {
    return (
        <div className="loader-body">
            <h2 className="h2-loader">Loading...</h2>
            <div className="mosaic-loader">
                <div className="loader-cell d-0"/>
                <div className="loader-cell d-1"/>
                <div className="loader-cell d-2"/>
                <div className="loader-cell d-3"/>
                <div className="loader-cell d-1"/>
                <div className="loader-cell d-2"/>
                <div className="loader-cell d-3"/>
                <div className="loader-cell d-4"/>
                <div className="loader-cell d-2"/>
                <div className="loader-cell d-3"/>
                <div className="loader-cell d-4"/>
                <div className="loader-cell d-5"/>
                <div className="loader-cell d-3"/>
                <div className="loader-cell d-4"/>
                <div className="loader-cell d-5"/>
                <div className="loader-cell d-6"/>
            </div>
        </div>
    );
}

export default LoadingScreen;