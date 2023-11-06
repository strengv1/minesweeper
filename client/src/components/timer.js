const Timer = ({ time, minesLeft }) => {
  
  
  return (
    <div className="timerContainer">

      <div>Mines left: {minesLeft}</div>

      <div>
        {Math.floor(time/6000) + ':' +
        ('0' + Math.floor(time / 100 % 60)).slice(-2) +
        ':' + 
        ('0' + (Math.floor(time)) % 100).slice(-2)}
      </div>
    </div>
  )
}

export default Timer