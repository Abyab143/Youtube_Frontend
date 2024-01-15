import React, { useState } from "react";
import Context from "./AuthContext";

const State = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [user, setuser] = useState([]);
  const[close,setclose] = useState(true);

  return (
    <Context.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        username,
        setUsername,
        user,
        setuser,
        close,
        setclose,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default State;
