import { useEffect } from "react";
import { useState } from "react";
import { Points } from "./Home/Points";
import { EvaluationSelectCard } from "./Home/GameModals";
import { useContext } from "react";
import { GameContext } from "../Context/GameContext";
import { Shuffled } from "../Context/action";
import { Statistics } from "./Home/Statistics";
import "../main component/toaster.css";
import { toast } from "react-toastify";


export default function Evaluation() {
  const { state, dispatch, rhythm } = useContext(GameContext);
  const { shuffle } = state;
  const [cards, setCards] = useState(state.cards);
  const [gameover, setGameOver] = useState(false);
  const [check, setCheck] = useState(false);
  const [img, setImg] = useState("");
  const [checkValue, setCheckValue] = useState("");
  const [color, setColor] = useState("");
  const [flipcardValue, setFlipCardValue] = useState();
  const [mainValue, setMainValue] = useState(false);
  const [valuePopUp, setValuePopUp] = useState(false);
  const [flip, setFlip] = useState(true);
  const Time = JSON.parse(localStorage.getItem("timer"));
  const [evaluationtimer, setEvaluationTimer] = useState(120);
 const [starttime, setStartTimer] = useState(false);
  const [cardturnover, setCardTurnOver] = useState(0);
  const [correctvalue, setCorrectvalue] = useState(0);
  const [wrongValue, setWrongValue] = useState(0);
  const [timerenable, setTimerEnable] = useState(false);

  let pointwin, lost;

  if (rhythm === "yes") {
    pointwin = new Audio("point added.wav");
    lost = new Audio("lost 1 point.wav");
  }

  useEffect(() => {
    Time ? setEvaluationTimer(Time) : setEvaluationTimer(120);
  }, [Time]);

  useEffect(() => {
    if (cards.length === 0) {
      setCards(state.cards);
   
    }
  }, [shuffle, state.cards, cards]);

  // -----Calculate percentege-------------------

  const calculationstat = (correctvalue / cardturnover) * 100;
  const Roundpercent = Math.round(calculationstat);

  // Timer functionality
  useEffect(() => {
    if (evaluationtimer === 0) {
      setStartTimer(false);
      setGameOver(true);
      setTimerEnable(false);
      setCheck(false);
    
      setColor("");
      return;
    }
    if (!starttime) {
      return;
    } else {
      const interval = setInterval(() => {
        setEvaluationTimer((prevValue) => {
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
  }, [evaluationtimer, starttime]);

  const minutes = Math.floor(evaluationtimer / 60);
  const seconds = evaluationtimer % 60;
  const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;

  // Handle card flipping

  const flipCard = (card) => {
    if (flip) {
      setFlipCardValue(card?.value);
      setMainValue(true);
      setStartTimer(true);
      setTimerEnable(true);

      const updatedCards = cards.map((item) => {
        if (item.id === card?.id) {
          setImg(card?.img);

          return { ...item, isFlipped: true };
        } else {
          return item;
        }
      });

      const getFalse = updatedCards.filter((el) => el.isFlipped === false);

      setCards(getFalse);

      setCardTurnOver(cardturnover + 1);
      setFlip(false);
    } else {
      if (mainValue) {
        toast("Sélectionnez la valeur pour continuer le jeu.");
      }
    }
  };

  // __________________Handle click for circle value_________
  const handleClick = (val) => {    
    setCheckValue(val);
    if (mainValue) {
    
      if (val === flipcardValue) {
        setColor("1");
        pointwin?.play();
        setCorrectvalue(correctvalue + 1);
      } else {
        setColor("2");
        lost?.play();
        setWrongValue(wrongValue + 1);
      }
      setTimeout(() => {
        setCheck(true);
        setColor("");
      }, 1000);
      setMainValue(false);
    } else {
      if (flip) {
        setValuePopUp(true);
      }
    }
    // ------------------------------------------
  };


  useEffect(() => {
       if (check) {
         setCardTurnOver(cardturnover + 1);
         let Remainingcards = [...cards];
         let randomIndex = Math.floor(Math.random() * Remainingcards.length);
         let picked = Remainingcards[randomIndex];
   
         setImg(picked?.img);
         setFlipCardValue(picked?.value);
         let remaincard = Remainingcards.filter((card) => card?.id !== picked?.id);
         setCards(remaincard);
         setMainValue(true)
         setCheck(false);
       }
     }, [check]);

  
  // Game over--------------------------------

  const handleRestartGame = () => {
    setCards(state.cards);
    setGameOver(false);
    setCheck(false);
    setMainValue(false);
    setEvaluationTimer(120);
    dispatch(Shuffled(!shuffle));
    setCardTurnOver(0);
    setCorrectvalue(0);
    setWrongValue(0);
    setFlip(true);
    setColor("");
    setImg("");
  };
  const handleValuePop = () => {
    setValuePopUp(false);
  };
  const cardHeight = (i) => ({
    height: `calc(100% - ${cards.length * (1 / 2)}px)`,
    transform: `translateY(${i * 1}px)`,
  });

  return (
    <>
      <div className="fliped_cards Evaluation">
        <div className="container">
          <div className="row Evaluation">
            <div className="col-md-6  ">
              <div className="outer-div">
                {cards.length !== 0 &&
                  cards.map((card, i) => (
                    <div
                      key={card?.id}
                      style={cardHeight(i)}
                      className={`card ${card?.isFlipped ? "flipped" : ""}`}
                      onClick={() => {
                        !check && flipCard(card);
                      }}
                    >
                      <div>
                        <div className="card-front">
                          <img src="./img/Image verso card.png" alt="verso"/>
                        </div>
                      </div>
                    </div>
                  ))}

                {cards.length === 0 && (
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
              </div>
            </div>
            <div className="col-md-6">
              {img ? <img className="bordered" src={img} alt="card" /> : ""}
            </div>
          </div>
        </div>
      </div>
      <Points color={color} checkValue={checkValue} handleClick={handleClick} />

      <div className="Result_wrapper_outer">
        <div className="Result_wrapper">
          <div className="container">
            <div className="row Evaluation_result">
              <div className="Result_wrapper_duration">
                <div className="Result_timmer">
                  <img src="./img/timmer_icon_trim.png" alt="timer" />
                  <input type="text" value={formattedTime} readOnly />
                  <div className="pts_box">
                    <button
                      className="plus_icon"
                      onClick={() =>
                        !timerenable && setEvaluationTimer(evaluationtimer + 30)
                      }
                      disabled={timerenable}
                    >
                      +
                    </button>
                    <button
                      className="minus_icon"
                      onClick={() => {
                        if (!timerenable && evaluationtimer > 30) {
                          setEvaluationTimer(evaluationtimer - 30);
                        }
                      }}
                      disabled={timerenable}
                    >
                      -
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <EvaluationSelectCard
        handleValuePop={handleValuePop}
        valuePopUp={valuePopUp}
      />
      <Statistics
        Roundpercent={Roundpercent}
        handleRestartGame={handleRestartGame}
        gameover={gameover}
        cardturnover={cardturnover}
        correctvalue={correctvalue}
        wrongValue={wrongValue}
      />
    </>
  );
}
