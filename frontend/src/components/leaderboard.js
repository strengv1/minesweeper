import { useState, useEffect } from 'react'
import scoreService from './../services/scores'

const Leaderboard = () => {
  const [topScores, setTopScores] = useState([{ username:'default-ukko', time: 123, id: 1 }])

  useEffect(() => {
    scoreService.getAll().then(scores => {
      scores.sort((a, b) => b.time + a.time)
      setTopScores( scores )
    })
  }, [])

  const isOverAMinute = (time) => (Math.floor(time/6000) < 1)
  return (
    <div className="leaderboard">
      <table className="table table-sm table-striped table-bordered table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Username</th>
              <th scope="col">Time</th>
            </tr>
          </thead>
          <tbody>
            {topScores.length ? topScores.map((score, index) =>
              <tr key={score.id}>
                <th scope="row">{index+1}</th>
                <td>{score.username}</td>
                <td>
                  { (isOverAMinute(score.time) ? '' : (Math.floor(score.time/6000) + ':')) +
                    ('0' + Math.floor(score.time / 100 % 60)).slice(-2) +
                    ':' + 
                    ('0' + (Math.floor(score.time)) % 100).slice(-2)}
                </td>
              </tr>
            ) : null}
          </tbody>
          
      </table>
    </div>
  )
}

export default Leaderboard