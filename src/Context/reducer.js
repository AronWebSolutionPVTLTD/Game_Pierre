export const reducer = (state, action) => {
  switch (action.type) {
    case "cards":
      return { ...state, cards: action.payload };
    case "loading":
      return { ...state, loading: action.payload };

    case "flippedCard":
      return { ...state, cardFlipped: action.payload };
    case "shuffledCards":
      return { ...state, shuffle: action.payload };
    case "userImg":
      return { ...state, userCardimg: action.payload };
    case "AiImg":
      return { ...state, AIimg: action.payload };
    case "recoveryimg":
      return { ...state, recoveryimg: action.payload };
    case "gameOver":
      return { ...state, gameOver: action.payload };
    case "mainValue":
      return { ...state, mainvalueselect: action.payload };
    case "userColor":
      return { ...state, userNameColor: action.payload };
    case "AIColor":
      return { ...state, compNameColor: action.payload };
    case "woncards":
      return { ...state, wonCards: [...state.wonCards, action.payload] };
    case "woncardsfiltered":
      return { ...state, wonCards: action.payload };
    case "woncardsempty":
      return { ...state, wonCards: [] };
    case "aiwoncards":
      return { ...state, aiwonCards: [...state.aiwonCards, action.payload] };
    case "aiwoncardsempty":
      return { ...state, aiwonCards: [] };
    case "recoveryCard":
      return {
        ...state,
        recoveryCard: [action.payload],
      };
    case "correctValue":
      return { ...state, correctValue: state.correctValue + 1 };
    case "correctValueempty":
      return {
        ...state,
        correctValue: 0,
      };
    case "wrongvalue":
      return { ...state, wrongvalue: state.wrongvalue + 1 };
    case "wrongvalueempty":
      return {
        ...state,
        wrongvalue: 0,
      };
    case "turnover":
      return { ...state, turnover: state.turnover + 1 };
    case "turnoverempty":
      return {
        ...state,
        turnover: 0,
      };
    case "userbattlie":
      return {
        ...state,
        userBattle: [...state.userBattle, action.payload],
      };
    case "battlieEmpty":
      return { ...state, userBattle: [] };

    case "compbattlie":
      return {
        ...state,
        compBattle: [...state.compBattle, action.payload],
      };
    case "compBattlieEmpty":
      return { ...state, compBattle: [] };
    default:
      return state;
  }
};
