import logo from './logo.svg';
import './App.css';
import Header from './components/Header'
import GameTable from './components/GameTable'

function App() {
  return (
    <div className="container">
      <Header />

      <div className="container">
        <div className="row">
          <GameTable />
          <GameTable />
        </div>
      </div>
    </div>

  );
}

export default App;
