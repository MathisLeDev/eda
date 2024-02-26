export class EventManager {
    constructor() {
        this.events = {};
    }

    subscribe(eventName, fn) {
        console.log('Subscribed to event:', eventName, fn)
        if (!this.events[eventName]) {
            this.events[eventName] = [];
        }
        this.events[eventName].push(fn);
    }

    unsubscribe(eventName, fn) {
        if (this.events[eventName]) {
            this.events[eventName] = this.events[eventName].filter(func => func !== fn);
        }
    }

    emit(eventName, data) {
        console.log('Event emitted:', eventName, data);

        if (this.events[eventName]) {
            this.events[eventName].forEach(fn => fn(data));
        }
    }
}

export const eventManager = new EventManager();
