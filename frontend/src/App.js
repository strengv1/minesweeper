import { useState, useEffect  } from 'react'
import Grid from './components/grid.js'
import Timer from './components/timer.js'
import Header from './components/header.js'
import GameOverBox from './components/GameOverBox.js'
import scoreService from './services/scores'
import './styles.css'
import 'bootstrap/dist/css/bootstrap.min.css'

const getXYfromIndex = (index, width) => {
  const x = index%width
  const y = parseInt(index/width)
  return { x, y }
}
const randInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
}
const getAdjacentTiles = (grid, tile)  => {
  const neighbors = []
  for (let xOff = -1; xOff < 2; ++xOff){
    for (let yOff = -1; yOff < 2; ++yOff){
      const neighbor = grid[tile.x + xOff]?.[tile.y + yOff]
      if (neighbor) neighbors.push(neighbor)
    } 
  }
  return neighbors
}
const addAdjacentMineNumbers = (grid) => {
  for ( const row of grid ) {
    for ( const tile of row ) {
      const neighbors = getAdjacentTiles(grid, tile)
      for (let j = 0; j<neighbors.length; ++j) {
        if (neighbors[j].isMine) tile.adjacentMines++
      }
    }
  }
}
const addMinesToGrid = (grid, mineCount) => {
  const gridlen = grid.length * grid[0].length
  if ( mineCount > gridlen ) {
    console.log('Too many mines!')
    return -1
  }

  let mineIndexes = []
  while (mineIndexes.length < mineCount) {
    const randomNumber = randInt(0, gridlen)

    if (!mineIndexes.includes(randomNumber)) {
      mineIndexes.push(randomNumber)
    }
  }
  for (const idx of mineIndexes) {
    const {x, y} = getXYfromIndex(idx, grid.length)
    grid[x][y].isMine = true
  }
}
const generateGrid = (wid, hgt) => {
  let newGrid = []
  for (let x = 0; x < hgt; ++x){
    const row = []
    for (let y = 0; y < wid; ++y) {
      const idx = y + wid*x
      const tile = {
        id: `${x}_${y}`,
        idx,
        x,
        y,
        status: 'hidden',
        disabled: false,
        adjacentMines: 0,
        isMine: false,
      }
      row.push(tile)
    }
    newGrid.push(row)
  }
  return newGrid
}

function App() {
  const [difficulty, setDifficulty] = useState('BEGINNER')
  const [firstClick, setFirstClick] = useState(true)
  const [height, setHeight] = useState(9)
  const [width, setWidth] = useState(9)
  const [mineCount, setMineCount] = useState(10)
  const [grid, setGrid] = useState([[]])
  const [gameOverText, setGameOverText] = useState('')
  const [time, setTime] = useState(0)
  const [timerOn, setTimerOn] = useState(0)
  const [minesLeftText, setMinesLeftText] = useState(mineCount)

  useEffect(() => {
    const setBoard = (wdth, hght, mines) => {
      setWidth(wdth)
      setHeight(hght)
      setMineCount(mines)
    }
    switch (difficulty) {
      case 'BEGINNER':
          setBoard(9, 9, 10)
          break;
      case 'INTERMEDIATE':
          setBoard(16, 16, 40)
          break;
      case 'EXTREME':
          setBoard(16, 30, 99)
          break;
      default:
          setBoard(width, height, mineCount)
          break;
    }
  
    // eslint-disable-next-line
  }, [difficulty])

  // eslint-disable-next-line
  useEffect(() => initializeGrid(), [])  

  useEffect(() => {
    let interval = null
    
    if (timerOn) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 1)
      }, 10)
    } else {
      clearInterval(interval)
    }

    return () => clearInterval(interval) // Memory leak preventation?
  }, [timerOn])
  

  const handleDifficultyChange = (newDifficulty) => {
    // Update the difficulty state when the user selects a new difficulty
    setDifficulty(newDifficulty);
  };


  // Game does not continue if:
  // 1. A tile has a mine, and it's unopened
  // 2. A tile does NOT have a mine and it's unopened
  const checkForWin = () => {
    for (const row of grid){
      for (const tile of row) {
        const tileIsOpened = tile.status.includes('open') || tile.status.includes('mine')
      
        if (tile.isMine && tileIsOpened) return false
        if (!tile.isMine && !tileIsOpened) return false
      }
    }
    return true
  }
  // Call when game is lost (or won!)
  // 1. Mark wrong flags as wrong
  // 2. Reveal all mines (keep flagged mines as flags)
  // 3. Disable all tiles
  const gameOver = (editableGrid, text) => {
    setTimerOn(false)
    editableGrid.forEach((row) => {
      row.forEach( (tile) => {
        if ( !tile.isMine && tile.status === 'flag') {
          tile.status = 'flag_incorrect'
        }
        if ( tile.isMine && tile.status !== 'flag') {
          tile.status = 'mine'
        }
        
        tile.disabled = true
      })
    })
    setGameOverText(text)
  }
  const revealAdjacentHiddenTiles = (tile) => {
    const neighbors = getAdjacentTiles(grid, tile)

    neighbors.forEach(tile => {
      if (tile.status === 'hidden') revealTile(tile)
    })
  }
  // If an open tile is clicked, and all it's surrounding
  // mines have been flagged, reveal all remaining tiles.
  // However, if you place the correct number of flags on
  // the wrong squares, this will explode the mines.
  const checkFlagsAndRevealAdjacentTiles = (tile) => {
    const neighbors = getAdjacentTiles(grid, tile)
    let neighbouringFlags = 0
    
    neighbors.forEach(tile => {
      if (tile.status === 'flag') neighbouringFlags++
    })

    if (neighbouringFlags === tile.adjacentMines){
      revealAdjacentHiddenTiles(tile)
    }
  }
  const handleFirstClick = () => {
    setFirstClick(false)
    setTimerOn(true)
  }
  const revealTile = (tile) => {
    if (firstClick) {
      handleFirstClick()
    }

    let newGrid = [...grid]
    if (tile.isMine) {
      // End game
      gameOver(newGrid, 'Game over!')
      newGrid[tile.x][tile.y].status = 'mine_exploded'
    } else {
      // reveal number / empty
      newGrid[tile.x][tile.y].status = 'open'
      if (tile.adjacentMines < 1) {
        revealAdjacentHiddenTiles(tile)
      }
    }

    setGrid(newGrid)
    if (checkForWin()){
      gameOver(newGrid, 'Congratulations!')
    }
  }
  const flagTile = (tile) => {
    let newGrid = [...grid]
    switch (tile.status){
      case 'hidden':
        newGrid[tile.x][tile.y].status = 'flag'
        setMinesLeftText(prev => prev - 1)
        break
      case 'flag':
        newGrid[tile.x][tile.y].status = 'hidden'
        setMinesLeftText(prev => prev + 1)
        break
      default:
        break
    }
    setGrid(newGrid)
  }

  const initializeGrid = () => {
    setTimerOn(false)
    setTime(0)
    setFirstClick(true)
    setGameOverText('')
    setMinesLeftText(mineCount)
    const newGrid = generateGrid(width, height)
    addMinesToGrid(newGrid, mineCount)
    addAdjacentMineNumbers(newGrid, width)
    setGrid(newGrid)

    const board = document.querySelector('.board')
    if (board) {
      board.style.setProperty('--boardWidth', width)
    }
  }
  
  const saveScore = ( event ) => {
    event.preventDefault()
    switch(difficulty){
      case 'BEGINNER':
        scoreService.createBeginner({
          "username": event.target.username.value,
          "time": time
        }).then(returnedScore => {
          console.log(returnedScore, ': Score saved succesfully!')
        })
        .catch(error => {
          console.log(
            error.response ?
              error.response.data.error :
              'Unidentified error occured, error:', error, true
          )
        })
        break
      case 'INTERMEDIATE':
        scoreService.createIntermediate({
          "username": event.target.username.value,
          "time": time
        }).then(returnedScore => {
          console.log('Score saved succesfully!')
        })
        .catch(error => {
          console.log(
            error.response ?
              error.response.data.error :
              'Unidentified error occured, error:', error, true
          )
        })
        break
      case 'EXTREME':
        scoreService.createExtreme({
          "username": event.target.username.value,
          "time": time
        }).then(returnedScore => {
          console.log(returnedScore, ': Score saved succesfully!')
        })
        .catch(error => {
          console.log(
            error.response ?
              error.response.data.error :
              'Unidentified error occured, error:', error, true
          )
        })
        break
      default:
        break
    }

    setGameOverText('')
    event.target.username.value = ''
  }

  return (
    <>
      <Header
        difficulty={difficulty} width={width} height={height} mineCount={mineCount}
        functions={[
            handleDifficultyChange,
            setWidth,
            setHeight,
            setMineCount,
            initializeGrid
          ]}
      />

      <div className="body">
        <Timer time={time} minesLeft={minesLeftText} />

        <GameOverBox
          text={gameOverText}
          functions={[
            initializeGrid,
            saveScore
          ]} />
        <Grid
            grid={grid}
            functions={
              [ revealTile,
                flagTile,
                checkFlagsAndRevealAdjacentTiles ]}
          />
      </div>
    </>
  );
}

export default App;