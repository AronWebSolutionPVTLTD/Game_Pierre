import { useReducer } from "react";
import { reducer } from "./reducer";
import { createContext } from "react";
import { useState } from "react";
import { useEffect } from "react";

export const GameContext = createContext();

let data = [
  {
    id: 1,
    isFlipped: false,
    name: "pause",
    img: "/img/7 pause.jpg",
    value: 4,
  },
  {
    id: 2,
    isFlipped: false,
    name: "soupir",
    img: "/img/8 soupir.jpg",
    value: 1,
  },
  {
    id: 3,
    isFlipped: false,
    name: "2 croches",
    img: "/img/9 2 croches.jpg",
    value: 1,
  },
  {
    id: 4,
    isFlipped: false,
    name: "croche",
    img: "/img/5 croche.jpg",
    value: 0.5,
  },

  {
    id: 5,
    isFlipped: false,
    name: " point d_orgue",
    img: "/img/11 point d_orgue.jpg",
    value: "Joker",
  },
  {
    id: 6,
    isFlipped: false,
    name: "noire",
    img: "/img/4 noire.jpg",
    value: 1,
  },
  {
    id: 7,
    isFlipped: false,
    name: "2 croches attachées",
    img: "/img/10 2 croches attachées.jpg",
    value: 1,
  },

  {
    id: 8,
    name: "ronde",
    isFlipped: false,

    img: "/img/1 la ronde.jpg",
    value: 4,
  },
  {
    id: 9,
    isFlipped: false,
    name: "blanche pointée",
    img: "/img/2 blanche pointée.jpg",
    value: 3,
  },
  {
    id: 10,
    isFlipped: false,
    name: "blanche",
    img: "/img/3 blanche.jpg",
    value: 2,
  },

  {
    id: 11,
    isFlipped: false,
    name: "double croche",
    img: "/img/6 double croche.jpg",
    value: 0.25,
  },

  {
    id: 12,
    isFlipped: false,
    name: "noire pointée",
    img: "/img/13 noire pointée.jpg",
    value: 1.5,
  },
  {
    id: 13,
    isFlipped: false,
    name: "la croche pointée",
    img: "/img/14 la croche pointée.jpg",
    value: 0.75,
  },
  {
    id: 14,
    isFlipped: false,
    name: "la croche pointée double",
    img: "/img/15 la croche pointée double.jpg",
    value: 1,
  },
  {
    id: 15,
    isFlipped: false,
    name: "croche pointée double attaché",
    img: "/img/16 croche pointée double attaché.jpg",
    value: 1,
  },
  {
    id: 16,
    isFlipped: false,
    name: "demi pause",
    img: "/img/17 demi pause.jpg",
    value: 2,
  },
  {
    id: 17,
    isFlipped: false,
    name: "demi-soupir pointé double",
    img: "/img/18 demi-soupir pointé double.jpg",
    value: 1,
  },
  {
    id: 18,
    isFlipped: false,
    name: "demi soupir",
    img: "/img/19 demi soupir.jpg",
    value: 0.5,
  },
  {
    id: 19,
    isFlipped: false,
    name: "triolet de croches",
    img: "/img/20 Triolet de croches.jpg",
    value: 1,
  },
  {
    id: 20,
    isFlipped: false,
    name: "triolet de croches attachées",
    img: "/img/21 Triolet de croches attachées.jpg",
    value: 1,
  },
  {
    id: 21,
    isFlipped: false,
    name: "4 doubles croches",
    img: "/img/22 4 doubles croches.jpg",
    value: 1,
  },
  {
    id: 22,
    isFlipped: false,
    name: "4 doubles croches attachées",
    img: "/img/23 4 doubles croches attachées.jpg",
    value: 1,
  },
  {
    id: 23,
    isFlipped: false,
    name: "syncopette",
    img: "/img/24 syncopette.jpg",
    value: 1,
  },
  {
    id: 24,
    isFlipped: false,
    name: "syncopette attachées",
    img: "/img/25 syncopette attachées.jpg",
    value: 1,
  },
  {
    id: 25,
    isFlipped: false,
    name: "syncope.",
    img: "/img/26 syncope.jpg",
    value: 2,
  },
  {
    id: 26,
    isFlipped: false,
    name: "croche 2 doubles",
    img: "/img/27 croche 2 doubles.jpg",
    value: 1,
  },
  {
    id: 27,
    isFlipped: false,
    name: "croche 2 doubles attachées",
    img: "/img/28 croche 2 doubles attachées.jpg",
    value: 1,
  },
  {
    id: 28,
    isFlipped: false,
    name: "2 doubles 1 croche",
    img: "/img/29 2 doubles 1 croche.jpg",
    value: 1,
  },
  {
    id: 29,
    isFlipped: false,
    name: "2 doubles 1 croche attachées",
    img: "/img/30 2 doubles 1 croche attachées.jpg",
    value: 1,
  },
  {
    id: 30,
    isFlipped: false,
    name: "demi soupir croche",
    img: "/img/31 demi soupir croche.jpg",
    value: 1,
  },
  {
    id: 31,
    isFlipped: false,
    name: "croche demi soupir",
    img: "/img/32 croche demi soupir.jpg",
    value: 1,
  },
  {
    id: 32,
    isFlipped: false,
    name: "noire pointée croche",
    img: "/img/33 noire pointée croche.jpg",
    value: 2,
  },
  {
    id: 33,
    isFlipped: false,
    name: "2 doubles croches",
    img: "/img/34 2 doubles croches.jpg",
    value: 0.5,
  },
  {
    id: 34,
    isFlipped: false,
    name: "2 doubles croches attachées",
    img: "/img/35 2 doubles croches attachées.jpg",
    value: 0.5,
  },
  {
    id: 35,
    isFlipped: false,
    name: "demi soupir pointé",
    img: "/img/36 demi soupir pointé.jpg",
    value: 0.75,
  },
  {
    id: 36,
    isFlipped: false,
    name: "quart de soupir",
    img: "/img/37 quart de soupir.jpg",
    value: 0.25,
  },
  {
    id: 37,
    isFlipped: false,
    name: "demi-pause pointée",
    img: "/img/38 demi-pause pointée.jpg",
    value: 3,
  },
  {
    id: 38,
    isFlipped: false,
    name: "soupir pointé",
    img: "/img/39 soupir pointé.jpg",
    value: 1.5,
  },
];

const values = [0.25, 0.5, 0.75, 1, 1.5, 2, 3, 4, "Joker"];
export const AppContextProvider = ({ children }) => {
  const initialState = {
    clickvalue: values,
    cards: [],
    loading: false,
    shuffle: false,
    userCardimg: "",
    AIimg: "",
    cardFlipped: false,
    gameOver: false,
    mainvalueselect: false,
    userNameColor: false,
    compNameColor: false,
    wonCards: [],
    aiwonCards: [],
    recoveryCard: [],
    correctValue: 0,
    wrongvalue: 0,
    turnover: 0,
    cardcount: 0,
    userBattle: [],
    compBattle: [],
    recoveryimg: "",
  };
  const [defaultbinary, setDefaultBinary] = useState(data);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [compcard, setCompCard] = useState([]);
  const [compcarddata, setCompCardData] = useState([]);
  const [deckcard, setdeckcard] = useState([{ deckcard: 0 }]);
  const [usercards, setUserCards] = useState([]);
  const [nextturn, setNextTurn] = useState(true);
  const [valueSelected, setValueSelected] = useState(false);
  const [clickcount, setClickCount] = useState(3);
  const [flipback, setFlipBack] = useState(false);
  const [flipwondeck, setFlipwonDeck] = useState(true);
  const [timerenable, setTimerEnable] = useState(false);
  const [timerValue, setTimerValue] = useState(120);

  const [userpoint, setUserPoint] = useState(false);
  const [comppoint, setCompPoint] = useState(false);
  const [strongvalue, setStrongValue] = useState(false);
  const [cardmatchValue, setCardMatchedValue] = useState(false);
  const [color, setColor] = useState("");
  const [recoverycarduse, setRecoveryCardUse] = useState(false);
  const [flippedIndex, setFlippedIndex] = useState("");
  const [currentIndex, setCurrentIndex] = useState("");
  const [flippedcardarray, setFlippedCardArray] = useState([]);
  const [truevaluearray, setTrueValueArray] = useState([]);
  const [compflippedcardarray, setCompFlippedCardArray] = useState([]);
  const [comptruevaluearray, setCompTrueValueArray] = useState([]);
  const [averageresponsetime, setAverageResponseTime] = useState([]);
  const [averageresponsetimecomp, setAverageResponseTimeComp] = useState([]);
  // __________setting_____________________
  const [selectedmode, setSelectedMode] = useState("binary");
  const [selectedcardvalue, setselectedCardValue] = useState("noire");
  const [binaryfiltercard, setBinaryFilterCard] = useState([]);

  const [compturnstop, setCompturnStop] = useState(false);
  const [premium, setPremium] = useState(false);
  const [hometimer, setHomeTimer] = useState();

  const updateCardValues = (selectedValue) => {
    const updatedData = state.cards.map((card) => {
      if (card.value) {
        switch (selectedValue) {
          case "noire":
            return { ...card, value: card.value };
          case "blanche":
            // return { ...card, value: card.value / 2 };
            return {
              ...card,
              value: card.value === "Joker" ? card.value : card.value / 2,
            };
          case "croche":
            return {
              ...card,
              value: card.value !== "Joker" ? card.value * 2 : card.value,
            };

          default:
            return card;
        }
      }
      return card;
    });
    if (state.cards.length !== 0) {
      dispatch({ type: "cards", payload: updatedData });
    }
  };

  useEffect(() => {
    updateCardValues(selectedcardvalue);
  }, [selectedcardvalue]);

  return (
    <GameContext.Provider
      value={{
        state,
        dispatch,
        compcard,
        setCompCard,
        usercards,
        setUserCards,
        nextturn,
        setNextTurn,
        valueSelected,
        setValueSelected,
        clickcount,
        setClickCount,
        flipback,
        setFlipBack,
        flipwondeck,
        setFlipwonDeck,
        timerenable,
        setTimerEnable,
        timerValue,
        setTimerValue,

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
        recoverycarduse,
        setRecoveryCardUse,
        compcarddata,
        setCompCardData,
        flippedIndex,
        setFlippedIndex,
        currentIndex,
        setCurrentIndex,
        selectedmode,
        setSelectedMode,

        binaryfiltercard,
        setBinaryFilterCard,
        defaultbinary,
        setDefaultBinary,
        selectedcardvalue,
        setselectedCardValue,
        deckcard,
        setdeckcard,
        compturnstop,
        setCompturnStop,
        premium,
        setPremium,
        hometimer,
        setHomeTimer,
        flippedcardarray,
        setFlippedCardArray,
        truevaluearray,
        setTrueValueArray,
        compflippedcardarray,
        setCompFlippedCardArray,
        comptruevaluearray,
        setCompTrueValueArray,
        averageresponsetime,
        setAverageResponseTime,
        averageresponsetimecomp,
        setAverageResponseTimeComp,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
