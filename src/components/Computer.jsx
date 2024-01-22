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
    hometimer,
    flippedIndex,
    setFlippedIndex,
    compcarddata,
    setCompCardData,
    currentIndex,
    setCurrentIndex,
    setCompFlippedCardArray
  } = useContext(GameContext);

  const {
    userCardimg,

    gameOver,
    shuffle,
    AIimg,
  } = state;
  const battle = new Audio("battle sound.wav");

console.log(compcarddata,"compcarddata")

// useEffect(()=>{
// setCompCardData(state.cards)

// },[state.cards])


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

 
//  useEffect(() => {
//     setCompCardData((prevCards) => {
//       const existingCards = prevCards || [];
//       // const newCards = [...prevCards];
//       const newCards = [...existingCards];
//       const maxCardCount = hometimer || 0;
//       // const existingCardCount = prevCards.length;
//       const existingCardCount = existingCards.length;

//       if (maxCardCount < existingCardCount) {
//         return existingCards;
//       }

//       for (let i = existingCardCount; i < maxCardCount; i++) {
//         // Copy details from existing cards
//         const existingCardIndex = i % existingCardCount;
//         const existingCard = prevCards[existingCardIndex];

//         // Duplicate the existing card details
//         const newCard = {
//           id: i + 1,
//           name: existingCard?.name,
//           value: existingCard?.value,
//           isFlipped: existingCard?.isFlipped || false,
//           img: existingCard?.img,
//         };

//         newCards.push(newCard);
//       }

//       return newCards;
//     });
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [hometimer]);


  useEffect(() => {
if(hometimer===0){
  return;
}
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
 
          const startTimeComp = new Date().getTime();
          localStorage.setItem("compstarttime",startTimeComp)
    

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
              setCompFlippedCardArray((prev)=>[...prev,card])
              
              setCompFlippedCardArray((prev)=>[...prev,card])
              
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

  // console.log(compcarddata,"compcarddata")
  
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
