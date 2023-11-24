import React, { useContext, useEffect, useState } from "react";
import { GameContext } from "../Context/GameContext";
import {
  Flipped,
  GameOver,

  MainValueSelected,
  TurnOver,
  UserNameColor,
  UserSetImg,
} from "../Context/action";
import { motion } from "framer-motion";

import shuffleR from "./Home/GameLogistics";
import './bakwass.css'
const Deck = () => {
  const {
    state,
    dispatch,
    usercards,
    setUserCards,
    setNextTurn,
    nextturn,
    compcard,
    valueSelected,
    setValueSelected,
    turnover,
    cardmatchValue,
    flipback,
    setFlipBack,
    setTimerEnable,
    recoverycarduse,setRecoveryCardUse,
    deckcard,setdeckcard
  } = useContext(GameContext);

  const { gameOver, loading, shuffle, recoveryCard,userCardimg} = state;

// const[deckcard,setdeckcard]=useState ([{deckcard:0}])


  useEffect(() => {
    if (deckcard[0]?.deckcard === 0) { 
      setUserCards(state.cards);
    }
  }, [state.cards]);

  console.log(usercards,"user")
  
  
  // -------------RECOVERY CARD_______________
  useEffect(() => {
    setUserCards((prevCards) => [...prevCards, ...recoveryCard]);
    dispatch(UserNameColor(true)) 
  }, [recoveryCard]);

  useEffect(() => {
    const getShuffledData = shuffleR(state.cards);
    setUserCards(getShuffledData);
  }, [shuffle]);
  // const flipcardCss = (i) =>({transform: `translateZ(${i*3}px)`})





  const flipCard = (id, value, card,e) => {
  
    // debugger
    console.log(e.currentTarget)
   
    if (!valueSelected) {
      
      dispatch(Flipped(true));
      dispatch(MainValueSelected(true));
      setRecoveryCardUse(false)
      // dispatch(UserNameColor(true));
      setTimerEnable(true);

      localStorage.setItem(
        "cardvalue",
        JSON.stringify({ userCard: card, cardvalue: value })
      );
      if (gameOver) {
        return alert("Game over");
      }
      if (loading) {
        return alert("Wait for computer turn");
      }
      const updatedCards = usercards.map((card) => {
        if (card.id === id) {
          e.currentTarget.classList.add('flipped');
       
          dispatch(UserSetImg(card.img));

          return { ...card, isFlipped: true };
        } else {
          return card
        }
      });         
     
      const getFalse = updatedCards.filter((el) => el.isFlipped === false);
      setdeckcard(getFalse)
  // setdeckcard(updatedCards);
      setUserCards(updatedCards);
      setValueSelected(true);
   
    } 
    // else {
    //   alert("select the value to continue the game");
    // }
    setFlipBack(false);
    dispatch(TurnOver());
  };


  const cardHeight = (i) => ({
    height: `calc(100% - ${usercards.length * (1 / 2)}px)`,
    transform: `translateY(${i * 1}px)`,
  });


  return (
    <>
      {gameOver || usercards.length === 0 ? (
        <div
          style={{
            width: "100%",
            border: "3px solid",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            fontSize: "17px",
            fontWeight: "bold",
            height: "100%",
          }}
        >
          <p>PLUS DE CARTES</p>
        </div>
      ) : (
        // <div className="outer-div">
        //   {usercards.length !== 0 &&
        //     usercards.map((card, i) => (
        //       <div
        //         key={i}
        //         style={cardHeight(i)}
        //         className={`card ${card.isFlipped ? "flipped" : ""}`}
        //         onClick={() => flipCard(card.id, card.value, card)}
        //       >
        //         <div>
        //           <div className="card-front">
        //             <img alt={card.id} src="./img/Image verso card.png" />
        //           </div>
        //         </div>
        //       </div>
        //     ))}
        // </div>

        <article className="board">
          
            {deckcard.length == 0 ?<> <span className="card-text">
            PLUS DE CARTES
              </span>
              <div className={`cards user_card flipped `}>
              
              <span className="wrapper">
                <span className="content">
                  <span className="face back"> 
                    <img  src="./img/Image verso card.png"/>
                  </span>
                  <span className="face front"><img src={userCardimg} /></span>
                </span>
              </span>
            </div></> :usercards.length !== 0 &&
            usercards.map((card, i) => (
    <div 
            // style={flipcardCss(i)} 
            id={`button_id_${i}`}
            key={i} className={`cards user_card cards:nth-child(${i+1}) `} 
            onClick={(e) => {
            flipCard(card.id, card.value, card,e)}} alt={card.id}>

              <span className="wrapper"><span className="content">
                  <span className="face back"> 
                    <img  src="./img/Image verso card.png"/>
                  </span>
                  <span className="face front"><img src={userCardimg}/></span>
                </span>
              </span>
            </div>
             ))}  
        </article> 

      )}
    </>
  );
};

export default Deck;
