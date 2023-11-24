import React from "react";
import Deck from "../Deck";
import { Computer } from "../Computer";
import { GameContext } from "../../Context/GameContext";
import { useContext } from "react";

export const UserComputer = () => {
  const { state } = useContext(GameContext);
  const { userCardimg, loading, AIimg } = state;
  // console.log(state)
  return (
    <div className="col-md-8">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="row">
            <div className="col-6">
              <Deck />
            </div>

            {/* <div className="col-6">
              <div className="userComputer_cards">
                <div className="userComputer_cards_inner">
                  <img
                    className={`${
                      userCardimg ? "card_available" : "card_available_2"
                    }`}
                    style={{
                      transform: `${
                        userCardimg ? "translateX(0)" : "translateX(-100%)"
                      }`,
                    }}
                    src={userCardimg}
                  />
                  <p
                    className={`${
                      !userCardimg ? "text_avalbl" : "card_text_unavailable"
                    }`}
                  >
                    Retourner la carte
                  </p>
                </div>
              </div>
            </div> */}
          </div>
        </div>
        {/* <div className="col-md-1" /> */}
        <div className="col-md-6 ">
          <div className="row justify-content-end">
            {/* <div className="col-6">
              {loading ? (
                <div
                  className="front_card_text"
                  style={{
                    width: "100%",
                    border: "3px solid",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    fontSize: "17px",
                    fontWeight: "bold",
                  }}
                >
                  Tour d'ordinateur
                </div>
              ) : !AIimg ? (
                <div
                  className="front_card_text"
                  style={{
                    width: "100%",
                    border: "3px solid",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    fontSize: "17px",
                    fontWeight: "bold",
                  }}
                >
                  Ordinateur
                </div>
              ) : (
                <span className="face front"><img src={AIimg}/></span>
              )}
            </div> */}
            <div className="col-6">
              <Computer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
