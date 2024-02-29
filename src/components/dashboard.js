// Dashboard.js

import React from 'react';

function Dashboard({ channels, onSubscribe, onUnsubscribe }) {
    return (
        <div className="dashboard">
            <h2>Dashboard</h2>
            <ul>
                {channels.map(channel => (
                    <li key={channel.id}>
                        {channel.name}
                        <button onClick={() => onSubscribe(channel.id)}>S'abonner</button>
                        <button onClick={() => onUnsubscribe(channel.id)}>Se désabonner</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Dashboard;
