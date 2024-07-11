import { useState, useEffect } from "react";
import "./grid.css";

function isSupportedKey(string, key) {
    if (key === "Backspace" || key === "Enter") return true;
    return string.includes(key);
}

function incrementCol(col) {
    return col < 4 ? col + 1 : 5;
}

function decrementCol(col) {
    return col > 0 ? col - 1 : 0;
}

function Grid() {
    const word = "smile";
    const [pos, setPos] = useState({ row: 0, col: 0 });
    const [grid, setGrid] = useState(Array.from({ length: 6 }, () => Array(5).fill("")));

    const letters = "abcdefghijklmnopqrstuvwxyz";

    function updateGrid()
    {
      
    }

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (isSupportedKey(letters, event.key)) {
                setGrid((oldGrid) => {
                    const newGrid = oldGrid.map((row, rowIndex) => {
                        return row.map((cell, colIndex) => {
                            if (rowIndex === pos.row && colIndex === pos.col - 1 && event.key === "Backspace")
                              return "";
                            if (rowIndex === pos.row && colIndex === pos.col) {
                                if (event.key === "Backspace") {
                                    return ""; // Clear the cell if Backspace is pressed
                                } else if (event.key !== "Enter") {
                                    return event.key; // Set the cell to the pressed key
                                }
                            }
                            return cell;
                        });
                    });
                    return newGrid;
                });

                setPos((oldPos) => {
                    if (event.key === "Backspace")
                        return { col: decrementCol(oldPos.col), row: oldPos.row };
                     if (event.key === "Enter" && oldPos.col > 4) {
                        return { col: 0, row: oldPos.row + 1 };
                    } else if (event.key !== "Enter" && event.key !== "Backspace") {
                        return { col: incrementCol(oldPos.col), row: oldPos.row };
                    } else {
                        return oldPos;
                    }
                });

                // Animate cells
                const cells = document.querySelectorAll(".cell");
                if (event.key === "Backspace"){
                    const cellIndex = pos.row * 5 + pos.col - 1;
                    cells[cellIndex].classList.remove("animate");
                }
                
                if (event.key !== "Enter" && event.key !== "Backspace" && pos.col <= 4)
                {
                  const cellIndex = pos.row * 5 + pos.col;
                  cells[cellIndex].classList.add("animate");
                }

            } else {
                console.log("Unsupported key pressed");
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [pos]);

    return (
        <div className="grid">
            {grid.map((row, i) => {
                return row.map((col, j) => {
                    let uniq = `${i}-${j}`;
                    return (
                        <div key={uniq} className="cell">
                            <h2>{col.toUpperCase()}</h2>
                        </div>
                    );
                });
            })}
        </div>
    );
}

export default Grid;
