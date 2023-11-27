import { useEffect } from "react";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Points } from "./Home/Points";
import { EvaluationGameOver, EvaluationSelectCard } from "./Home/GameModals";
import { useContext } from "react";
import { GameContext } from "../Context/GameContext";
import {
  CorrectValue,
  Flipped,
  Shuffled,
  TurnOver,
  WrongValue,
} from "../Context/action";
import { Statistics } from "./Home/Statistics";
import "../main component/toaster.css";
import { toast } from "react-toastify";
export default function Evaluation() {
  const {
    state,
    dispatch,
    timerenable,
    setTimerEnable,
    timerValue,
    setTimerValue,
    defaultbinary, setDefaultBinary
  } = useContext(GameContext);
  const { cardFlipped, shuffle, correctValue, wrongvalue, turnover } = state;
  const [cards, setCards] = useState(state.cards);
  const [gameover, setGameOver] = useState(false);
  const [check, setCheck] = useState(false);
  const [img, setImg] = useState("");
  const [checkValue, setCheckValue] = useState("");
  // const [timerValue, setTimerValue] = useState(120);
  const [color, setColor] = useState("");
  const [flipcardValue, setFlipCardValue] = useState();
  const [mainValue, setMainValue] = useState(false);
  const [valuePopUp, setValuePopUp] = useState(false);
  const [remainingCard, setRemainingCard] = useState([]);
const [flip,setFlip]=useState(true)
  const pointwin = new Audio("point added.wav");
  const lost = new Audio("lost 1 point.wav");
  const Time = JSON.parse(localStorage.getItem("timer"));
  const [evaluationtimer, setEvaluationTimer] = useState();

  console.log(cards)

  useEffect(() => {
    Time ? setEvaluationTimer(Time) : setEvaluationTimer(120);
  }, [Time]);

  useEffect(() => {
  if(cards.length===0){
    setCards(state.cards);
  }
   }, [shuffle,state.cards,cards] );

  // -----Calculate percentege-------------------

  const calculationstat = (correctValue / turnover) * 100;
  const Roundpercent = Math.round(calculationstat);

  // Timer functionality
  useEffect(() => {
    if (evaluationtimer === 0) {
      dispatch(Flipped(false));
      setGameOver(true);
      setTimerEnable(false);
      return;
    }
    if (!cardFlipped) {
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
  }, [evaluationtimer, cardFlipped]);


  // useEffect(() => {
  //   let interval;

  //   if (evaluationtimer > 0 && cardFlipped) {
  //     interval = setInterval(() => {
  //       setEvaluationTimer((prevValue) => {
  //         const newValue = prevValue - 1;

  //         if (newValue === 0) {
  //           dispatch(Flipped(false));
  //           setGameOver(true);
  //           setTimerEnable(false);
  //           clearInterval(interval);
  //         }

  //         return newValue;
  //       });
  //     }, 1000);
  //   }

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, [evaluationtimer, cardFlipped])

  const minutes = Math.floor(evaluationtimer / 60);
  const seconds = evaluationtimer % 60;
  const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;

  // Handle card flipping
  const flipCard = (id, val) => {
    if(flip){
      setFlipCardValue(val);
      setMainValue(true);
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
  
      const getFalse = updatedCards.filter((el) => el.isFlipped === false);
  
      setRemainingCard(getFalse);
      dispatch(TurnOver());
      setFlip(false)
    }

  };
console.log(remainingCard,"remain")
  // __________________Handle click for circle value_________
  const handleClick = (val) => {
    setCheckValue(val);
    if (mainValue) {
      if (val === flipcardValue) {
        setColor("1");
        pointwin.play();
        dispatch(CorrectValue());
      } else {
        setColor("2");
        lost.play();
        dispatch(WrongValue());
      }
      setTimeout(() => {
        setCheck(true);
        setColor("");
      }, 1000);
      setMainValue(false);
    } else {
      setValuePopUp(true);
    }
    // ------------------------------------------
  };

  

  useEffect(() => {
    let loopInterval;
    let continueCardSelectionLoop = true;
    let updatedRemainingCard = [...remainingCard];
    console.log(remainingCard,"tt")
    const loop = (i) => {
      if (!continueCardSelectionLoop ||i >= remainingCard.length || gameover) {
        setColor("");
        return;
      }
      dispatch(TurnOver());
      let randomIndex = Math.floor(Math.random() * updatedRemainingCard.length);
      let picked = updatedRemainingCard[randomIndex];
      localStorage.setItem("autoflip", JSON.stringify(picked?.value));
      setImg(picked?.img);
      updatedRemainingCard = updatedRemainingCard.filter(
        (card) => card.id !== picked?.id,
      );
      // console.log(updatedRemainingCard);
      setCards(updatedRemainingCard);
      const autoflip = JSON.parse(localStorage.getItem("autoflip"));
      let randomIndex2 = Math.floor(
        Math.random() * updatedRemainingCard.length,
      );

      let circle_Val = updatedRemainingCard[randomIndex2]?.value;

      setTimeout(() => {
        if (circle_Val === autoflip) {
          setCheckValue(circle_Val);
          setColor("1");
          pointwin.play();
          dispatch(CorrectValue());
        } else {
          setCheckValue(circle_Val);
          setColor("2");
          lost.play();
          dispatch(WrongValue());
        }
      }, 1000);

      loopInterval = setTimeout(() => {
        if (updatedRemainingCard.length === 1) {
          updatedRemainingCard = remainingCard;
          loop(0);
        }
        setColor("");
        loop(i + 1); // Call the loop function
      }, 2000);

  
    };
    if (check) {
      setTimeout(() => {
        loop(0);
      }, 3000);
    }

    setColor("");

    return () => {
      clearTimeout(loopInterval);
      continueCardSelectionLoop = false; 
    };
  }, [check, remainingCard, gameover]);
 
  // Game over--------------------------------
  const handleRestartGame = () => {
    setCards(state.cards);
    setGameOver(false);
    setCheck(false);
    setMainValue(false)
    setEvaluationTimer(120);
    dispatch(Shuffled(!shuffle));
    dispatch({ type: "turnoverempty" });
    dispatch({ type: "correctValueempty" });
    dispatch({ type: "wrongvalueempty" });
    setFlip(true)
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
      <div className="fliped_cards">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="outer-div">
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
              </div>
            </div>
            <div className="col-md-6">
              <img className="bordered" src={img || "./img/1 la ronde.jpg"} />
            </div>
          </div>
        </div>
      </div>
      <Points color={color} checkValue={checkValue} handleClick={handleClick} />

      <div className="Result_wrapper_outer">
        <div className="Result_wrapper">
          <div className="container">
            <div className="row">
              <div className="Result_wrapper_duration">
                <p>
                  <div className="Result_timmer">
                    <img src="./img/timmer_icon_trim.png" />
                    <input type="text" value={formattedTime} readOnly />
                    <div className="pts_box">
                      <button
                        className="plus_icon"
                        onClick={() =>
                          !timerenable &&
                          setEvaluationTimer(evaluationtimer + 30)
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
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="inline_buttons">
        <ul>
          <li>
            <a onClick={handleEvalutionbtn}>Statistiques</a>
          </li>
        </ul>
      </div> */}
      <EvaluationSelectCard
        handleValuePop={handleValuePop}
        valuePopUp={valuePopUp}
      />
      <Statistics
        Roundpercent={Roundpercent}
        handleRestartGame={handleRestartGame}
        gameover={gameover}
      />
    </>
  );
}
