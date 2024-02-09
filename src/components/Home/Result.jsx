/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect } from "react";
import { useContext } from "react";
import { GameContext } from "../../Context/GameContext";
import { RecoveryCard } from "../../Context/action";
import { useState } from "react";

import { toast } from "react-toastify";

import { useRef } from "react";

export const Result = ({
  formathometime,

  hometimer,
  setHomeTimer,
}) => {
  const {
    state,
    dispatch,
    usercards,
    compcard,
    setNextTurn,
    flipwondeck,
    setFlipwonDeck,
    clickcount,
    setClickCount,
    valueSelected,

    timerenable,
    recoverycarduse,
  } = useContext(GameContext);
  const { wonCards, aiwonCards } = state;

  const [recovery, setRecovery] = useState(wonCards);
  const userData =(JSON.parse( localStorage.getItem("user")))
  const userName = userData ? userData.firstName: null;


  
  const recoveryRefs = useRef([]);
  // const [check,setCheck]=useState(false)
  let clickvalue;

  useEffect(() => {
    setRecovery(wonCards);
  }, [wonCards]);

  // -------------------RECovery Card click-------------------

  const HandleCardClick = async (card, id, index) => {
    if (recoverycarduse === true) {
      toast(
        "En cas de bataille, vous ne pouvez pas utiliser la carte de récupération.",
      );

      return;
    } else {
      if (clickvalue === 1) {
        recoveryRefs.current = recoveryRefs.current.filter(
          (_, i) => i !== index,
        );

        if (!valueSelected) {
          if (flipwondeck) {
            if (clickcount > 0) {
              toast(`${userName} joué une carte prise`);
              card.id = Math.floor(Math.random() * 2000) + 34;
              dispatch(RecoveryCard(card));

              const filterwincards = recovery.filter((el) => el.id !== card.id);
              setRecovery(filterwincards);
              dispatch({ type: "woncardsfiltered", payload: filterwincards });

              if (usercards.length !== compcard) {
                setNextTurn(false);
                // setchooserecovery(false)
              }
              setClickCount((prevCount) => prevCount - 1);
            } else {
              toast("Carte de récupération utilisée trois fois seulement");
              return;
            }

            setFlipwonDeck(false);
          } else {
            toast("Vous ne pouvez sélectionner qu'une seule carte à la fois");
          }
        }
        // else {
        //   toast("sélectionnez la valeur pour continuer le jeu");
        // }
      }
    }
  };

  const cardHeight = (i) => ({
    height: `calc(100% - ${usercards.length * (1 / 2)}px)`,
    transform: `translateY(${i * 1}px)`,
  });

  const Triggered_func = () => {
    if (recoveryRefs.current.length > 0) {
      const firstDivRef = recoveryRefs.current[0];

      if (firstDivRef) {
        clickvalue = 1;
        firstDivRef.click();
      }
    }
  };

  useEffect(() => {
    // Initialize refs when the component mounts
    recoveryRefs.current = Array(recovery.length).fill(null);
  }, [recovery.length]);

  return (
    <div>
      <div className="Result_wrapper">
        <div className="container">
          <div className="row">
            <div className="Result_wrapper_user">
              <div className="row d-flex justify-content-end">
                <div className="col-sm-4">
                  <div className="user_col_1 h-100" onClick={Triggered_func}>
                    <img src="./img/12 reprise.jpg" />

                    <h3 className="m-0 mt-2">{clickcount}</h3>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div
                    className={`user_col_2 ${
                      recovery && recovery.length !== 0 ? "user_col2_card" : ""
                    }`}
                  >
                    <div className="user_col_2_inner">
                      {recovery.length !== 0 &&
                        recovery?.map((card, i) => (
                          <div
                            ref={(el) => (recoveryRefs.current[i] = el)} // Assign ref to the DOM element
                            key={card?.id}
                            style={cardHeight(i)}
                            className={`card ${
                              card?.isFlipped ? "flipped" : ""
                            }`}
                            onClick={() => {
                              HandleCardClick(card, card?.id, i);
                            }}
                          >
                            <div>
                              <div className="card-fronter">
                                <img src="./img/Image verso card.png" />
                              </div>
                            </div>
                          </div>
                        ))}

                      <h2 className="h-100 d-flex align-items-center justify-content-center m-0">
                        PLIS GAGNES
                      </h2>
                    </div>
                    <h3 className="user_col_2_h2 mt-2">{recovery.length}</h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="Result_wrapper_duration">
              <div className="Result_timmer">
                <img src="./img/timmer_icon_trim.png" />
                <input type="text" value={formathometime} readOnly />
                <div className="pts_box">
                  <button
                    className="plus_icon"
                    onClick={() => !timerenable && setHomeTimer(hometimer + 30)}
                    disabled={timerenable}
                  >
                    +
                  </button>
                  <button
                    className="minus_icon"
                    onClick={() => {
                      if (!timerenable && hometimer > 30) {
                        setHomeTimer(hometimer - 30);
                      }
                    }}
                    disabled={timerenable}
                  >
                    -
                  </button>
                </div>
              </div>
            </div>
            <div className="Result_wrapper_computer">
              <div className="row">
                <div className="col-sm-4">
                  <div className="user_col_2">
                    <div className="user_col_2_inner">
                      {aiwonCards.length !== 0 &&
                        aiwonCards?.map((card, i) => (
                          <div
                            key={card?.id}
                            style={cardHeight(i)}
                            className={`card ${
                              aiwonCards.length !== 0 && card?.isFlipped
                                ? "flipped"
                                : ""
                            }`}
                          >
                            <div>
                              <div className="card-fronter">
                                <img src="./img/Image verso card.png" />
                              </div>
                            </div>
                          </div>
                        ))}

                      <h2 className="h-100 d-flex align-items-center justify-content-center m-0">
                        PLIS GAGNES
                      </h2>
                    </div>
                    <h3 className="user_col_2_h2 mt-2">{aiwonCards.length}</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
