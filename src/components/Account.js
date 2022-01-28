import React from "react";
import withContext from "../withContext";


const Account = props => {
  const { user } = props.context;
  const userKeys = new Map(Object.entries(user || {}));

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
      </div>
    </>
  )
};


export default withContext(Account);