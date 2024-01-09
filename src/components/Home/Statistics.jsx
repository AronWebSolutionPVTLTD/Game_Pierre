import { calculateNewValue } from "@testing-library/user-event/dist/utils";
import React, { useContext } from "react";
import Modal from "react-bootstrap/Modal";
import { GameContext } from "../../Context/GameContext";

export const Statistics = ({
  showModal,
  handleClose,
  Roundpercent,
  handleRestartGame,
  Roundpercentage,
  gameover,
}) => {
  const { state } = useContext(GameContext);
  const { gameOver, correctValue, wrongvalue, turnover, cardcount, wonCards } =
    state;

  return (
    <div>
      <Modal show={showModal}>
        <Modal.Header>
          <Modal.Title>STATISTIQUES</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="wrap_stat" style={{ overflowX: "auto" }}>
            <table className="table table-striped">
     
              <tbody>
                <tr>
                  <th scope="row">Cartes retournées</th>
                  <td>{turnover}</td>
                </tr>
                <tr>
                  <th scope="row">Bonnes réponses</th>
                  <td>{correctValue}</td>
                </tr>
                <tr>
                  <th scope="row">Mauvaises réponses</th>
                  <td>{wrongvalue}</td>
                </tr>

               
                <tr>
                  <th scope="row">Taux de réussite</th>
                  <td>{Roundpercentage}%</td>
                </tr>
                <tr>
                  <th scope="row">Total cartes gagnées</th>
                  <td>{wonCards.length}</td>
                </tr>



              </tbody>
            </table>
            <div>

  <button>Details par carte</button>
</div>
                <div className="fermer" style={{ textAlign: "right" }}>
                  <button onClick={handleClose}>Fermer</button>
                </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* _________________________Evaluation Statistics------------------------- */}

      <Modal show={gameover}>
        <Modal.Header>
          <Modal.Title>
            <h2>Jeu terminé !!!</h2>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ overflowX: "auto" }}>
            <table className="table table-striped">
              <thead>STATISTIQUES</thead>
              <tbody>
                <tr>
                  <th scope="row">Carte retournée</th>
                  <td>{turnover}</td>
                </tr>
                <tr>
                  <th style={{ minWidth: "115px" }}>Réponses correctes</th>
                  <td>{correctValue}</td>
                </tr>
                <tr>
                  <th scope="row">Mauvaises REPONSES</th>
                  <td>{wrongvalue}</td>
                </tr>

                <tr>
                  <th scope="row">Pourcentage de réussite TAUX %</th>
                  <td>{Roundpercent}%</td>
                </tr>
              </tbody>
            </table>
            <div style={{ textAlign: "right" }}>
              <button onClick={handleRestartGame}>Redémarrez le jeu</button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};
