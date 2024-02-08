import React, { useContext, useEffect } from "react";
import { GameContext } from "../Context/GameContext";
import { AIsetImg, LoadingProcess, UserNameColor } from "../Context/action";

export const Computer = () => {
  const {
    state,
    dispatch,
    compcard,

    nextturn,
    hometimer,
    flippedIndex,
    setFlippedIndex,
    compcarddata,
    setCompCard,
    setCompCardData,
    currentIndex,
    setCurrentIndex,
    setCompFlippedCardArray,

    rhythm,
  } = useContext(GameContext);

  const {
    userCardimg,

    gameOver,
    shuffle,
    AIimg,
  } = state;

  let battle;
  if (rhythm === "yes") {
    battle = new Audio("battle sound.wav");
  }

  console.log(compcarddata, "compcarddata", currentIndex);

  useEffect(() => {
    if (compcard?.length === 0 || compcarddata?.length === 1) {
      setCompCard(state.cards);

      function shuffleArray(array) {
        for (let i = array?.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
      }

      const shuffledData = [...state.cards];
      shuffleArray(shuffledData);

      setCompCardData(shuffledData);
      setCurrentIndex(shuffledData.length - 1);
    }
  }, [shuffle, state.cards, compcard, compcarddata]);

  // console.log(flippedIndex,"flip")

  useEffect(() => {
    if (hometimer === 0) {
      return;
    }
    if (nextturn) {
      if (userCardimg === "./img/Image verso card.png") {
        battle?.play();
        dispatch(AIsetImg("./img/Image verso card.png"));

        setTimeout(() => {
          dispatch(UserNameColor(true));
        }, 1000);
        return;
      }

      if (userCardimg) {
        dispatch(LoadingProcess(true));
        setTimeout(() => {
          const startTimeComp = new Date().getTime();
          localStorage.setItem("compstarttime", startTimeComp);

          let picked = compcarddata[currentIndex];
          localStorage.setItem(
            "flipcompcard_val",
            JSON.stringify({
              CompCard: picked,
              compflip_cardVal: picked?.value,
            }),
          );
          const updatedCards = compcarddata?.map((card, index) => {
            if (card.id === picked?.id) {
              setCompFlippedCardArray((prev) => [...prev, card]);

              dispatch(LoadingProcess(false));
              dispatch(AIsetImg(card.img));

              setFlippedIndex(index - 1);

              return { ...card, isFlipped: true };
            } else {
              return { ...card, isFlipped: false };
            }
          });

          const getFalse = updatedCards.filter((el) => el.isFlipped === false);

          setCompCardData(getFalse);
        }, 1000);
      }
      if (currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      }
    }
  }, [userCardimg]);

  console.log(flippedIndex, "flipindex");
  return (
    <>
      {gameOver || compcarddata?.length === 0 ? (
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
          <p>PLUS DE CARTES</p>
        </div>
      ) : (
        // <article className="board ">
        <article className="board">
          {compcarddata?.length !== 0 &&
            compcarddata.map((card, i) => (
              <div
                id={`button_id_${i}`}
                key={i}
                className={`cards computer_card ${
                  flippedIndex === i ? `flipped ${flippedIndex}` : ""
                }`}
              >
                <span className="wrapper">
                  <span className="content">
                    <span className="face back">
                      <img alt={card.id} src="./img/Image verso card.png" />
                    </span>
                    <span className="face front">
                      <img src={AIimg} alt="aiimage" />
                    </span>
                  </span>
                </span>
              </div>
            ))}
        </article>
      )}
    </>
  );
};
