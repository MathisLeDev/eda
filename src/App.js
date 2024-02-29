// TODO: Mise en place d'un Producteur-Consommateur basé sur des Événements
// Étape 1 : Création de la classe Evenement
class Evenement {
  constructor(type, payload) {
    this.type = type; // Type d'événement
    this.payload = payload; // Données associées à l'événement
  }
}

// Étape 2 : Implémentation du producteur
class Producteur {
  constructor() {
    this.listeners = []; // Liste des écouteurs d'événements
  }

  // Méthode pour ajouter un écouteur
  addListener(listener) {
    this.listeners.push(listener);
  }

  // Méthode pour générer un événement à intervalles réguliers
  startProducingEvents(interval) {
    setInterval(() => {
      const evenement = new Evenement('type_evenement', 'données_associées');
      this.listeners.forEach(listener => {
        listener.handleEvent(evenement);
      });
    }, interval);
  }
}

// Étape 3 : Implémentation du consommateur
class Consommateur {
  // Méthode pour réagir à un événement
  handleEvent(evenement) {
    console.log('Événement reçu :', evenement);
    // Réagir en conséquence à l'événement
  }
}

// Étape 4 : Test en lançant le producteur et observant les réactions du consommateur
const producteur = new Producteur();
const consommateur = new Consommateur();

// Ajout du consommateur comme écouteur du producteur
producteur.addListener(consommateur);

// Démarrage de la génération d'événements toutes les 2 secondes
producteur.startProducingEvents(2000);


// TODO: Système de Commandes en Temps Réel

// Étape 1 : Définition de la classe Commande
class Commande {
  constructor(type, quantite) {
    this.type = type; // Type de commande
    this.quantite = quantite; // Quantité de la commande
  }
}

// Étape 2 : Création du producteur de commandes
class ProducteurCommandes {
  constructor() {
    this.listeners = []; // Liste des écouteurs d'événements
  }

  // Méthode pour ajouter un écouteur
  addListener(listener) {
    this.listeners.push(listener);
  }

  // Méthode pour générer un événement lorsqu'une nouvelle commande est passée
  passerCommande(commande) {
    this.listeners.forEach(listener => {
      listener.handleCommande(commande);
    });
  }
}

// Étape 3 : Implémentation des consommateurs pour différents types de commandes
class ConsommateurLivraison {
  handleCommande(commande) {
    if (commande.type === 'livraison') {
      console.log('Traitement de la commande de livraison :', commande);
      // Réaliser le traitement approprié pour une commande de livraison
    }
  }
}

class ConsommateurFacturation {
  handleCommande(commande) {
    if (commande.type === 'facturation') {
      console.log('Traitement de la commande de facturation :', commande);
      // Réaliser le traitement approprié pour une commande de facturation
    }
  }
}

// Étape 4 : Test en passant de nouvelles commandes et observation des réactions des consommateurs
const producteurCommandes = new ProducteurCommandes();
const consommateurLivraison = new ConsommateurLivraison();
const consommateurFacturation = new ConsommateurFacturation();

// Ajout des consommateurs comme écouteurs du producteur de commandes
producteurCommandes.addListener(consommateurLivraison);
producteurCommandes.addListener(consommateurFacturation);

// Passer une nouvelle commande
const nouvelleCommandeLivraison = new Commande('livraison', 10);
const nouvelleCommandeFacturation = new Commande('facturation', 5);

// Traitement des nouvelles commandes
producteurCommandes.passerCommande(nouvelleCommandeLivraison);
producteurCommandes.passerCommande(nouvelleCommandeFacturation);

// TODO: Système de Messagerie Pub/Sub

// Étape 1 : Définition de la classe Message
class Message {
  constructor(auteur, contenu, chaine) {
    this.auteur = auteur; // Auteur du message
    this.contenu = contenu; // Contenu du message
    this.chaine = chaine; // Chaîne sur laquelle le message est publié
  }
}

// Étape 2 : Implémentation du producteur de messages
class ProducteurMessages {
  constructor() {
    this.listeners = {}; // Tableau associatif des écouteurs par chaîne
  }

  // Méthode pour s'abonner à une chaîne
  sAbonner(chaine, listener) {
    if (!this.listeners[chaine]) {
      this.listeners[chaine] = [];
    }
    this.listeners[chaine].push(listener);
  }

  // Méthode pour publier un message sur une chaîne spécifique
  publierMessage(message) {
    const listeners = this.listeners[message.chaine];
    if (listeners) {
      listeners.forEach(listener => {
        listener.recevoirMessage(message);
      });
    }
  }
}

// Étape 3 : Implémentation des consommateurs
class ConsommateurMessage {
  constructor(nom) {
    this.nom = nom; // Nom du consommateur
  }

  // Méthode pour recevoir un message publié sur une chaîne
  recevoirMessage(message) {
    console.log(`[${this.nom}] Message reçu :`, message);
  }

  // Méthode pour s'abonner à une chaîne
  sAbonnerAChaine(producteur, chaine) {
    producteur.sAbonner(chaine, this);
  }
}

// Étape 4 : Test en publiant des messages sur différentes chaînes et observation des réactions des consommateurs
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


  return (
    <div className="App">
      <header className="App-header">
        <h1>Test</h1>
      </header>
    </div>
  );
}
export default App
