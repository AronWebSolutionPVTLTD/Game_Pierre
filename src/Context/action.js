export const LoadingProcess = (value) => {
  return {
    type: "loading",
    payload: value,
  };
};
export const Flipped = (value) => {
  return {
    type: "flippedCard",
    payload: value,
  };
};
export const Shuffled = (value) => {
  return {
    type: "shuffledCards",
    payload: value,
  };
};
export const UserSetImg = (value) => {
  return {
    type: "userImg",
    payload: value,
  };
};
export const AIsetImg = (value) => {
  return {
    type: "AiImg",
    payload: value,
  };
};
export const RecoveryImg = (value) => {
  return {
    type: "recoveryimg",
    payload: value,
  };
};
export const GameOver = (value) => {
  return {
    type: "gameOver",
    payload: value,
  };
};
export const MainValueSelected = (value) => {
  return {
    type: "mainValue",
    payload: value,
  };
};
export const UserNameColor = (value) => {
  return {
    type: "userColor",
    payload: value,
  };
};
export const AINameColor = (value) => {
  return {
    type: "AIColor",
    payload: value,
  };
};
export const WonPiles = (value) => {
  return {
    type: "woncards",
    payload: value,
  };
};
export const AiWonPiles = (value) => {
  return {
    type: "aiwoncards",
    payload: value,
  };
};

export const RecoveryCard = (value) => {
  return {
    type: "recoveryCard",
    payload: value,
  };
};
export const CorrectValue = () => {
  return {
    type: "correctValue",
  };
};

export const WrongValue = () => {
  return {
    type: "wrongvalue",
  };
};
export const TurnOver = () => {
  return {
    type: "turnover",
  };
};

export const UserBattle = (value) => {
  return {
    type: "userbattlie",
    payload: value,
  };
};

export const CompBattle = (value) => {
  return {
    type: "compbattlie",
    payload: value,
  };
};
