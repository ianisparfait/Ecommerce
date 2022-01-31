import React from "react";
import withContext from "../withContext";

const Commandes = props => {
  const { commandes } = props.context;
  const commandesKeys = Object.keys(commandes || {});
  console.log(commandes, commandesKeys)
  return (
    <>
      <div className="hero is-primary">
        <div className="hero-body container">
          <h4 className="title">Les commandes</h4>
        </div>
      </div>
      <br />
      <div className="container">
        <table className="table is-bordered is-striped" style={{textAlign: "center"}}>
          <thead>
            {commandes.map(c => {
              return (
                <tr>
                  <td>{c.transaction_id}</td>
                  <td><button className="button is-primary">Afficher le détail</button></td>
                </tr>
              )
            })}
          </thead>
          <tbody>
            <tr>
              <td>05</td>
              <td>05</td>
              <td>05</td>
              <td>05</td>
              <td>05</td>
              <td>05</td>
              <td>05</td>
              <td>05</td>
              <td><button className="button is-primary">Afficher le détail</button></td>
            </tr>
            <tr>
              <td>05</td>
              <td>05</td>
              <td>05</td>
              <td>05</td>
              <td>05</td>
              <td>05</td>
              <td>05</td>
              <td>05</td>
              <td><button className="button is-primary">Afficher le détail</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
};

export default withContext(Commandes);