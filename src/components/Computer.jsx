import React, { useContext, useEffect } from "react";
import { GameContext } from "../Context/GameContext";
import {
  AIsetImg,
  LoadingProcess,
  UserNameColor,

} from "../Context/action";

export const Computer = () => {
  const {
    state,
    dispatch,
    compcard,
    setCompCard,
    nextturn,

    flippedIndex,
    setFlippedIndex,
    compcarddata,
    setCompCardData,
    currentIndex,
    setCurrentIndex,
   
  } = useContext(GameContext);

  const {
    userCardimg,

    gameOver,
    shuffle,
    AIimg,
  } = state;
  const battle = new Audio("battle sound.wav");


  useEffect(() => {
    if (compcard?.length === 0) {
 
      setCompCard(compcarddata);
    }
    function shuffleArray(array) {
      for (let i = array?.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; 
      }
    }

    // Make a copy of the initial data and shuffle it
    const shuffledData = [...compcard];
    shuffleArray(shuffledData);

    setCompCardData(shuffledData);
  }, [shuffle]);



  useEffect(() => {
    if (nextturn) {
      if (userCardimg === "./img/Image verso card.png") {
        dispatch(AIsetImg("./img/Image verso card.png"));
        battle.play();
        setTimeout(() => {
          dispatch(UserNameColor(true));
         
      
        }, 1000);
        return;
      }

      if (userCardimg) {
        dispatch(LoadingProcess(true));
        setTimeout(() => {
 

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
              dispatch(LoadingProcess(false));
              dispatch(AIsetImg(card.img));
              setFlippedIndex(index);

              return { ...card, isFlipped: true };
            } else {
              return { ...card, isFlipped: false };
            }
          });

          const getFalse = updatedCards.filter((el) => el.isFlipped === false);

          setCompCardData(getFalse);

         
        }, 1000);
      }
      setCurrentIndex(currentIndex - 1);
    }
  }, [userCardimg]);

  

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
    
        <article className="board">
          {compcarddata?.length !== 0 &&
            compcarddata.map((card, i) => (
              <div
                id={`button_id_${i}`}
                key={i}
                className={`cards computer_card  ${
                  flippedIndex === i ? "cards:nth-child(${i+1} flipped" : " "
                } `}
              >
                <span className="wrapper">
                  <span className="content">
                    <span className="face back">
                      <img alt={card.id} src="./img/Image verso card.png" />
                    </span>
                    <span   className="face front">
                      <img  src={AIimg} />
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
