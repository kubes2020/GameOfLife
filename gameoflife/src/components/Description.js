import React, { Component } from "react";
import "../Styles/Description.css";

export default class Description extends Component {
    render() {
        return (
            <div className="description-container">
                <div className="description-text">
                    <h3>How To Play</h3>
                    <p>
                        Click on any of the cells inside the grid and hit
                        "Start". You are witnessing cellular automaton, invented
                        by Cambridge mathematician Jonn Conway. The algorithmic
                        rules are as follows:
                    </p>
                    <ul>
                        <li>
                            A cell is considered alive if it is yellow and dead
                            if it is blank
                        </li>
                        <li>
                            After each iteration a cell with one or no neighbors
                            dies due to solitude
                        </li>
                        <li>
                            a cell with four or more neighbors dies by
                            overpopulation
                        </li>
                        <li>a cell with two or three neighbors survives</li>
                    </ul>
                    <p>
                        As an option if you don't want to spend the time
                        clicking on the cells to begin, try clicking "Seeded
                        Grid".
                    </p>
                </div>
            </div>
        );
    }
}
