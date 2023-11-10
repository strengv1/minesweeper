import { NavLink } from 'react-router-dom'

const DifficultyBar = () => {

  const bsDifficultyCols = 'col-3 col-md-2 col-lg-2 col-xl-1'
  return(
    <nav>
      <div className="row difficulty-button-container text-center justify-content-center">
        <NavLink
          className={bsDifficultyCols}
          to='/beginner'
        >Beginner</NavLink>

        <NavLink
          className={bsDifficultyCols}
          to='/intermediate'
        >Intermediate</NavLink>
        
        <NavLink
          className={bsDifficultyCols}
          to='/extreme'
        >Extreme</NavLink>
        {/* <NavLink
          className={bsDifficultyCols}
          to='/custom'
        >Custom</NavLink> */}

      </div>
    </nav>
  )
}

export default DifficultyBar