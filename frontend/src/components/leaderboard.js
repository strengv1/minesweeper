// import { useState, useEffect } from 'react'

const Leaderboard = ({ scores }) => {
  
  const isOverAMinute = (time) => (Math.floor(time/6000) < 1)
  return (
    <div className="container leaderboard">
      <div className='row justify-content-center p-3 p-md-4'>
        <table className="table table-sm table-striped table-bordered table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Username</th>
              <th scope="col">Time</th>
            </tr>
          </thead>
          <tbody>
            {scores ? scores.map((score, index) =>
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
    </div>
  )
}

export default Leaderboard