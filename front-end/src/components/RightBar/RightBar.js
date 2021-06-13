import React, { Component, useContext, useState } from 'react';
import UserContext from '../../contexts/UserContext';

const RightBar = () => {
    const userContextData = useContext(UserContext);
    const [namee, setName] = useState('');
    const handleToModifyContextName = (e) => {
        setName(e.target.value);
        userContextData.setUserObject((prevState) => {
            return {
                ...prevState,
                name:e.target.value
            }
        });
    }
    return (
        <div>
            Name: {userContextData.isLogged && userContextData.user.name}
            <input type='text' value={namee} onChange={handleToModifyContextName} />
        </div>
    );
}

export default RightBar;