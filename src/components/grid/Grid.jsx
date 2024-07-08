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


    const letters = "abcdefghijklmnopqrstuvwxyz";
    useEffect(() => {
        const handleKeyDown = (event) => {
          if (has(letters, event.key) || event.key === "Backspace") {
            // Update grid
            setGrid((oldGrid) => {
              const newGrid = oldGrid.map((row, rowIndex) => {
                return row.map((cell, colIndex) => {
                  if (rowIndex === pos.row && colIndex === pos.col) {
                    return event.key;
                  }
                  return cell;
                });
              });
              return newGrid;
            });
    
            // Update position
            setPos((oldPos) => {
              if (oldPos.col >= 4) {
                return { col: 0, row: oldPos.row + 1 };
              } else {
                return { col: oldPos.col + 1, row: oldPos.row };
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
                    // console.log(col, j);
                    return <div key={uniq} className="cell"><h2>{col.toUpperCase()}</h2></div>
                })
            })
        }
    </div>
}

export default Grid;