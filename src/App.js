import logo from './logo.svg';
import './App.css';
import Header from './components/Header'
import GameTable from './components/GameTable'

function App() {
  return (
    <div className="md:container bg-secondary">
      <Header />

      <div class="bg-dark text-secondary px-4 py-5 text-center">
        <div class="pt-5 pb-2">
          <h1 class="display-5 fw-bold text-white">Free Game Tracker</h1>
          <div class="col-lg-6 mx-auto">
            <p class="fs-5 mb-4">Keep up with free offers on Steam and the Epic Games Store using the table below, or sign up below to get notifications when there are new promotions!</p>
            <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
{/*               <button type="button" class="btn btn-outline-info btn-lg px-4 me-sm-3 fw-bold">Custom button</button>
              <button type="button" class="btn btn-outline-light btn-lg px-4">Secondary</button> */}
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-5">
        <div className="row">
          <GameTable />
          <GameTable />
        </div>
      </div>
    </div>

  );
}

export default App;
