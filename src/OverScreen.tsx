import styles from "OverScreen.module.css"
import { GameState } from "./App"

export type OverScreenProps ={gameState:GameState,definition:string,word:string}
export default function OverScreen ({gameState,definition,word}:OverScreenProps) {
  return (
    <div>
      {gameState === "win" && (
        <h1>You won!</h1>
      )}
      {gameState === "lose" && (
        <h1>You lost :c</h1>
      )}
      {gameState !== "ongoing" && (
        <>
          <h2>Refresh the page to try again</h2>
          <p>{word} - {definition}</p>
        </>
      )}
    </div>
  )
}
