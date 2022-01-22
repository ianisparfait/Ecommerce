import React from "react";
import withContext from "../withContext";


const Account = props => {
  // const { email } = props.context;
  return(
    <>
    <div className="hero is-primary">
        <div className="hero-body container">
          <h4 className="title">Mon compte</h4>
        </div>
      </div>
      <br />

      <div className="column">
        <span className="title has-text-grey-light">
          {props.context.getUser}
        </span>
      </div>
    </>
  )
};


export default withContext(Account);