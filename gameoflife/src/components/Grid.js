import React, { Component } from "react";
import "../Styles/Grid.css";
import Controls from "./Controls.js";
import { clone } from "ramda";
import Description from "./Description.js";

class Grid extends Component {
    constructor(props) {
        super(props);
        this.width = 25;
        this.height = 25;
        this.state = {
            grid1: Array(this.width * this.height).fill({}),
            speed: 0,
        };
    }

    gridReset = (seeded) => {
        clearInterval(this.intervalId);
        let startBlank = [];
        let col = 0;
        let row = 0;
        while (row < this.width) {
            if (seeded) {
                for (col = 0; col < this.height; col++) {
                    startBlank.push({
                        row: row,
                        col: col,
                        isAlive: Math.floor(Math.random() * 4) === 1 ? 1 : 0,
                    });
                }
                row += 1;
            } else {
                for (col = 0; col < this.height; col++) {
                    startBlank.push({
                        row: row,
                        col: col,
                        isAlive: 0,
                    });
                }
                row += 1;
            }
        }
        this.setState({ grid1: startBlank });
    };

    componentDidMount() {
        this.gridReset();
        this.setState({
            speed: 1000,
        });
    }

    // *** Main Game Logic ***

    runProgram = (e) => {
        e.preventDefault();
        // Create deep copy of grid1
        let grid2 = clone(this.state.grid1);
        // (1) Iterate through grid1 array
        // (2) Check how many neighbors are alive
        // (3) Adjust grid2 based on that number
        this.state.grid1.map((item) => {
            // Function to find num of neighbors who are alive, to determine if current node should live or die
            let aliveCount = 0;
            if (
                item.row > 0 &&
                this.state.grid1[(item.row - 1) * this.width + item.col]
                    .isAlive === 1
            ) {
                aliveCount += 1;
            }
            if (
                item.row > 0 &&
                item.col < this.width - 1 &&
                this.state.grid1[(item.row - 1) * this.width + (item.col + 1)]
                    .isAlive === 1
            ) {
                aliveCount += 1;
            }
            if (
                item.col < this.width - 1 &&
                this.state.grid1[item.row * this.width + (item.col + 1)]
                    .isAlive === 1
            ) {
                aliveCount += 1;
            }
            if (
                item.row < this.width - 1 &&
                item.col < this.width - 1 &&
                this.state.grid1[(item.row + 1) * this.width + (item.col + 1)]
                    .isAlive === 1
            ) {
                aliveCount += 1;
            }
            if (
                item.row < this.width - 1 &&
                this.state.grid1[(item.row + 1) * this.width + item.col]
                    .isAlive === 1
            ) {
                aliveCount += 1;
            }
            if (
                item.row < this.width - 1 &&
                item.col > 0 &&
                this.state.grid1[(item.row + 1) * this.width + (item.col - 1)]
                    .isAlive === 1
            ) {
                aliveCount += 1;
            }
            if (
                item.col > 0 &&
                this.state.grid1[item.row * this.width + (item.col - 1)]
                    .isAlive === 1
            ) {
                aliveCount += 1;
            }
            if (
                item.row > 0 &&
                item.col > 0 &&
                this.state.grid1[(item.row - 1) * this.width + (item.col - 1)]
                    .isAlive === 1
            ) {
                aliveCount += 1;
            }

            // update grid2 with aliveCount
            let index = item.row * this.width + item.col;
            if (
                aliveCount >= 2 &&
                aliveCount <= 3 &&
                this.state.grid1[index].isAlive === 1
            ) {
                grid2[index] = { ...grid2[index], isAlive: 1 };
            } else if (
                aliveCount === 3 &&
                this.state.grid1[index].isAlive === 0
            ) {
                grid2[index] = { ...grid2[index], isAlive: 1 };
            } else {
                grid2[index] = { ...grid2[index], isAlive: 0 };
            }
            return this.state.grid1;
        });
        // rerender page with updated grid
        this.setState({
            grid1: grid2,
        });
    };

    // *** onClick Functions ***

    // To get the correct index from a 1 dimensional array
    // use this formula: col + width * row
    handleClick = (e, item) => {
        // e.preventDefault();
        let index = item.row * this.width + item.col;
        let updateGrid = this.state.grid1;
        updateGrid[index] =
            item.isAlive === 1
                ? { ...item, isAlive: 0 }
                : { ...item, isAlive: 1 };
        this.setState({
            grid1: updateGrid,
        });
    };

    playContinuous = (e) => {
        e.preventDefault();
        clearInterval(this.intervalId);
        this.intervalId = setInterval(() => {
            this.runProgram(e);
        }, this.state.speed);
    };

    pause = (e) => {
        e.preventDefault();
        clearInterval(this.intervalId);
    };

    faster = (e) => {
        e.preventDefault();
        clearInterval(this.intervalId);
        this.setState((prevState) => ({
            speed: prevState.speed * 0.7,
        }));
        this.playContinuous(e);
    };

    slower = (e) => {
        e.preventDefault();
        clearInterval(this.intervalId);
        this.setState((prevState) => ({
            speed: prevState.speed * 1.2,
        }));
        this.playContinuous(e);
    };

    seededGrid = (e) => {
        e.preventDefault();
        clearInterval(this.intervalId);
        this.gridReset(true);
    };

    gridClear = (e) => {
        e.preventDefault();
        clearInterval(this.intervalId);
        this.gridReset(false);
    };

    render() {
        return (
            <>
                <h1>Game Of Life</h1>

                <div className="box-container">
                    {this.state.grid1.map((item, index) => {
                        return (
                            <button
                                onClick={(e) => this.handleClick(e, item)}
                                key={index}
                                className={item.isAlive ? "box-alive" : "box"}
                            ></button>
                        );
                    })}
                </div>
                <div>
                    <Controls
                        runProgram={this.runProgram}
                        gridReset={this.gridReset}
                        speed={this.state.speed}
                        intervalId={this.intervalId}
                        playContinuous={this.playContinuous}
                        faster={this.faster}
                        slower={this.slower}
                        seededGrid={this.seededGrid}
                        pause={this.pause}
                        gridClear={this.gridClear}
                    ></Controls>
                </div>
                <Description />
            </>
        );
    }
}

export default Grid;
