import Tile from './tile.js'

const Grid = ({ grid, functions }) => (
  <div className="board">
    {grid.map( row => { 
      return row.map( tile => <Tile key={tile.id} tile={tile} functions={functions}/> )
    })}
  </div>
)

export default Grid