/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import debounce from "lodash.debounce";
import { useContext } from "react";
import { GameContext } from "../Context/GameContext";
import { motion } from "framer-motion";
import {
  AINameColor,
  AIsetImg,
  AiWonPiles,
  CompBattle,
  CorrectValue,
  Flipped,
  GameOver,
  MainValueSelected,
  Shuffled,
  UserBattle,
  UserNameColor,
  UserSetImg,
  WonPiles,
  WrongValue,
} from "../Context/action";
import {
  GameBattleModal,
  GameOverModal,
  GamePopUpModal,
  BattleModal,
} from "../components/Home/GameModals";
import { Points } from "../components/Home/Points";
import { Result } from "../components/Home/Result";
import { Statistics } from "../components/Home/Statistics";
import { UserComputer } from "../components/Home/UserComputer";

import { Link } from "react-router-dom";

import "../main component/toaster.css";

export const Home = ({ handleFullScreen }) => {
  const [showModal, setShowModal] = useState(false);

  const {
    state,
    dispatch,
    nextturn,
    setNextTurn,
setValueSelected,
    setClickCount,
    flipback,
    setFlipBack,
    setFlipwonDeck,
 setTimerEnable,
setRecoveryCardUse,
    strongvalue,
    setStrongValue,
    cardmatchValue,
    setCardMatchedValue,
    comppoint,
    setCompPoint,
    userpoint,
    setUserPoint,
    color,
    setColor,
    setFlippedIndex,
    setCurrentIndex,
    hometimer,
    setHomeTimer,
    setFlippedCardArray,
setTrueValueArray,
    setCompTrueValueArray,
    setCompFlippedCardArray,
setAverageResponseTime,
    setAverageResponseTimeComp,
setCompCard,
    setCompCardData,
    rhythm,
  } = useContext(GameContext);
  const {
    gameOver,
    cardFlipped,
    mainvalueselect,
    userNameColor,
    compNameColor,
    shuffle,
    clickvalue,
    turnover,
    correctValue,
    userBattle,
    compBattle,
  } = state;

  const [points, setPoints] = useState(0);
  const [compPt, setCompPt] = useState(0);
  const [pointwinner, setPointWinner] = useState();

  const [checkValue, setCheckValue] = useState("");
  const [valuePopUp, setValuePopUp] = useState(false);
  const [trueValuePopUp, setTrueValuePopUp] = useState(false);
  const [trueValuePopUpAi, setTrueValuePopUpAi] = useState(false);
  const [winnerName, setWinnerName] = useState("");
  let { compflip_cardVal, CompCard } =
    JSON.parse(localStorage.getItem("flipcompcard_val")) || 0;
  let { cardvalue, userCard } =
    JSON.parse(localStorage.getItem("cardvalue")) || 0;
  const [correct, setCorrect] = useState(false);
  const [showsbattlepop, setBattlePop] = useState(false);
const[strongpointuser,setStrongPointUser]=useState(false)
const[strongpointcomp,setStrongPointComp]=useState(false)
  const userData =(JSON.parse( localStorage.getItem("user")))
  const userName = userData ? userData.firstName: null;

  const compName = "Ordinateur";
  const draw = "Egalité";
  const Timer = JSON.parse(localStorage.getItem("timer"));
  const startTimeComp = JSON.parse(localStorage.getItem("compstarttime"));

  

  let pointwin, winner, buttonsound, lost;

  if (rhythm === "yes") {
    pointwin = new Audio("point added.wav");
    winner = new Audio("win.mp3");
    buttonsound = new Audio("button click sound.wav");
    lost = new Audio("lost 1 point.wav");
  }

  // ________________FRAME MOTION_________________________
  const buttonVariants = {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, x: -50 },
  };

  const listVariants = {
    initial: {},
    animate: { transition: { staggerChildren: 0.2 } },
    exit: {},
  };

  // ________________FRAME MOTION_________________________END

  useEffect(() => {
    Timer ? setHomeTimer(Timer) : setHomeTimer(120);
  }, [Timer]);

  useEffect(() => {
    localStorage.removeItem("cardvalue");
    localStorage.removeItem("flipcompcard_val");
  }, []);

  // ------------------------Calculate percentage--------------
  let Roundpercentage;
  const calculatePercentage = (correctValue / turnover) * 100;
  if (correctValue === 0 && turnover === 0) {
    Roundpercentage = 0;
  } else {
    Roundpercentage = Math.round(calculatePercentage);
  }

  const closeBattlePop = () => {
    setBattlePop(false);
    setCorrect(false);

    dispatch({ type: "battlieEmpty" });
    dispatch({ type: "compBattlieEmpty" });
  };

  const handleClose = () => {
    if (hometimer !== 0) {
      setShowModal(false);
    } else {
      setShowModal(false);
      dispatch(GameOver(true));
      winner?.play();
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setCardMatchedValue(false);
    }, 1000);
  }, [cardmatchValue]);

  const handleValuePop = () => {
    setValuePopUp(false);
  };

  useEffect(() => {
    setTimeout(() => {
      setTrueValuePopUp(false);
    }, 1500);
  }, [trueValuePopUp]);

  useEffect(() => {
    setTimeout(() => {
      setTrueValuePopUpAi(false);
    }, 1500);
  }, [trueValuePopUpAi]);

  useEffect(() => {
    setTimeout(() => {
      setStrongValue(false);
    }, 2000);
  }, [strongvalue]);

  useEffect(() => {
    setTimeout(() => {
      setUserPoint(false);
    }, 1000);
  }, [userpoint]);

  useEffect(() => {
    setTimeout(() => {
      setStrongPointUser(false);
    }, 1000);
  }, [strongpointuser]);

  useEffect(() => {
    setTimeout(() => {
      setStrongPointComp(false);
    }, 1000);
  }, [strongpointcomp]);

  useEffect(() => {
    setTimeout(() => {
      setCompPoint(false);
    }, 1000);
  }, [comppoint]);

  useEffect(() => {
    setTimeout(() => {
      if (flipback) {
        dispatch(UserSetImg("./img/Image verso card.png"));
        dispatch(UserBattle(userCard));
        dispatch(CompBattle(CompCard));
        setCorrect(true);
      }
    }, 1000);
  }, [flipback]);

  // ____________________HANDLE TIMER ____________________________

  useEffect(() => {
    if (hometimer === 0) {
      setShowModal(true);
      dispatch(Flipped(false));

      setValuePopUp(false);
      setTrueValuePopUpAi(false);
      setStrongValue(false);
      setUserPoint(false);
      setCompPoint(false);
      setBattlePop(false);

      setTimerEnable(false);
      return;
    }
    if (!cardFlipped) {
      return;
    } else {
      const interval = setInterval(() => {
        setHomeTimer((prevValue) => {
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
  }, [hometimer, cardFlipped]);

  const minutes = Math.floor(hometimer / 60);
  const seconds = hometimer % 60;

  const formathometime = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;

  // __________________AVERAGE RESPONSE TIME LOGIC FOR PLAYER __________________________

  const handleUserEndTime = () => {
    const endTime = new Date().getTime();

    const startTime = JSON.parse(localStorage.getItem("userstarttime"));
    const responseTime = endTime - startTime;
    onValueSelect(userCard?.name, responseTime);

    userCard.isCorrect = true;

    setTrueValueArray((prevArray) => [...prevArray, userCard]);
  };

  const onValueSelect = (cardName, responseTime) => {
    setAverageResponseTime((prevTimes) => ({
      ...prevTimes,
      [cardName]: calculateNewAverage(
        prevTimes[cardName] || { sum: 0, count: 0 },
        responseTime,
      ),
    }));
  };

  const calculateNewAverage = (prevAverage, newValue) => {
    const newSum = prevAverage.sum + newValue;
    const newCount = prevAverage.count + 1;
    const newAverage = newSum / newCount;

    return { sum: newSum, count: newCount, average: newAverage };
  };

  // __________________AVERAGE RESPONSE TIME LOGIC FOR Computer __________________________

  const handleComputerEndTime = () => {
    const endTimecomp = new Date().getTime();
    const responseTimeComp = endTimecomp - startTimeComp;

    onValueSelectComp(CompCard?.name, responseTimeComp);
    if (CompCard) {
      CompCard.isCorrect = true;
    }

    setCompTrueValueArray((prev) => [...prev, CompCard]);
  };

  const onValueSelectComp = (cardName, responseTime) => {
    setAverageResponseTimeComp((prevTimes) => ({
      ...prevTimes,
      [cardName]: calculateNewAverageComp(
        prevTimes[cardName] || { sum: 0, count: 0 },
        responseTime,
      ),
    }));
  };

  const calculateNewAverageComp = (prevAverage, newValue) => {
    const newSum = prevAverage.sum + newValue;
    const newCount = prevAverage.count + 1;
    const newAverage = newSum / newCount;

    return { sum: newSum, count: newCount, average: newAverage };
  };

  // ________________HANDLE CLICK FOR VALUES____________________________
  const handleClick = async (value) => {
    setFlipwonDeck(true);
    // setValueSelected(false);
    setCheckValue(value);
    let uservalue = points;
    let compvalue = compPt;

    // // -----------------Computer Main value----------------

    let comp_MainValue;
    const originalArray = clickvalue;
    const newValue = compflip_cardVal;

    let gettingValue = originalArray.filter((val) => val !== newValue);
    const randomIndex = Math.floor(Math.random() * gettingValue?.length);
    const random = Math.floor(Math.random() * 100) + 1;
    if (random <= 85) {
      if (originalArray.includes(newValue)) {
        comp_MainValue = newValue;
      }
    } else {
      comp_MainValue = gettingValue[randomIndex];
    }

    // _________________user card value----------------------
    let mainvalue = value;

    // ------------------------------The MAIN LOGIC FOR THE GAME----------------------------------------------

    const debouncefunction = debounce(() => {
      dispatch(AINameColor(true));
    });

    const valuepopAI = debounce(() => {
      setTrueValuePopUpAi(true);
      lost?.play();
    }, 800);

    // ______________________COmputer turn in the battle part ___________________________

    const computerturn = debounce(() => {
      dispatch(AINameColor(true));
      if (comp_MainValue === compflip_cardVal) {
        handleComputerEndTime();

        setCheckValue(comp_MainValue, buttonsound?.play());
        setTimeout(() => {
          setCompPoint(true);
          setColor("1");
          compvalue += 1;
          setTimeout(() => {
            pointwin?.play();
            setCompPt(compvalue);
          }, 1000);
        }, 500);
      } else {
        setCheckValue(comp_MainValue, buttonsound?.play());
        setTimeout(() => {
          setColor("2");
        }, 500);
        valuepopAI();
      }
      setTimeout(() => {
        dispatch(AINameColor(false));

        setColor("");
        setValueSelected(false);
      }, 2000);
    }, 2500);

    if (mainvalueselect) {
      buttonsound?.play();
      if (compflip_cardVal === cardvalue) {
        setRecoveryCardUse(true);

        if (mainvalue === cardvalue) {
          handleUserEndTime();
          uservalue += 1;
          setColor("1");
          dispatch(CorrectValue());

          setUserPoint(true);
       
          setTimeout(() => {
            pointwin?.play();
            setPoints(uservalue);
          }, 1000);
        
          setTimeout(() => {
            setColor("");
            dispatch(UserNameColor(false));
          }, 1500);
          computerturn();
        } else {
          setColor("2");
          dispatch(WrongValue());
          setTimeout(() => {
            lost?.play();
            setColor("");
            dispatch(UserNameColor(false));
            setTrueValuePopUp(true);
          }, 1500);
          computerturn();
        }
        dispatch(MainValueSelected(false));

        setTimeout(() => {
          setCardMatchedValue(true);

          setTimeout(() => {
            setFlipBack(true);
          }, 500);
        }, 4000);
      } else {
        if (mainvalue === cardvalue) {
          handleUserEndTime();

          uservalue += 1;

          setColor("1");
          dispatch(CorrectValue());
          setUserPoint(true);
          setTimeout(() => {
            pointwin?.play();
            setPoints(uservalue);
          }, 1000);

          setTimeout(() => {
            setColor("");
            dispatch(UserNameColor(false));
          }, 1500);

          setTimeout(() => {
            if (nextturn) {
              debouncefunction();
              if (comp_MainValue === compflip_cardVal) {
                handleComputerEndTime();

                setCheckValue(comp_MainValue, buttonsound?.play());

                setTimeout(() => {
                  setColor("1");
                }, 500);

                compvalue += 1;
                setCompPoint(true);
                setTimeout(() => {
                  pointwin?.play();
                  setCompPt(compvalue);
                }, 1000);
              } else {
                setCheckValue(comp_MainValue, buttonsound?.play());
                setTimeout(() => {
                  setColor("2");
                }, 500);
                valuepopAI();
              }

              setTimeout(() => {
                setColor("");
                dispatch(AINameColor(false));
              }, 2000);
            }
            setNextTurn(true);
            dispatch(AINameColor(false));
          }, 3000);
        } else {
          setColor("2");
          setTimeout(() => {
            setTrueValuePopUp(true);
            lost?.play();
          }, 800);

          dispatch(WrongValue());

          setTimeout(() => {
            setColor("");
            dispatch(UserNameColor(false));
          }, 2000);
          if (!trueValuePopUp) {
            setTimeout(() => {
              if (nextturn) {
                debouncefunction();
                if (comp_MainValue === compflip_cardVal) {
                  handleComputerEndTime();

                  setCheckValue(comp_MainValue, buttonsound?.play());

                  setTimeout(() => {
                    setColor("1");
                  }, 500);
                  compvalue += 1;

                  setCompPoint(true);
                  setTimeout(() => {
                    pointwin?.play();
                    setCompPt(compvalue);
                  }, 1000);
                } else {
                  setCheckValue(comp_MainValue, buttonsound?.play());
                  setTimeout(() => {
                    setColor("2");
                  }, 500);
                  valuepopAI();
                }

                setTimeout(() => {
                  setColor("");
                  dispatch(AINameColor(false));
                }, 3000);
              }
              setNextTurn(true);

              dispatch(AINameColor(false));
            }, 3000);
          }
        }

        dispatch(MainValueSelected(false));

        // ______________STRONGER CARD POINT ADDITION_____________________

        const popup = debounce(() => {
          if (correct) {
            setBattlePop(true);
          }
        }, 1800);

        setTimeout(async () => {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          if (
            (cardvalue > compflip_cardVal && compflip_cardVal !== "Joker") ||
            cardvalue === "Joker"
          ) {
            setStrongValue(true);

            setPointWinner(userName);
            popup();
            dispatch(WonPiles(userCard));
            dispatch(WonPiles(CompCard));

            uservalue += 1;
            setStrongPointUser(true);
            setTimeout(() => {
              pointwin?.play();
              setPoints(uservalue);
            }, 800);
            setTimeout(() => {
              dispatch(UserNameColor(true));
              setValueSelected(false);
            }, 2000);
          } else {
            popup();
            setPointWinner(compName);
            setStrongValue(true);

            dispatch(AiWonPiles(CompCard));
            dispatch(AiWonPiles(userCard));
            
            compvalue += 1;
            setStrongPointComp(true);
            setTimeout(() => {
              pointwin?.play();
              setCompPt(compvalue);
            }, 800);
            setTimeout(() => {
              dispatch(UserNameColor(true));
              setValueSelected(false);
            }, 2000);
          }
        }, 4000);
      }
    } else {
      setValuePopUp(true);
    }
    setNextTurn(true);
  };

  // -------------------handle Game REStart pop up---------------------
  const handleRestartGame = () => {
    dispatch(GameOver(false));
    localStorage.removeItem("cardvalue");
    localStorage.removeItem("flipcompcard_val");

    setTimeout(() => {
      dispatch(UserNameColor(true));
    }, 1000);
    setCompPt(0);
    setPoints(0);
    setHomeTimer(120);
    setClickCount(3);
    dispatch(AIsetImg(""));
    dispatch(UserSetImg(""));
    dispatch(UserNameColor(false));

    dispatch(Shuffled(!shuffle));
    dispatch({ type: "turnoverempty" });
    dispatch({ type: "woncardsempty" });
    dispatch({ type: "correctValueempty" });
    dispatch({ type: "wrongvalueempty" });
    dispatch({ type: "Countwoncardempty" });
    setValueSelected(false);
    dispatch({ type: "aiwoncardsempty" });
    dispatch({ type: "battlieEmpty" });
    // setdeckcard([{ deckcard: 0 }]);
    dispatch({ type: "compBattlieEmpty" });
    setCorrect(false);
    setFlipBack(false);
    setBattlePop(false);
    dispatch(Flipped(false));
    setCardMatchedValue(false);
    setValuePopUp(false);
    setTrueValuePopUpAi(false);
    setStrongValue(false);
    setUserPoint(false);
    setCompPoint(false);
    setRecoveryCardUse(false);
    setFlippedIndex("");
    setCurrentIndex("");
    setTimerEnable(false);
    setFlippedCardArray([]);
    setTrueValueArray([]);
    setCompTrueValueArray([]);
    setCompFlippedCardArray([]);
    setAverageResponseTime([]);
    setAverageResponseTimeComp([]);
    setCompCard([]);
    setCompCardData([]);
  };
  // ----------------------handle winner------------------
  const handlewinner = () => {
    let winnerName = "";
    if (points > compPt) {
      winnerName = userName;
    }
    if (compPt > points) {
      winnerName = compName;
    }
    if (points === compPt) {
      winnerName = draw;
    }
    setWinnerName(winnerName);
    dispatch(true);
  };

  useEffect(() => {
    if (gameOver) {
      handlewinner();
    }
  }, [gameOver]);

  return (
    <div>
      <div className="main_battle">
        <div className="container" style={{ marginTop: "50px" }}>
          <div>
            <h1 className="text-center mb-5">LA BATAILLE RYTHMIQUE©</h1>
          </div>

          <div className="row align-items-center">
            <div className="col-md-2">
              <motion.input
                type="text"
                defaultValue={userName}
                readOnly="readonly"
                className={`${userNameColor ? "activeUser" : ""}`}
                animate={{
                  scale: userNameColor ? 1.2 : 1,
                  opacity: userNameColor ? 1 : 1,
                }}
                transition={{ duration: 0.2, ease: "linear" }}
              />
              <div className="input_new">
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  minlength="4"
                  maxlength="8"
                  size="10"
                  value={`${points} points`}
                />
              </div>
              {/* ___________________USER +1 point pop_________________ */}
              {userpoint && (
                <motion.div
                  className="plus_point"
                  layout
                  initial={{ opacity: 0, y: 200, rotateX: 120, x: 300 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0, x: 0 }}
                  exit={{ opacity: 0, y: 100 }}
                  transition={{ duration: 0.7, ease: "linear" }}
                >
                  <span>+1 Point</span>
                </motion.div>
              )}


              {/* ----------------STRONG POINT USER_________________ */}
              {strongpointuser && (
                <motion.div
                  className="plus_point"
                  layout
                  initial={{ opacity: 0, y: 200, rotateX: 120, x: 300 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0, x: 0 }}
                  exit={{ opacity: 0, y: 100 }}
                  transition={{ duration: 0.7, ease: "linear" }}
                >
                  <span>+1 Point</span>
                </motion.div>
              )}
            </div>
            {/* ___________________USER +1 point pop end_________________ */}

            <UserComputer />

            <div className="col-md-2">
              <motion.input
                type="text"
                defaultValue="Ordinateur"
                readOnly="readonly"
                className={`${compNameColor ? "activeUser" : ""}`}
                animate={{
                  scale: compNameColor ? 1.2 : 1,
                  opacity: userNameColor ? 1 : 1,
                }}
                transition={{ duration: 0.2, ease: "linear" }}
              />

              <div className="input_new">
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  minlength="4"
                  maxlength="8"
                  size="10"
                  value={`${compPt} points`}
                  layout
                />
              </div>

              {/* ___________________COMP +1 point pop_________________ */}
              {comppoint && (
                <motion.div
                  className="plus_point"
                  layout
                  initial={{ opacity: 0, y: 200, rotateX: 120, x: -300 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0, x: 0 }}
                  exit={{ opacity: 0, y: 100 }}
                  transition={{ duration: 0.7, ease: "linear" }}
                >
                  <span>+1 Point</span>
                </motion.div>
              )}

{strongpointcomp && (
                <motion.div
                  className="plus_point"
                  layout
                  initial={{ opacity: 0, y: 200, rotateX: 120, x: -300 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0, x: 0 }}
                  exit={{ opacity: 0, y: 100 }}
                  transition={{ duration: 0.7, ease: "linear" }}
                >
                  <span>+1 Point</span>
                </motion.div>
              )}



            </div>
          </div>

          {/* --------------------------------true value pop up________________________ */}

          {trueValuePopUp && (
            <motion.div
              className="truevalue"
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <p>La valeur correcte est </p>
              {cardvalue !== "Joker" ? (
                <h2 className="fs-1">{cardvalue}</h2>
              ) : (
                <img
                  style={{ width: "150px", height: "150px" }}
                  src="img/11 point d_orgue.jpg"
                />
              )}
            </motion.div>
          )}
          {trueValuePopUpAi && (
            <motion.div
              className="truevalue"
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <p>La valeur correcte est</p>
              {compflip_cardVal !== "Joker" ? (
                <h3 className="fs-1">{compflip_cardVal}</h3>
              ) : (
                <img
                  style={{ width: "150px", height: "200px" }}
                  src="img/11 point d_orgue.jpg"
                />
              )}
            </motion.div>
          )}

          <Points
            strongvalue={strongvalue}
            pointwinner={pointwinner}
            color={color}
            checkValue={checkValue}
            handleClick={handleClick}
          />

          {/* --------------POP up for GAME OVER & winner------------- */}
          <GameOverModal
            gameOver={gameOver}
            handleRestartGame={handleRestartGame}
            winnerName={winnerName}
          />

          {/* _______________________Battle pop up________________________ */}
          <GameBattleModal cardmatchValue={cardmatchValue} />

          {/* ___________________________Value POP UP_________________________ */}
          <GamePopUpModal
            handleValuePop={handleValuePop}
            valuePopUp={valuePopUp}
          />

          <Result
            formathometime={formathometime}
            points={points}
            compPt={compPt}
            hometimer={hometimer}
            setHomeTimer={setHomeTimer}
          />

          <motion.div
            variants={listVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <div className="inline_buttons">
              <motion.ul>
                <motion.li variants={buttonVariants}>
                  <motion.button
                    className="w-100"
                    onClick={handleFullScreen}
                    variants={buttonVariants}
                  >
                    Plein écran
                  </motion.button>
                </motion.li>
                <motion.li variants={buttonVariants}>
                  <motion.button
                    className="w-100"
                    onClick={handleRestartGame}
                    variants={buttonVariants}
                  >
                    Nouvelle partie
                  </motion.button>
                </motion.li>
                <motion.li variants={buttonVariants}>
                  <Link to="/setting" style={{ border: "none" }}>
                    <motion.button
                      className="w-100"
                      onClick={handleRestartGame}
                      variants={buttonVariants}
                    >
                      Paramètres
                    </motion.button>
                  </Link>
                </motion.li>
                <motion.li variants={buttonVariants}>
                  <motion.button
                    className="w-100"
                    onClick={() => setShowModal(true)}
                    variants={buttonVariants}
                  >
                    Statistiques
                  </motion.button>
                </motion.li>
              </motion.ul>
            </div>
          </motion.div>

          <Statistics
            showModal={showModal}
            setShowModal={setShowModal}
            handleClose={handleClose}
            Roundpercentage={Roundpercentage}
          />

          <BattleModal
            showsbattlepop={showsbattlepop}
            closeBattlePop={closeBattlePop}
            userBattle={userBattle}
            compBattle={compBattle}
            userName={userName}
          />
        </div>
      </div>
    </div>
  );
};
