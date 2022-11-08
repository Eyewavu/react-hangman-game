export type HangmanImageProps ={ guess:number }
export default function HangmanImage ({ guess }:HangmanImageProps) {
  if ( guess > 9 || guess < 0 ) throw new Error("Invalid guess number")

  return (
    <img src={`./s${guess}.jpg`} alt="" />
  )
}
