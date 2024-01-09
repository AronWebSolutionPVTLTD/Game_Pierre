import React, { useContext, useEffect, useState } from "react";
import { GameContext } from "../Context/GameContext";
import {
  Flipped,

  MainValueSelected,
  TurnOver,
  UserNameColor,
  UserSetImg,
} from "../Context/action";


import shuffleR from "./Home/GameLogistics";
import "./bakwass.css";
import { toast } from "react-toastify";
const Deck = () => {
  const {
    state,
    dispatch,
    usercards,
    setUserCards,

    valueSelected,
    setValueSelected,
 
    setFlipBack,
    setTimerEnable,
   
    setRecoveryCardUse,
    deckcard,
    setdeckcard,
    hometimer
  } = useContext(GameContext);

  const { gameOver, loading, shuffle, recoveryCard, userCardimg } = state;
const [oldTarget, setOldTarget] = useState(null);

const [lastFlippedCard,setLasFlippedCard]=useState(null)



  useEffect(() => {
    if (deckcard[0]?.deckcard === 0 && deckcard.length == 1) {
      setUserCards(state.cards);
    }
  }, [deckcard, state.cards]);



 

useEffect(() => {
  setUserCards((prevCards) => {
    const newCards = [...prevCards];
    const maxCardCount = hometimer || 0; 
    const existingCardCount = prevCards.length;

    if (maxCardCount < existingCardCount) {
    
      return prevCards;
    }

    for (let i = existingCardCount; i < maxCardCount; i++) {
      // Copy details from existing cards
      const existingCardIndex = i % existingCardCount;
      const existingCard = prevCards[existingCardIndex];

      // Duplicate the existing card details
      const newCard = {
        id: i + 1,
        value: existingCard.value,
        isFlipped: existingCard.isFlipped || false,
        img: existingCard?.img,
      };

      newCards.push(newCard);
    }

    return newCards;
  });
}, [hometimer]);


 
  // -------------RECOVERY CARD_______________
  useEffect(() => {
    setUserCards((prevCards) => [...(prevCards || []), ...recoveryCard]);
    dispatch(UserNameColor(true));
  }, [recoveryCard]);

  useEffect(() => {
    const getShuffledData = shuffleR(state.cards);
    setUserCards(getShuffledData);
  }, [shuffle]);



  const flipCard = (id, value, card, e) => {
 
    if (!valueSelected) {
      dispatch(TurnOver());
      dispatch(Flipped(true));
      dispatch(MainValueSelected(true));
      setRecoveryCardUse(false);

      setTimerEnable(true);

      localStorage.setItem(
        "cardvalue",
        JSON.stringify({ userCard: card, cardvalue: value }),
      );
      if (gameOver) {
        return alert("Game over");
      }
      if (loading) {
        return alert("Wait for computer turn");
      }

      const updatedCards = usercards.map((card) => {
        
        if (card.id === lastFlippedCard) {
       oldTarget && oldTarget.classList.add('flipped_done');
        }
        if (card.id === id) {
          e.currentTarget.classList.add("flipped");
          dispatch(UserSetImg(card.img));

          return { ...card, isFlipped: true };
        } else {
          return card;
        }
      });

      const getfalse=updatedCards.filter((el)=>el.isFlipped===false)
    setdeckcard(getfalse)
      setUserCards(updatedCards);
      setLasFlippedCard(id);
      setValueSelected(true);
setOldTarget(e.currentTarget);


      
    }
    else {
      toast("Sélectionnez la valeur pour continuer le jeu");
    }
    setFlipBack(false);

  };

  return (
    <>
      {gameOver || usercards?.length === 0 ? (
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
        <article className="board">
          {deckcard?.length === 0 ? (
            <>
              <span className="card-text">PLUS DE CARTES</span>
              <div className={`cards user_card flipped `}>
                <span className="wrapper">
                  <span className="content">
                    <span className="face back">
                      <img src="./img/Image verso card.png" />
                    </span>
                    <span id="After_load_outer" className="face front">
                      <img className="After_load" src={userCardimg} />
                    </span>
                  </span>
                </span>
              </div>
            </>
          ) : (
            usercards?.length !== 0 &&
            usercards?.map((card, i) => (
              <div
                id={`button_id_${i}`}
                key={i}
                className={`cards user_card cards:nth-child(${i + 1}) `}
                onClick={(e) => {
                  flipCard(card.id, card.value, card, e);
                }}
                alt={card.id}
              >
                <span className="wrapper">
                  <span className="content">
                    <span className="face back">
                      <img src="./img/Image verso card.png" />
                    </span>
                    <span id="After_load_outer" className="face front">
                      <img className="After_load" src={userCardimg} />
                    </span>
                  </span>
                </span>
              </div>
            ))
          )}
        </article>
      )}
    </>
  );
};

export default Deck;
