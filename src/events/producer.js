import { eventManager } from './EventManager';
import { Evenement } from '../models/Evenement';
import {Commande} from "../models/commande";

export function createCommande(type, quantite) {
    const commande = new Commande(type, quantite);
    eventManager.emit('commande', commande);
}

