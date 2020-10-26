import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import { db } from "./firebase";

import "./App.scss";

import Adresar from "./pages/adresar/Adresar";
import Kontakt from "./pages/kontakt/Kontakt";
import Login from "./pages/login/Login";
import KontaktDetalji from "./pages/kontaktDetalji/KontaktDetalji.jsx";
import NotFound from "./pages/notFound/NotFound";

const App = (props) => {
  const [input, setInput] = useState({
    dateOfBirth: "",
    name: "",
    contact: "",
    favourite: false,
    surname: "",
    typeContact: "mobile",
  });

  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    db.collection("adresar").onSnapshot((snapshot) => {
      setContacts(snapshot.docs.map((doc) => ({ person: doc.data(), id: doc.id })));
    });
  }, []);

  const handleChange = (event) => {
    const { value, name } = event.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/adresar" render={() => <Adresar contacts={contacts} />} />
        <Route
          path="/kontakt/:id"
          render={() => <KontaktDetalji contacts={contacts} setContacts={setContacts} />}
        />
        <Route exact path="/adresar/omiljeni" render={() => <Adresar contacts={contacts} />} />
        <Route
          path="/kontakt"
          exact
          render={() => (
            <Kontakt
              input={input}
              contacts={contacts}
              setContacts={setContacts}
              handleChange={handleChange}
              setInput={setInput}
            />
          )}
        />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
};

export default App;
