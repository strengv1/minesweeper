import { useLoaderData, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import scoreService from './../services/scores'
import Leaderboard from "../components/leaderboard";
import NewGameButton from "../components/NewGameButton";
import Timer from "../components/timer";
import GameOverBox from "../components/GameOverBox";
import Grid from "../components/grid";
import CustomFieldSet from "../components/CustomFieldSet"

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
export default function Game() {
  const { difficulty } = useParams()
  const [topScores, gridDimensions] = useLoaderData()

  const [customGridDimensions, setCustomGridDimensions] = useState( { width:4, height:4, mineCount:6 } )
  const [firstClick, setFirstClick] = useState(true)
  const [grid, setGrid] = useState([[]])
  const [gameOverText, setGameOverText] = useState('')
  const [time, setTime] = useState(0)
  const [timerOn, setTimerOn] = useState(0)
  const [minesLeftText, setMinesLeftText] = useState(gridDimensions.mineCount)

  // eslint-disable-next-line
  useEffect(() => initializeGrid(), [difficulty])  

  // Handle clock
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

    let newGrid;
    if (difficulty==='custom') {
      setMinesLeftText(customGridDimensions.mineCount)
      newGrid = generateGrid(customGridDimensions.width, customGridDimensions.height)
      addMinesToGrid(newGrid, customGridDimensions.mineCount)
      addAdjacentMineNumbers(newGrid, customGridDimensions.width)
    } else {
      setMinesLeftText(gridDimensions.mineCount)
      newGrid = generateGrid(gridDimensions.width, gridDimensions.height)
      addMinesToGrid(newGrid, gridDimensions.mineCount)
      addAdjacentMineNumbers(newGrid, gridDimensions.width)
    }
    
    setGrid(newGrid)

    const board = document.querySelector('.board')
    if (board) {
      difficulty==='custom' ? board.style.setProperty('--boardWidth', customGridDimensions.width) : board.style.setProperty('--boardWidth', gridDimensions.width)
    }
  }
  
  const saveScore = ( event ) => {
    event.preventDefault()

    const myThen = returnedScore => {
      alert('Score saved succesfully!')
    }
    const myCatch = error => {
      console.log(error.response ?
        error.response.data.error :
        'Unidentified error occured, error:', error, true
      )
    }
    const newScore = {
      "username": event.target.username.value,
      "time": time
    }
    switch(difficulty){
      case 'beginner':
        scoreService
          .createBeginner(newScore)
          .then(returnedScore => myThen(returnedScore))
          .catch(error => myCatch(error))
        break
      case 'intermediate':
        scoreService
          .createIntermediate(newScore)
          .then(returnedScore => myThen(returnedScore))
          .catch(error => myCatch(error))
        break
      case 'extreme':
        scoreService
          .createExtreme(newScore)
          .then(returnedScore => myThen(returnedScore))
          .catch(error => myCatch(error))
        break
      default:
        break
    }

    setGameOverText('')
    event.target.username.value = ''
  }

  return (
    <>
      {
        difficulty === 'custom' ?
          <CustomFieldSet
            customGridDimensions={customGridDimensions}
            setCustomGridDimensions={setCustomGridDimensions}
          /> :
          <Leaderboard scores={topScores}/>
      }
      
      <NewGameButton initializeGrid={initializeGrid}/>
      <Timer time={time} minesLeft={minesLeftText} />

      <GameOverBox
        text={gameOverText}
        time={time}
        isCustom={difficulty==='custom'}
        functions={
          [ initializeGrid,
          saveScore,
          setGameOverText ]}
      />
      <Grid
        grid={grid}
        functions={
          [ revealTile,
            flagTile,
            checkFlagsAndRevealAdjacentTiles ]}
      />
    </>
  )
}

export const scoreLoader = async ({ params }) => {
  const { difficulty } = params

  const fastestFirst = (a, b) => a.time - b.time
  let score = [];
  let gridDimensions = {
    width: 2,
    height: 2,
    mineCount: 1
  }

  switch (difficulty) {
    case 'beginner':
      score = await scoreService.getBeginner()
        .then(scores => {
          scores.sort(fastestFirst)
          return scores
        })
      gridDimensions = { width: 9, height: 9, mineCount: 10 }
      return [score, gridDimensions]

    case 'intermediate':
      score = await scoreService.getIntermediate()
        .then(scores => {
          scores.sort(fastestFirst)
          return scores
        })
      gridDimensions = { width: 16, height: 16, mineCount: 40 }
      return [score, gridDimensions]
  
    case 'extreme':
      score = await scoreService.getExtreme()
        .then(scores => {
          scores.sort(fastestFirst)
          return scores
        })
      gridDimensions = { width: 30, height: 16, mineCount: 99 }
      return [score, gridDimensions]
    case 'custom':
      score = null
      gridDimensions = { width: 4, height: 4, mineCount: 5 }
      return [score, gridDimensions]
    
    default:
      break
    
  }
}