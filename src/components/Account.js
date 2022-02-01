import axios from "axios";
import React, { useState } from "react";
import withContext from "../withContext";


const Account = props => {
  const { user } = props.context;
  const userKeys = new Map(Object.entries(user || {}));

  async function getCommands() {
    let array = []
    const getCommands = await axios.get('http://localhost:3001/commandes'),
          arrayOfCommands = getCommands.data;

    for (let index = 0; index < arrayOfCommands.length; index++) {
      if (arrayOfCommands[index].user_mail === userKeys.get('email')) {
        array.push(arrayOfCommands[index])
      }
    }
    console.log(array)
  };

  return (
    <>
      <div className="hero is-primary">
          <div className="hero-body container">
            <h4 className="title">Mon compte</h4>
          </div>
      </div>
      <br />

      <div className="column">
        <span className="title has-text-grey-light">
          {userKeys.get('email')}
        </span>
        <button onClick={() => {getCommands()}} className="button is-primary">Voir mes commandes</button>
      </div>
    </>
  )
};


export default withContext(Account);