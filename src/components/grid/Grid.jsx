import { useState, useEffect } from "react";
import "./grid.css"

function has(string, char)
{
    for (let i = 0; i < string.length; i++)
        {
            if (string.at(i) === char)
                return true;
        }
        return false;
}

function Grid(){
    // let uniq = 0/
    const word = "smile";
    const [guess, setGuess] = useState("");
    const [pos, setPos] = useState({row: 0, col: 0})
    const [grid, setGrid] = useState(
        [
        ["","","","",""],
        ["","","","",""],
        ["","","","",""],
        ["","","","",""],
        ["","","","",""],
        ["","","","",""],
    ]);
    function checkGuess(guess)
    {
        const word = "smile";
        console.log("word ", word);
        console.log("guess ", guess);
    }

    const letters = "abcdefghijklmnopqrstuvwxyz";
    useEffect(() => {
        const handleKeyDown = (event) => {

            console.log(event.key);
          if (has(letters, event.key) || event.key === "Backspace" || event.key === "Enter") {
            // Update grid
            
            setGrid((oldGrid) => {
              const newGrid = oldGrid.map((row, rowIndex) => {
                return row.map((cell, colIndex) => {
                  if (rowIndex === pos.row && colIndex === pos.col && event.key !== "Enter") {
                    return event.key;
                  }
                  return cell;
                });
              });
              return newGrid;
            });
            // Update position  
            setPos((oldPos) => {            
                if (oldPos.col >= 4 && event.key === "Enter") {
                    const guess = grid[oldPos.row].join("");
                    checkGuess(guess);
                    return { col: 0, row: oldPos.row + 1};
                } else {
                    return { col: event.key !== "Enter" ? oldPos.col + 1 : oldPos.col, row: oldPos.row };
                }
            });
          } else {
            console.log("I can't");
          }
        };
    
        window.addEventListener("keydown", handleKeyDown);
        return () => {
          window.removeEventListener("keydown", handleKeyDown);
        };
      }, [pos]);
    // console.log(pos);
    return <div className="grid">
        {
            grid.map((row, i) => {
                return row.map((col, j) =>{
                    let uniq = `${i}-${j}`;
                    return <div key={uniq} className="cell"><h2>{col.toUpperCase()}</h2></div>
                })
            })
        }
    </div>
}

export default Grid;