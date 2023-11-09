
const Tile = ({ tile, functions }) => {
  const [revealTile, flagTile, checkFlagsAndRevealAdjacentTiles] = functions
  const handleClick = (e) => {
    e.preventDefault()
    if (tile.disabled) return


    if (e.type === 'click') {
      switch (tile.status){
        case 'hidden':
          revealTile(tile)
          break
        case 'open':
          checkFlagsAndRevealAdjacentTiles(tile)  
          break
        default:
          break
      }
    } else if (e.type === 'contextmenu') {
      flagTile(tile)
    }
  }
  const nroClass = ((tile.status === 'open' && tile.adjacentMines) ? ' nro_'+tile.adjacentMines : '')
  return (
      <div
          className={'tile ' + tile.status + nroClass + (tile.disabled ? ' disabled' : '')} 
          id={tile.id}
          onClick={handleClick} 
          onContextMenu={handleClick}>
      </div>
  )
}

export default Tile