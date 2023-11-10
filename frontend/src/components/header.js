import Leaderboard from './leaderboard'

const Header = ({ difficulty, width, height, mineCount, functions }) => {
  const [handleDifficultyChange, setWidth, setHeight, setMineCount, initializeGrid] = functions

  const bsDifficultyCols = 'col-3 col-md-2 col-lg-2 col-xl-1'

  const isActive = (diff) => ( diff === difficulty )
  const DifficultyButtons = () => (
    <div className="row difficulty-button-container text-center justify-content-center">
      <div className={bsDifficultyCols}>
        <button
          onClick={() => handleDifficultyChange('BEGINNER')}
          className={isActive('BEGINNER') ? "active" : "passive"}
          >Beginner</button>
      </div>
      <div className={bsDifficultyCols}>
        <button
          onClick={() => {
            handleDifficultyChange('INTERMEDIATE')
          }}
          className={isActive('INTERMEDIATE') ? "active" : "passive"}
          >Intermediate</button>
      </div>
      <div className={bsDifficultyCols}>
        <button
          onClick={() => handleDifficultyChange('EXTREME')}
          className={isActive('EXTREME') ? "active" : "passive"}
          >Extreme</button>
      </div>
      <div className={bsDifficultyCols}>
        <button
          onClick={() => handleDifficultyChange('CUSTOM')}
          className={isActive('CUSTOM') ? "active" : "passive"}
          >Custom</button>
      </div>
    </div>
  )

  return (
    <div className="container header">
      <div className="row mt-5 mb-3 text-center">
        <h1>Miinaharava</h1>
      </div>
      <div className="col text-center">Select difficulty:</div>
      <DifficultyButtons />

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