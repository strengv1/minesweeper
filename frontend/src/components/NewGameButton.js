const NewGameButton = ({ initializeGrid }) => (
  <div style={{ marginInline:"auto", width: "fit-content" }} className="pb-4">
    <button style={{width:"150px"}}
      onClick={ initializeGrid }
    > New Game / Refresh</button>
  </div>
)

export default NewGameButton
