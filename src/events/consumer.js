import { eventManager } from './EventManager';

// Consommateur
const handleEvent = (event) => {
    console.log('Received event:', event);
};



export function handleCommande(commande) {
    console.log("Commande reçue:")
    if (commande.type === 'livraison') {
        console.log('Traitement de la commande de livraison:', commande);
    } else if (commande.type === 'facturation') {
        console.log('Traitement de la commande de facturation:', commande);
    }
}

eventManager.subscribe('commande', handleCommande);

eventManager.subscribe('event', handleEvent);
