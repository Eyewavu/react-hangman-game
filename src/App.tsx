import { useEffect, useState } from "react"
import styles from "./App.module.css"
import GameKeyboard from "./GameKeyboard"
import HangmanImage from "./HangmanImage"
import HangmanWord from "./HangmanWord"
import OverScreen from "./OverScreen"

export type GameState ="ongoing"|"win"|"lose"

export default function App () {
  const [word,setWord] =useState("")
  const [definition,setDefinition] =useState("")
  const [guessedLetters,setGuessedLetters] =useState<string[]>([])
  const [numberOfGuesses,setNumberOfGuesses] =useState(0)
  const [gameState,setGameState] =useState<GameState>("ongoing")

  async function getWord() {
    const response =await fetch("https://random-words-api.vercel.app/word")
    const json =await response.json()
    return json[0]
  }

  useEffect(() => {
    getWord().then(({word,definition}) => {
      setNumberOfGuesses(0)
      setGameState("ongoing")
      setGuessedLetters([])
      setWord(word.toLowerCase())
      setDefinition(definition)
      
      console.log(word)
    })
  },[])

  return (
    <div className={styles.container}>
      <OverScreen definition={definition} word={word} gameState={gameState} />
      
      <HangmanImage guess={numberOfGuesses}/>
      <HangmanWord gameState={gameState} word={word} guessedLetters={guessedLetters}/>

      <GameKeyboard
        setGuessedLetters={setGuessedLetters}
        gameState={gameState}
        setGameState={setGameState}
        setNumberOfGuesses={setNumberOfGuesses}
        word={word} guessedLetters={guessedLetters}/>

    </div>
  )
}
