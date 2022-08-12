import logo from './logo.svg';
import './App.css';
import Header from './components/Header'
import GameTable from './components/GameTable'
import Hero from './components/Hero'
import Form from './components/Form'


function App() {
  return (
    <div className="md:container bg-secondary " style={{ height: '100vh' }}>
      <Header />

      <Hero />

      <div className="container mt-5">
        <div className="row">
          <GameTable />
          <GameTable />
        </div>
      </div>

      <Form />

    </div>



  );
}

export default App;
