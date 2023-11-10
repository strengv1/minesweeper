import Leaderboard from './leaderboard'

const Header = ({ difficulty, width, height, mineCount, functions }) => {
  const [setWidth, setHeight, setMineCount, initializeGrid] = functions

  return (
    <div className="container header">
      <div className='row justify-content-center p-3 p-md-4'>
        <div className="col-10 col-md-8 col-lg-6 ">
        { difficulty !== 'CUSTOM' ? <Leaderboard difficulty={difficulty}/> :
          <fieldset>
            <div className="row">
              <label htmlFor="width">width</label>
              <input
                value={width}
                onChange={e => setWidth(Number(e.target.value))}
                type="text"
                id="width"
              />
            </div>
            <div className="row">
              <label htmlFor="height">height</label>
              <input
                value={height}
                onChange={e => setHeight(Number(e.target.value))}
                type="text"
                id="height"
              />
            </div>
            <div className="row">
              <label htmlFor="mineCount">mineCount</label>
              <input
                value={mineCount}
                onChange={e => setMineCount(Number(e.target.value))}
                type="text"
                id="mineCount"
              />
            </div>
          </fieldset>}
        </div> 
      </div>

      <div style={{ marginInline:"auto", width: "fit-content" }} className="pb-4">
        <button style={{width:"150px"}}
          onClick={ initializeGrid }
          > New Game / Refresh</button>
      </div>
    </div>
  )
}
export default Header