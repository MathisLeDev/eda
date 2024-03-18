// TODO: Mise en place d'un Producteur-Consommateur basé sur des Événements
import {useEffect, useState} from "react";
import ThirdPart from "./components/thirdPart";

class Evenement {
  constructor(type, payload) {
    this.type = type;
    this.payload = payload;
    this.date = new Date().toLocaleString(); // Ajout de la date à la création de l'événement
  }
}

class Producteur {
  constructor() {
    this.listeners = [];
  }

  addListener(listener) {
    this.listeners.push(listener);
  }

  startProducingEvents(interval) {
    setInterval(() => {
      const evenement = new Evenement('type_evenement', 'données_associées');
      this.listeners.forEach(listener => {
        listener.handleEvent(evenement);
      });
    }, interval);
  }
}

class Consommateur {
  handleEvent(evenement) {
    console.log('Événement reçu :', evenement);
  }
}

const producteur = new Producteur();
const consommateur = new Consommateur();

producteur.addListener(consommateur);
producteur.startProducingEvents(2000);


// TODO: Système de Commandes en Temps Réel

class Commande {
  constructor(type, quantite) {
    this.type = type;
    this.quantite = quantite;
    this.date = new Date().toLocaleString();
  }
}


class ProducteurCommandes {
  constructor() {
    this.listeners = [];
  }

  addListener(listener) {
    this.listeners.push(listener);
  }

  passerCommande(commande) {
    this.listeners.forEach(listener => {
      listener.handleCommande(commande);

    });
  }
}


class ConsommateurLivraison {
  handleCommande(commande) {
    if (commande.type === 'livraison') {
      console.log('Traitement de la commande de livraison :', commande);
    }
  }
}

class ConsommateurFacturation {
  handleCommande(commande) {
    if (commande.type === 'facturation') {
      console.log('Traitement de la commande de facturation :', commande);
    }
  }
}

const producteurCommandes = new ProducteurCommandes();
const consommateurLivraison = new ConsommateurLivraison();
const consommateurFacturation = new ConsommateurFacturation();

producteurCommandes.addListener(consommateurLivraison);
producteurCommandes.addListener(consommateurFacturation);

const nouvelleCommandeLivraison = new Commande('livraison', 10);
const nouvelleCommandeFacturation = new Commande('facturation', 5);

producteurCommandes.passerCommande(nouvelleCommandeLivraison);
producteurCommandes.passerCommande(nouvelleCommandeFacturation);

// TODO: Système de Messagerie Pub/Sub

class Message {
  constructor(auteur, contenu, chaine) {
    this.auteur = auteur;
    this.contenu = contenu;
    this.chaine = chaine;
  }
}

class ProducteurMessages {
  constructor() {
    this.listeners = {};
  }

  sAbonner(chaine, listener) {
    if (!this.listeners[chaine]) {
      this.listeners[chaine] = [];
    }
    this.listeners[chaine].push(listener);
  }

  publierMessage(message) {
    const listeners = this.listeners[message.chaine];
    if (listeners) {
      listeners.forEach(listener => {
        listener.recevoirMessage(message);
      });
    }
  }
}

class ConsommateurMessage {
  constructor(nom) {
    this.nom = nom;
  }

  recevoirMessage(message) {
    console.log(`[${this.nom}] Message reçu :`, message);
  }

  sAbonnerAChaine(producteur, chaine) {
    producteur.sAbonner(chaine, this);
  }
}

const producteurMessage = new ProducteurMessages();

const consommateur1 = new ConsommateurMessage('Utilisateur 1');
const consommateur2 = new ConsommateurMessage('Utilisateur 2');

consommateur1.sAbonnerAChaine(producteurMessage, 'actualites');
consommateur2.sAbonnerAChaine(producteurMessage, 'sport');

const message1 = new Message('Admin', 'Nouvel article publié', 'actualites');
const message2 = new Message('Admin', 'Nouveau résultat de match', 'sport');

producteurMessage.publierMessage(message1);
producteurMessage.publierMessage(message2);


function App() {
  const [commands, setCommands] = useState([]);
  const [messages, setMessages] = useState([]);
    const [subscriptions, setSubscriptions] = useState([]);

  // Mise en place du producteur-consommateur basé sur des événements
  useEffect(() => {
    const producteur = new Producteur();
    const consommateur = new Consommateur();

    producteur.addListener(consommateur);
    producteur.startProducingEvents(2000);

    const producteurCommandes = new ProducteurCommandes();
    const consommateurLivraison = new ConsommateurLivraison();
    const consommateurFacturation = new ConsommateurFacturation();

    producteurCommandes.addListener(consommateurLivraison);
    producteurCommandes.addListener(consommateurFacturation);

    const producteurMessage = new ProducteurMessages();
    const consommateur1 = new ConsommateurMessage('Utilisateur 1');
    const consommateur2 = new ConsommateurMessage('Utilisateur 2');

    consommateur1.sAbonnerAChaine(producteurMessage, 'actualites');
    consommateur2.sAbonnerAChaine(producteurMessage, 'sport');

    setSubscriptions([
      { channel: 'actualites', subscriber: 'Utilisateur 1' },
      { channel: 'sport', subscriber: 'Utilisateur 2' }
    ]);

    const message1 = new Message('Admin', 'Nouvel article publié', 'actualites');
    const message2 = new Message('Admin', 'Nouveau résultat de match', 'sport');

    producteurMessage.publierMessage(message1);
    producteurMessage.publierMessage(message2);

    return () => {
      // Nettoyage des intervalles ou des événements lors du démontage du composant si nécessaire
    };
  }, []);

  // Fonction pour ajouter une commande à la liste
  const handleCreateCommande = () => {
    const nouvelleCommandeLivraison = new Commande('livraison', 10);
    const nouvelleCommandeFacturation = new Commande('facturation', 5);

    producteurCommandes.passerCommande(nouvelleCommandeLivraison);
    producteurCommandes.passerCommande(nouvelleCommandeFacturation);

    const message = new Message('Utilisateur', 'Commande passé', 'commandes');
    producteurMessage.publierMessage(message);
    setMessages(prevMessages => [...prevMessages, message]);

    setCommands(prevCommands => [...prevCommands, nouvelleCommandeLivraison, nouvelleCommandeFacturation]);
  }

  const handleCreateMessage = () => {
    const message = new Message('Admin', 'Nouvel article publié', 'actualites');
    producteurMessage.publierMessage(message);
    setMessages(prevMessages => [...prevMessages, message]);
  }

  return (
      <div className="App">
        <h1>
          Partie 1 (voir les logs dans la console)
        </h1>

        <header className="App-header">
          <h1>Partie 2</h1>
        <div style={{display:"flex"}}>
          <div style={{border: "1px solid black", margin: 10, padding: 20}}>
            <h1>Admin</h1>
            <button onClick={handleCreateMessage}>Publier un article</button>
          </div>

          <div style={{border: "1px solid black", margin: 10, padding: 20}}>
            <h1>Utilisateurs</h1>
            <button onClick={handleCreateCommande}>Passer une commande</button>
          </div>

        </div>

          <div style={{display:"flex"}}>

          <div style={{border: "1px solid black", margin: 10, padding: 20}}>

          {/* Affichage du tableau de commandes */}
          <h2>Liste des commandes :</h2>
          <table>
            <thead>
            <tr>
              <th>Type</th>
              <th>Quantité</th>
              <th>Date</th>
            </tr>
            </thead>
            <tbody>
            {commands.map((commande, index) => (
                <tr key={index}>
                  <td>{commande.type}</td>
                  <td>{commande.quantite}</td>
                  <td>{commande.date}</td>
                </tr>
            ))}
            </tbody>
          </table>
          </div>


          <div style={{border: "1px solid black", margin: 10, padding: 20}}>

          {/* Affichage des messages */}
          <h2>Messages :</h2>
          <ul>
            {messages.map((message, index) => (
                <li key={index}>{message.auteur}: {message.contenu}</li>
            ))}
          </ul>
          </div>

          </div>
        </header>

        <h1>
          Partie 3 (voir les logs dans la console)
        </h1>
        <ThirdPart />
      </div>
  );
}
export default App
