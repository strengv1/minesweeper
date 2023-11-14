const GameOverBox = ({ text, time, isCustom, functions }) => {
  const [newGame, saveScore, setGameOverText] = functions

  const isOverAMinute = (time) => (Math.floor(time/6000) < 1)
  const prettyTime = 
    (isOverAMinute(time) ? '' : (Math.floor(time/6000) + ':')) +
    ('0' + Math.floor(time / 100 % 60)).slice(-2) +
    ':' + 
    ('0' + (Math.floor(time)) % 100).slice(-2)

  const playAgainBtn = (<button onClick={ newGame }>Play again?</button>)  

  if (text === ''){ 
    return null 
  } else {
    const buttons = (text==='Game over!' || isCustom) ? (
      playAgainBtn
    ) : (
        <form onSubmit={ saveScore }>
          <h2>Save time { prettyTime } to the leaderboard? </h2>
          <div>
            <label>Username:</label>
            <input required name="username"/>
          </div>
          <button>Save</button>
          <button onClick={ () => setGameOverText('') }>No</button>
        </form>
    )
    return (
      <div className="gameOverBox">
        <div className="gameOverText">
          {text}
        </div>
        {buttons}
      </div>
    )
  }
}

export default GameOverBox