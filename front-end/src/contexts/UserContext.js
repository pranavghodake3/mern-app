import React, {useState} from 'react';

const UserContext = React.createContext(null);

export const UserContextProvider = (props) => {

    const [userObject, setUserObject] = useState(null);

    const contextValue = {
        isLogged: userObject == null ? false : true,
        user: userObject,
        setUserObject: setUserObject
    }



    return (
     <UserContext.Provider value={contextValue}>
         {props.children}
     </UserContext.Provider>   
    )
}

export default UserContext;