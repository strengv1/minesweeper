const GameOverBox = ({ text, functions }) => {
  const [newGame, saveScore] = functions

  if (text === ''){ 
    return null 
  } else {
    const buttons = text==='Game over!' ? (
      <button onClick={ newGame }>Play again?</button>
    ) : (
        <form onSubmit={saveScore}>
          <h2>Save score to the leaderboard? </h2>
          <div>
            <label>Username:</label>
            <input required name="username"/>
          </div>
          <button>Save</button>
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