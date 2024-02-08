/* eslint-disable react/style-prop-object */

import React, { useContext, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { GameContext } from "../../Context/GameContext";

export const Statistics = ({
  showModal,
  setShowModal,
  handleClose,
  Roundpercent,
  handleRestartGame,
  Roundpercentage,
  gameover,
  cardturnover,
  correctvalue,
  wrongValue,
}) => {
  const {
    state,
    flippedcardarray,
    truevaluearray,
    compflippedcardarray,
    comptruevaluearray,
    averageresponsetime,
    averageresponsetimecomp,
  } = useContext(GameContext);
  const { correctValue, wrongvalue, turnover, wonCards } = state;
  const [carddetail, setcardDetail] = useState(false);
  const userName = localStorage.getItem("username");

  // __________________USER RETURN CARD_________________

  const rightAnswers = {};
  // if(storedData !==null){

  //   const retrievedData = JSON.parse(storedData);
  truevaluearray.forEach((card) => {
    const cardName = card?.name?.toLowerCase();
    if (card.isCorrect) {
      rightAnswers[cardName] = (rightAnswers[cardName] || 0) + 1;
    }
  });
  // }

  const calculateCardCounts = () => {
    const cardCounts = {};
    flippedcardarray.forEach((card) => {
      const cardName = card?.name?.toLowerCase();
      cardCounts[cardName] = (cardCounts[cardName] || 0) + 1;
    });
    return cardCounts;
  };

  const cardCounts = calculateCardCounts();

  // ________________COMP RETURN CARD_______________________

  const rightAnswersComp = {};

  comptruevaluearray.forEach((card) => {
    const cardName = card?.name?.toLowerCase();
    if (card?.isCorrect) {
      rightAnswersComp[cardName] = (rightAnswersComp[cardName] || 0) + 1;
    }
  });

  const calculateCardCountsComp = () => {
    const cardCounts = {};
    compflippedcardarray.forEach((card) => {
      const cardName = card?.name?.toLowerCase();
      cardCounts[cardName] = (cardCounts[cardName] || 0) + 1;
    });
    return cardCounts;
  };

  const cardCountsComp = calculateCardCountsComp();

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
              <button
                onClick={() => {
                  setcardDetail(true);
                  setShowModal(false);
                }}
              >
                Details par carte
              </button>
            </div>
            <div className="fermer" style={{ textAlign: "right" }}>
              <button onClick={handleClose}>Fermer</button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* _____________________________ALL CARD STAT_________________________________ */}

      <Modal show={carddetail} className="all_card_stat">
        <Modal.Header>
          <Modal.Title>STATISTIQUES DE TOUTES LES CARTES </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            className="wrap_stat carties_table "
            style={{ overflowX: "auto", display: "flex" }}
          >
            <table className="table table-striped">
              <thead>
                <h4>{userName}</h4>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">VALUE</th>
                  <th scope="row" style={{ textAlign: "center" }}>
                    NOMBRE DE FOIS RETOURNÉS
                  </th>
                  <th scope="row" style={{ textAlign: "center" }}>
                    NOMBRE DE BONNES RÉPONSES
                  </th>
                  <th scope="row" style={{ textAlign: "center" }}>
                    TEMPS DE RÉPONSE MOYEN
                  </th>
                  <th scope="row" style={{ textAlign: "center" }}>
                    TAUX %
                  </th>
                </tr>

                {Object.keys(cardCounts).map((cardName) => {
                  const timesReturned = cardCounts[cardName];
                  const rightAnswerCount = rightAnswers[cardName] || 0;
                  const ratePercentage =
                    (rightAnswerCount / timesReturned) * 100 || 0;
                  const averageData = averageresponsetime[cardName] || {
                    sum: 0,
                    count: 0,
                    average: 0,
                  };

                  return (
                    <tr key={cardName}>
                      <th scope="row">{cardName}</th>
                      <td style={{ textAlign: "center" }}>{timesReturned}</td>
                      <td style={{ textAlign: "center" }}>
                        {rightAnswerCount}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {(averageData.average / 1000).toFixed(2)}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {ratePercentage.toFixed(0)}%
                      </td>
                    </tr>
                  );
                })}

                <tr>
                  <th scope="row">Total :</th>
                  <td style={{ textAlign: "center" }}>
                    {Object.values(cardCounts).reduce(
                      (acc, count) => acc + count,
                      0,
                    )}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {Object.values(rightAnswers).reduce(
                      (acc, count) => acc + count,
                      0,
                    )}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {(
                      Object.values(averageresponsetime).reduce(
                        (acc, data) => acc + data.average,
                        0,
                      ) / 1000
                    ).toFixed(2)}
                  </td>

                  <td style={{ textAlign: "center" }}>
                    {Math.round(
                      (Object.values(rightAnswers).reduce(
                        (acc, count) => acc + count,
                        0,
                      ) /
                        Object.values(cardCounts).reduce(
                          (acc, count) => acc + count,
                          0,
                        )) *
                        100,
                    ) || 0}
                    %
                  </td>
                </tr>
              </tbody>
            </table>

            <table className="table table-striped">
              <thead>
                <h4>Ordinateur</h4>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">VALUE</th>
                  <th scope="row" style={{ textAlign: "center" }}>
                    NOMBRE DE FOIS RETOURNÉS
                  </th>
                  <th scope="row" style={{ textAlign: "center" }}>
                    NOMBRE DE BONNES RÉPONSES
                  </th>
                  <th scope="row" style={{ textAlign: "center" }}>
                    TEMPS DE RÉPONSE MOYEN
                  </th>
                  <th scope="row" style={{ textAlign: "center" }}>
                    TAUX %
                  </th>
                </tr>

                {Object.keys(cardCountsComp).map((cardName) => {
                  const timesReturned = cardCountsComp[cardName];
                  const rightAnswerCount = rightAnswersComp[cardName] || 0;
                  const ratePercentage =
                    (rightAnswerCount / timesReturned) * 100 || 0;
                  const averageDataComp = averageresponsetimecomp[cardName] || {
                    sum: 0,
                    count: 0,
                    average: 0,
                  };

                  return (
                    <tr key={cardName}>
                      <th scope="row">{cardName}</th>
                      <td style={{ textAlign: "center" }}>{timesReturned}</td>
                      <td style={{ textAlign: "center" }}>
                        {rightAnswerCount}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {(averageDataComp.average / 1000).toFixed(2)}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {ratePercentage.toFixed(0)}%
                      </td>
                    </tr>
                  );
                })}

                <tr>
                  <th scope="row">Total :</th>
                  <td style={{ textAlign: "center" }}>
                    {Object.values(cardCountsComp).reduce(
                      (acc, count) => acc + count,
                      0,
                    )}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {Object.values(rightAnswersComp).reduce(
                      (acc, count) => acc + count,
                      0,
                    )}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {(
                      Object.values(averageresponsetimecomp).reduce(
                        (acc, data) => acc + data.average,
                        0,
                      ) / 1000
                    ).toFixed(2)}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    {Math.round(
                      (Object.values(rightAnswersComp).reduce(
                        (acc, count) => acc + count,
                        0,
                      ) /
                        Object.values(cardCountsComp).reduce(
                          (acc, count) => acc + count,
                          0,
                        )) *
                        100,
                    ) || 0}
                    %
                  </td>
                </tr>
              </tbody>
            </table>
            <div></div>
            <div className="fermer" style={{ textAlign: "right" }}>
              <button
                onClick={() => {
                  setcardDetail(false);
                  setShowModal(true);
                }}
              >
                Fermer
              </button>
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
                  <td>{cardturnover}</td>
                </tr>
                <tr>
                  <th style={{ minWidth: "115px" }}>Réponses correctes</th>
                  <td>{correctvalue}</td>
                </tr>
                <tr>
                  <th scope="row">Mauvaises REPONSES</th>
                  <td>{wrongValue}</td>
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
