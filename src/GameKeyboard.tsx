import React from "react"
import { GameState } from "./App"
import styles from "./GameKeyboard.module.css"
import type { HangmanWordProps } from "./HangmanWord"

type ReactSetter<T> =React.Dispatch<React.SetStateAction<T>>

export interface GameKeyboardProps extends HangmanWordProps {
  setGuessedLetters:ReactSetter<string[]>,
  setNumberOfGuesses:ReactSetter<number>,
  setGameState:ReactSetter<GameState>
}
export default function GameKeyboard ({word,guessedLetters,setGuessedLetters,setNumberOfGuesses,gameState,setGameState}:GameKeyboardProps) {
  const letters =Array(26).fill(0).map((_,id) => ({id,name: String.fromCharCode(id +97)}))
  
  function onClick(e:MouseEvent) {
    if ( gameState !== "ongoing" ) return

    const target =e.target as HTMLButtonElement
    const letter =target.textContent!

    const _guessedLetters =[...guessedLetters,letter]
    setGuessedLetters(_guessedLetters)

    if ( !word.includes(letter)) {
      setNumberOfGuesses(v => {
        const numberOfGuesses =v +1
        if ( numberOfGuesses > 8 ) setGameState("lose")

        return numberOfGuesses
      })

    }
    else {
      const correctGuesses =word.split("").map(item => _guessedLetters.includes(item))
      if ( correctGuesses.every(i => i) ) setGameState("win")
    }
  }

  return (
    <div className={styles.keyboardContainer}>
      {letters.map(letter => {
        const disabled =guessedLetters.indexOf(letter.name) !== -1
        const classes =[styles.keyboardBtn]
        if ( disabled ) {
          const correct =word.includes(letter.name)
          if ( correct ) classes.push(styles.keyboardBtnCorrect)
        }

        const className =classes.join(" ")

        return (
          <button
            //@ts-ignore
            onClick={onClick}
            disabled={disabled}
            className={className}
            key={letter.id}>
            
            {letter.name}
          </button>
        )
      })}
    </div>
  )
}
