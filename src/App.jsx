import React, { useState, useEffect } from 'react';
import Parse from 'parse';
import Components from "./Components/Components";


import Navbar from './Components/Navigation/Navbar'; // Importing the NavBar

const Env = {
  APPLICATION_ID: "TqxNU8zQD14G5gx5IQHU30qe0gTBEFwDdciKG85C",
  JAVASCRIPT_KEY: "tgvd2ClphJz4GwVy7mANMrvE50uhE9oZN2kmAboP",
  SERVER_URL: "https://parseapi.back4app.com/"
}

Parse.initialize(Env.APPLICATION_ID, Env.JAVASCRIPT_KEY);
Parse.serverURL = Env.SERVER_URL;

function App() {
  
  return (
    <Components/>
  );
}

export default App;

