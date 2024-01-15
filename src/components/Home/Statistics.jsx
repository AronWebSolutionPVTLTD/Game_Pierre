/* eslint-disable react/style-prop-object */

import React, { useContext, useState } from "react";
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
  const { state, flippedcardarray ,truevaluearray} = useContext(GameContext);
  const {correctValue, wrongvalue, turnover,  wonCards } =state;
const [carddetail,setcardDetail]=useState(false)

// let storedData = localStorage.getItem("truevalueCard");



const rightAnswers = {}; 
// if(storedData !==null){

//   const retrievedData = JSON.parse(storedData);
  truevaluearray.forEach(card => {
    const cardName = card.name.toLowerCase();
    if (card.isCorrect) {
      rightAnswers[cardName] = (rightAnswers[cardName] || 0) + 1;
    }
  });
// }

const calculateCardCounts = () => {
  const cardCounts = {};
  flippedcardarray.forEach(card => {
    const cardName = card.name.toLowerCase();
    cardCounts[cardName] = (cardCounts[cardName] || 0) + 1;
  });
  return cardCounts;
};

const cardCounts = calculateCardCounts();

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

  <button onClick={()=>setcardDetail(true)}>Details par carte</button>
</div>
                <div className="fermer" style={{ textAlign: "right" }}>
                  <button onClick={handleClose}>Fermer</button>
                </div>
          </div>
        </Modal.Body>
      </Modal>


{/* _____________________________ALL CARD STAT_________________________________ */}

      <Modal show={carddetail}>
        <Modal.Header>
          <Modal.Title>STATISTIQUES DE TOUTES LES CARTES </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="wrap_stat" style={{ overflowX: "auto" }}>
            <table className="table table-striped">
     
  {/* <tbody>
  <tr>
    <th scope="row">VALUE</th>
    <th scope="row"  style={{ textAlign: 'center' }}>NUMBER OF TIMES RETURNED</th>
  </tr>
  <tr>
    <th scope="row">Ronde</th>
    <td style={{ textAlign: 'center' }}>1</td>
  </tr>
  <tr>
    <th scope="row">Blanche pointee</th>
    <td style={{ textAlign: 'center' }}>2</td>
  </tr>
  <tr>
    <th scope="row">Blanche</th>
    <td style={{ textAlign: 'center' }}>3</td>
  </tr>
  <tr>
    <th scope="row">Noire</th>
    <td style={{ textAlign: 'center' }}>5</td>
  </tr>
  <tr>
    <th scope="row">Croche</th>
    <td style={{ textAlign: 'center' }}>6</td>
  </tr>
  <tr>
    <th scope="row">Double-croche</th>
    <td style={{ textAlign: 'center' }}>2</td>
  </tr>
</tbody> */}
  <tbody>
              <tr>
                <th scope="row">VALUE</th>
                <th scope="row" style={{ textAlign: 'center' }}>NUMBER OF TIMES RETURNED</th>
                <th scope="row" style={{ textAlign: 'center' }}>NUMBER OF RIGHT ANSWERS</th>
                <th scope="row" style={{ textAlign: 'center' }}>RATE %</th>
              </tr>
              {/* {Object.keys(cardCounts).map(cardName => (
                <tr key={cardName}>
                  <th scope="row">{cardName}</th>
                  <td style={{ textAlign: 'center' }}>{cardCounts[cardName]}</td>
                  <td style={{ textAlign: 'center' }}>{rightAnswers[cardName] || 0}</td>
                  <td style={{ textAlign: 'center' }}>0 %</td>
                </tr>
              ))} */}
               {Object.keys(cardCounts).map(cardName => {
            const timesReturned = cardCounts[cardName];
            const rightAnswerCount = rightAnswers[cardName] || 0;
            const ratePercentage = (rightAnswerCount / timesReturned) * 100 || 0;

            return (
              <tr key={cardName}>
                <th scope="row">{cardName}</th>
                <td style={{ textAlign: 'center' }}>{timesReturned}</td>
                <td style={{ textAlign: 'center' }}>{rightAnswerCount}</td>
                <td style={{ textAlign: 'center' }}>{ratePercentage.toFixed(2)}%</td>
              </tr>
            );
          })}
            </tbody>

            </table>
            <div>

</div>
                <div className="fermer" style={{ textAlign: "right" }}>
                  <button onClick={()=>setcardDetail(false)}>Fermer</button>
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
