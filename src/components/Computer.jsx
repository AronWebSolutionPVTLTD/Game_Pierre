import React, { useContext, useEffect } from "react";
import { GameContext } from "../Context/GameContext";
import {
  AIsetImg,
  LoadingProcess,
  UserNameColor,
  UserSetImg,
} from "../Context/action";
import { motion } from "framer-motion";
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
    deckcard,
    setdeckcard,
    userid,
    setUserId,
    setUserCards,
    compturnstop,setCompturnStop
  } = useContext(GameContext);

  const {
    userCardimg,

    gameOver,
    shuffle,
    AIimg,
  } = state;

  // console.log(userid,deckcard,"userlllllllll")

  useEffect(() => {
    if (compcard.length === 0) {
      // setCompCard(state.cards);
      setCompCard(compcarddata);
    }
    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements at i and j
      }
    }

    // Make a copy of the initial data and shuffle it
    const shuffledData = [...compcard];
    shuffleArray(shuffledData);

    setCompCardData(shuffledData);
  }, [shuffle]);

  console.log(compcarddata, "comp");

  // useEffect(() => {
  //     const getShuffledData = shuffleR(state.cards);
  //     localStorage.setItem("computercarddata", JSON.stringify(getShuffledData));
  //     setCompCard(getShuffledData);
  //   }, [shuffle]);

  useEffect(() => {
    if (nextturn) {
      if (userCardimg === "./img/Image verso card.png") {
        dispatch(AIsetImg("./img/Image verso card.png"));
        setTimeout(() => {
          dispatch(UserNameColor(true));
          if (deckcard.length===0){
            setCompturnStop(true)
           }
        }, 1000);
        return;
      }

      if (userCardimg) {
        dispatch(LoadingProcess(true));
        setTimeout(() => {
          // let picked = compcard[Math.floor(Math.random() * compcard.length)];

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

        
          // ------user---------------
          // deckcard.map((card) => {
          //   if (card.id === userid) {
          //     dispatch(UserSetImg(card.img));
          //   }})

          // const getuserfalse=deckcard.filter((card)=>card.id !==userid)

          // console.log(getuserfalse,"userfaa")
          // setUserCards(getuserfalse)
        }, 1000);
      }
      setCurrentIndex(currentIndex - 1);
    }
  }, [userCardimg]);

  // const cardHeight = (i) => ({
  //   height: `calc(100% - ${usercards.length * (1 / 2)}px)`,
  //   transform: `translateY(${i * 1}px)`,
  // });

  return (
    <>
      {gameOver || compcarddata.length === 0 ? (
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
        // <div className="outer-div">
        //   {compcard.length !== 0 &&
        //     compcard.map((card, i) => (
        //       <div
        //         key={card.id}
        //         style={cardHeight(i)}
        //         className={`card ${card.isFlipped ? "flipped" : ""}`}
        //       >
        //         <div>
        //           <div className="card-front">
        //             <img src="./img/Image verso card.png" />
        //           </div>
        //         </div>
        //       </div>
        //     ))}
        // </div>
        // <motion.article className="board">
        //   {compcarddata.length !== 0 &&
        //     compcarddata.map((card, i) => (
        //       <motion.div
        //         id={`button_id_${i}`}
        //         key={i}
        //         className={`cards computer_card  ${
        //           flippedIndex === i ? "cards:nth-child(${i+1} flipped" : " "
        //         } `}
        //         animate={{
        //           scale: [1, 2, 2, 1, 1],
        //           rotate: [0, 0, 270, 270, 0],
        //           borderRadius: ["20%", "20%", "50%", "50%", "20%"],
        //         }}
        //       >
        //         <span className="wrapper">
        //           <span className="content">
        //             <span className="face back">
        //               <img alt={card.id} src="./img/Image verso card.png" />
        //             </span>
        //             <span className="face front">
        //               <img src={AIimg} />
        //             </span>
        //           </span>
        //         </span>
        //       </motion.div>
        //     ))}
        // </motion.article>
        <article className="board">
        {compcarddata.length !== 0 &&
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
                  <span className="face front">
                    <img src={AIimg} />
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
