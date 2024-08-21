import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';

function App() {
    const [isRegistering, setIsRegistering] = useState(false);

    return (
        <div className="App">
            {isRegistering ? (
                <Register onSwitchToLogin={() => setIsRegistering(false)} />
            ) : (
                <Login onSwitchToRegister={() => setIsRegistering(true)} />
            )}
        </div>
    );
}

export default App;
