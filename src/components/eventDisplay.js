// EventDisplay.js

import React from 'react';

function EventDisplay({ events }) {
    return (
        <div className="event-display">
            <h2>Événements</h2>
            <ul>
                {events.map(event => (
                    <li key={event.id}>{event.content}</li>
                ))}
            </ul>
        </div>
    );
}

export default EventDisplay;

