import logo from './logo.svg';
import './App.css';
import {Evenement} from "./models/Evenement";
import {eventManager} from "./events/EventManager";
import {createCommande, startEmittingEvents} from "./events/producer";


//
// // Producteur
// setInterval(() => {
//   const event = new Evenement('type', { data: 'data' });
//   eventManager.emit('event', event);
// }, 1000);

// Consommateur
const handleEvent = (event) => {
  console.log('Received event:', event);
};
eventManager.subscribe('event', handleEvent);


function App() {


  const handleOrderCreate = () => {
    createCommande('commande', 5);
    console.log("Commande créée")
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={handleOrderCreate}>Créer une commande</button>
      </header>
    </div>
  );
}

export default App;
