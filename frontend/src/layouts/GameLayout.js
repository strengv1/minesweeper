import { Outlet } from "react-router-dom";
import DifficultyBar from "./../components/DifficultyBar";

export default function GameLayout() {
  return(
    <div className="root-layout">
      <header>
        <div className="row mt-5 mb-3 text-center">
          <h1>Miinaharava</h1>
        </div>
        <DifficultyBar />
      </header>
      
      <main>
        <Outlet />
      </main>
    </div>
  )
}