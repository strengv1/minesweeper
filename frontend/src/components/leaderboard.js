const Leaderboard = ({ scores }) => {
  const prettyTime = (time) => {
    const isOverAMinute = (time) => (Math.floor(time / 6000) >= 1)
    return (isOverAMinute(time) ? Math.floor(time / 6000) + ':' : '') +
      ('0' + Math.floor(time / 100 % 60)).slice(-2) +
      ':' +
      ('0' + (Math.floor(time)) % 100).slice(-2)
  }

  const top10Scores = scores?.slice(0, 10) ?? []

  return (
    <div className="container leaderboard">
      <div className="row justify-content-center p-3 p-md-4">
        <div className="col-10 col-lg-6">
          <table className="table table-sm table-striped table-bordered table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Username</th>
                <th scope="col">Time</th>
              </tr>
            </thead>
            <tbody>
              {top10Scores.length > 0 ? (
                top10Scores.map((score, index) => (
                  <tr key={score.id}>
                    <th scope="row">{index + 1}</th>
                    <td>{score.username}</td>
                    <td>{prettyTime(score.time)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center text-muted">
                    No scores yet! Play a game to set the first score.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Leaderboard