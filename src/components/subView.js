// SubscriptionView.js

import React from 'react';

function SubscriptionView({ channels }) {
    return (
        <div className="subscription-view">
            <h2>Abonnements</h2>
            <ul>
                {channels.map(channel => (
                    <li key={channel.id}>{channel.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default SubscriptionView;
