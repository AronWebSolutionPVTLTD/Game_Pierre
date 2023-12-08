import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { ModalBody } from "react-bootstrap";
import { useContext } from "react";
import { GameContext } from "../Context/GameContext";
import { IoCloseCircle } from "react-icons/io5";
import {
  CorrectValue,
  Flipped,
  GameOver,
  MainValueSelected,
  Shuffled,
  TurnOver,
  WrongValue,
} from "../Context/action";
import { Points } from "./Home/Points";
import { TrainingGameOver, GamePopUpModal } from "./Home/GameModals";
import { toast } from "react-toastify";
import {  motion } from "framer-motion";
function Training() {
  const { state, dispatch, timerenable, setTimerEnable, color, setColor } =
    useContext(GameContext);
  const {
    cardFlipped,
    mainvalueselect,
    shuffle,
    gameOver,
    correctValue,
    wrongvalue,
    turnover,
  } = state;

  const [cards, setCards] = useState(state.cards);
  const [img, setImg] = useState("");
  const [checkValue, setCheckValue] = useState("");
  const [flip, setflip] = useState(true);
  const [flipcardValue, setFlipCardValue] = useState();
  const [valuePopUp, setValuePopUp] = useState(false);
  const [correctvalue, setCorrectValue] = useState(false);
  const pointwin = new Audio("point added.wav");
  const lost = new Audio("lost 1 point.wav");

  const TrainingTimer = JSON.parse(localStorage.getItem("timer"));
  const [timer, setTimer] = useState();

  useEffect(() => {
    TrainingTimer ? setTimer(TrainingTimer) : setTimer(120);
  }, [TrainingTimer]);

  // console.log(cards, "card");

  useEffect(() => {
    if (cards.length == 0) setCards(state.cards);
  }, [shuffle, state.cards, cards]);

  // _______________________Timer functionality________________________

  useEffect(() => {
    if (timer === 0) {
      dispatch(Flipped(false));
      dispatch(GameOver(true));
      setTimerEnable(false);
      return;
    }
    if (!cardFlipped) {
      return;
    } else {
      const interval = setInterval(() => {
        setTimer((prevValue) => {
          const newValue = prevValue - 1;

          if (newValue === 0) {
            clearInterval(interval);
          }

          return newValue;
        });
      }, 1000);
      return () => {
        clearInterval(interval);
      };
    }
  }, [timer, cardFlipped]);

  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;
  const Formattime = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;

  // ----------------------------flip card----------------------

  const flipCard = (id, val) => {
    if (flip) {
      dispatch(TurnOver());
      setFlipCardValue(val);
      dispatch(MainValueSelected(true));
      dispatch(Flipped(true));
      setTimerEnable(true);

      const updatedCards = cards.map((card) => {
        if (card.id === id) {
          setImg(card.img);

          return { ...card, isFlipped: true };
        } else {
          return { ...card, isFlipped: false };
        }
      });

      const getFalse = updatedCards.filter((el) => el.isFlipped == false);

      setCards(getFalse);
      setflip(false);
    } else {
      toast("Sélectionnez la valeur pour continuer le jeu");
    }
  };

  // -----------------------------------True value--------------------

  const handleClick = (val) => {
    setCheckValue(val);

    if (mainvalueselect) {
      if (val === flipcardValue) {
        setColor("1");
        pointwin.play();
        dispatch(CorrectValue());
      } else {
        dispatch(WrongValue());
        setColor("2");
        lost.play();
        setTimeout(() => {
          setCorrectValue(true);
        }, 800);
      }

      setTimeout(() => {
        setColor("");
        setflip(true);
      }, 2000);
      dispatch(MainValueSelected(false));
    } else {
      setValuePopUp(true);
    }
  };
  const handleRestartGame = () => {
    dispatch(GameOver(false));
    setTimer(120);
    dispatch(Shuffled(!shuffle));
    setImg("");
  };

  useEffect(() => {
    setTimeout(() => {
      setCorrectValue(false);
    }, 1500);
  }, [correctvalue]);

  const handleValuePop = () => {
    setValuePopUp(false);
  };

  const cardHeight = (i) => ({
    height: `calc(100% - ${cards.length * (1 / 2)}px)`,
    transform: `translateY(${i * 1}px)`,
  });

  const calculationstat = (correctValue / turnover) * 100;
  const Roundpercent = Math.round(calculationstat);
  return (
    <>
      <div className="fliped_cards">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="outer-div">
                <>
                  {cards.length !== 0 &&
                    cards.map((card, i) => (
                      <div
                        key={card.id}
                        style={cardHeight(i)}
                        className={`card ${card.isFlipped ? "flipped" : ""}`}
                        onClick={() => flipCard(card.id, card.value)}
                      >
                        <div>
                          <div className="card-front">
                            <img src="./img/Image verso card.png" />
                          </div>
                        </div>
                      </div>
                    ))}
                </>

                <>
                  {cards.length == 0 && (
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
                      <p>NO MORE CARDS LEFT</p>
                    </div>
                  )}
                </>
              </div>
            </div>
            <div className="col-md-6">
              {img ? <img className="bordered" src={img} /> : ""}
            </div>
          </div>
        </div>
      </div>


          {/* --------------------------------true value pop up________________________ */}
     

          {correctvalue && (
            <motion.div
              className="truevalue"
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <p>La valeur correcte est </p>
              {flipcardValue !== "Joker" ? (
                <h2 className="fs-1">{flipcardValue}</h2>
              ) : (
                <img
                  style={{ width: "150px", height: "150px" }}
                  src="img/11 point d_orgue.jpg"
                />
              )}
            </motion.div>
          )}

      <Points color={color} checkValue={checkValue} handleClick={handleClick} />
      <div className="Result_wrapper_outer">
        <div className="Result_wrapper">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <div className="Result_wrapper_duration">
                  <p>
                    <div className="Result_timmer">
                      <img src="./img/timmer_icon_trim.png" />

                      <input type="text" value={Formattime} readOnly />
                      <div className="pts_box">
                        <button
                          className="plus_icon"
                          onClick={() => !timerenable && setTimer(timer + 30)}
                          disabled={timerenable}
                        >
                          +
                        </button>
                        <button
                          className="minus_icon"
                          onClick={() => {
                            if (!timerenable && timer > 30) {
                              setTimer(timer - 30);
                            }
                          }}
                          disabled={timerenable}
                        >
                          -
                        </button>
                      </div>
                    </div>
                  </p>
                </div>
              </div>

              <div className="col-md-6">
                <div className="Result_wrapper_duration_stat">
                  <div>
                    <p> {turnover} cartes retournées</p>
                    <p>{correctValue} bonnes réponses</p>
                    <p>{wrongvalue} Mauvaises réponses</p>
                    <p>
                      {Roundpercent ? Roundpercent : 0}% Pourcentage de réussite
                    </p>
                  </div>
                </div>
              </div>
              {/* <div class="bottom_btn">
                <button class="bottom_btn">Statistices</button>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      <TrainingGameOver
        gameOver={gameOver}
        handleRestartGame={handleRestartGame}
      />


      {/* -------SELECT CARD FIRST POP UP__________________ */}
      <GamePopUpModal handleValuePop={handleValuePop} valuePopUp={valuePopUp} />
    </>
  );
}
export default Training;
