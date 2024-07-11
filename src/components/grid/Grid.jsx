import { useState, useEffect } from "react";
import "./grid.css"

function isSupportedkey(string, key)
{
    if (key === "Backspace" || key === "Enter")
      return true;
    for (let i = 0; i < string.length; i++)
    {
        if (string.at(i) === key)
            return true;
    }
    return false;
}

function incrementCol(col)
{
  if (col + 1 > 4)
    return 5;
  return col + 1;
}

function decrementCol(col)
{
  if (col === 5)
    return 4;
  if (col - 1 <= 0)
    return 0;
  return col - 1;
}

function Grid(){
    // let uniq = 0/
    const word = "smile";
    const [guess, setGuess] = useState("");
    const [pos, setPos] = useState({row: 0, col: 0});
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
        if (isSupportedkey(letters, event.key)) {
          setGrid((oldGrid) => {
            let newGrid = oldGrid.map((row, rowIndex) => {
              return row.map((cell, colIndex) => {
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
    
            // Update position after updating the grid
            setPos((oldPos) => {
              if (event.key === "Backspace") {
                return { col: decrementCol(oldPos.col), row: oldPos.row };
              } else if (event.key === "Enter" && oldPos.col > 4) {
                return { col: 0, row: oldPos.row + 1 };
              } else if (event.key !== "Enter" && event.key !== "Backspace") {
                return { col: incrementCol(oldPos.col), row: oldPos.row };
              } else {
                return oldPos;
              }
            });
    
            return newGrid;
          });
          let cells = document.querySelectorAll(".cell");
          let cell = pos.row * 5 + pos.col
          if (event.key === "Backspace")
            cells[cell].classList.remove("animate");

          if (event.key !== "Enter" && event.key !== "Backspace" && pos.col <= 4)
            cells[cell].classList.add("animate");

        } else {
          console.log("Unsupported key pressed");
        }
      };
    
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }, [pos, letters, isSupportedkey]);
    
    
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