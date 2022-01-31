import React from "react";
import withContext from "../withContext";

const Commandes = props => {
  console.log(props)
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
            <tr>
              <th>Id commande</th>
              <th>Client</th>
              <th>Produits</th>
              <th>Quantités</th>
              <th>Adresse de livraison</th>
              <th>Montent de la commande</th>
              <th>Transporteurs</th>
              <th>État de la commande</th>
              <th>Actions</th>
            </tr>
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