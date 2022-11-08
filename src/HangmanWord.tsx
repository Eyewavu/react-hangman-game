import { GameState } from "./App"
import styles from "./HangmanWord.module.css"

export type HangmanWordProps ={
  word: string,
  gameState:GameState,
  guessedLetters: string[],
}
export default function HangmanWord ({word,guessedLetters,gameState}:HangmanWordProps) {
  return (
    <div className={styles.word}>
      {word.split("").map((char,i) => {
        const show =guessedLetters.indexOf(char) !== -1
        const incorrect =gameState === "lose" && !show

        return (
          <div
            style={{color:incorrect ? "red" : "white"}}
            className={styles.letter}
            key={i}>{(show || incorrect) && char}</div>
        )
      })}
    </div>
  )
}
