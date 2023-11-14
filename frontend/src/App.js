// import Beginner, { beginnerLoader } from './pages/Beginner.js'
// import Intermediate, { intermediateLoader } from './pages/Intermediate.js'

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'
import './styles.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import GameLayout from './layouts/GameLayout.js'
import Game, { scoreLoader } from './pages/Game.js'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={ <GameLayout /> }>
      <Route path=":difficulty"
        element={<Game />}
        loader={scoreLoader} />
    </Route>
  )
)

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;