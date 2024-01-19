const express = require("express");
require("dotenv").config();
const Port = process.env.PORT;
const app = express();
const connectDB = require("./mongodb");
const userRouter = require("./router/user");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors());
app.use(express.json());
connectDB();
app.use("/api", userRouter);
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: [`http://localhost:3000`, "http://localhost:3001"],
    methods: ["GET", "POST", "PATCH", "DELETE"],
  },
});

let datau = [
  { id: 1, isFlipped: false, img: "/img/8_noire.jpg", value: "1" },
  { id: 2, isFlipped: false, img: "/img/7 blanche.jpg", value: "2" },
  { id: 3, isFlipped: false, img: "/img/16_reprise.jpg", value: "0.75" },
  { id: 4, isFlipped: false, img: "/img/5 la ronde.jpg", value: "4" },
  {
    id: 5,
    isFlipped: false,
    img: "/img/Bataille rytmique BON 07 2022_35.jpg",
    value: "1",
  },
];

const CHAT_BOT = "ChatBot";
let chatRoom = "";
let allUsers = [];
let playerQueue = [];
let currentPlayer = null;
let checkCardFlipped = false;
io.on("connection", (socket) => {
  console.log(`Koi to connect hua ${socket.id}`);

  //Room Joining:------------------------------------->
  socket.on("join_room", (data) => {
    const { Username: username, room } = data;

    console.log(data);
    socket.join(room);

    let __createdtime__ = Date.now();
    socket.to(room).emit("receive_message", {
      message: `${username} has joined the sixcard game`,
      username: CHAT_BOT,
      __createdtime__,
    });

    socket.emit("receive_message", {
      message: `Welcome ${username}`,
      username: CHAT_BOT,
      __createdtime__,
    });

    chatRoom = room;
    const newPlayer = {
      id: socket.id,
      username,
      room,
      points: 0,
      card: datau,
      currentCard: null,
    };
    allUsers.push(newPlayer);
    chatRoomUsers = allUsers.filter((user) => user.room === room);

    socket.to(room).emit("chatroom_users", chatRoomUsers);
    socket.emit("chatroom_users", chatRoomUsers);

    playerQueue.push(socket.id);
    //Queue check:---------------------------------->
    if (playerQueue.length >= 2 && currentPlayer === null) {
      currentPlayer = playerQueue.shift();
      io.to(currentPlayer).emit("your_turn");
    }
  });
  // Card Flipping:-------------------------------------------->
  socket.on("send_card", (data) => {
    const { room, id } = data;
    if (currentPlayer !== socket.id) {
      const message = `Wait for opponent turn`;
      return socket.emit("receive_message", {
        message,
        username: CHAT_BOT,
        __createdtime__: Date.now(),
      });
    }
    if (socket.id === currentPlayer) {
      playerQueue.push(currentPlayer);
      // currentPlayer = null;
      checkCardFlipped = true;

      chatRoomUsers = allUsers.filter((user) => user.room === room);
      const updatedCards = chatRoomUsers.map((el) => {
        if (el.id === socket.id) {
          const updatedCards = el.card.map((card) => {
            el.currentCard = card;
            if (card.id === id) {
              return { ...card, isFlipped: true };
            } else {
              return { ...card, isFlipped: false };
            }
          });
          const getFalse = updatedCards.filter((el) => el.isFlipped === false);
          return { ...el, card: getFalse };
        } else {
          return el;
        }
      });
      allUsers = [];
      allUsers.push(...updatedCards);
      console.log(allUsers, "ALL USERS");
      io.in(room).emit("chatroom_users", allUsers);
    } else {
      socket.emit("not_your_turn");
    }
  });

  //CARD EMPTY CHECK:______________________________}}
  function checkAllCardsEmpty() {
    return allUsers.every((user) => user.card.length === 0);
  }
  //Winner :_____________________{{{{{PROCESS}}}}}
  function findWinner() {
    let maxPoints = -1;
    let winners = [];

    allUsers.forEach((user) => {
      if (user.points > maxPoints) {
        maxPoints = user.points;
        winners = [user];
      } else if (user.points === maxPoints) {
        winners.push(user);
      }
    });

    return winners;
  }
  //GAME RESULT:::::::::::::::::::::::______________"""
  function sendGameResult() {
    const winners = findWinner();
    let message = "Game Over! ";
    if (winners.length === 1) {
      message += `${winners[0].username} wins with ${winners[0].points} points!`;
    } else {
      message += "It's a tie! Winners: ";
      message += winners.map((winner) => winner.username).join(", ");
    }

    io.in(chatRoom).emit("receive_message", {
      message,
      username: CHAT_BOT,
      __createdtime__: Date.now(),
    });
  }

  //Card Point:---------------------------------------------------------->
  socket.on("showHighlight", (data) => {
    const { room, color } = data;

    if (currentPlayer !== socket.id) {
      const message = `Wait for opponent turn`;
      return socket.emit("receive_message", {
        message,
        username: CHAT_BOT,
        __createdtime__: Date.now(),
      });
    }
    if (!checkCardFlipped) {
      const message = `Flip the card first.`;
      return socket.emit("receive_message", {
        message,
        username: CHAT_BOT,
        __createdtime__: Date.now(),
      });
    }
    chatRoomUsers = allUsers.filter((user) => user.room === room);

    const updatedCards = chatRoomUsers.map((el) => {
      if (el.id === socket.id && color === "1") {
        el.points += 1;
        return { ...el, points: el.points };
      } else {
        return el;
      }
    });
    allUsers = [];
    allUsers.push(...updatedCards);
    currentPlayer = null;
    if (playerQueue.length > 0) {
      currentPlayer = playerQueue.shift();
      io.to(currentPlayer).emit("your_turn");
    }
    checkCardFlipped = false;
    io.in(chatRoom).emit("status", data);
    io.in(chatRoom).emit("chatroom_users", chatRoomUsers);
    if (checkAllCardsEmpty()) {
      sendGameResult();
    }
  });

  //Disconnection --------------------------------------------------------------->
  socket.on("disconnect", () => {
    const disconnectedPlayer = allUsers.find((user) => user.id === socket.id);
    if (disconnectedPlayer?.id == currentPlayer) {
      currentPlayer = null;
    }
    if (disconnectedPlayer) {
      const { username } = disconnectedPlayer;
      const message = `${username} has left the game.`;
      io.in(chatRoom).emit("receive_message", {
        message,
        username: CHAT_BOT,
        __createdtime__: Date.now(),
      });
    }

    chatRoomUsers = allUsers.filter((user) => user.id !== socket.id);
    allUsers = [];
    allUsers.push(...chatRoomUsers);
    setup = playerQueue.filter((user) => user !== socket.id);
    playerQueue = [];
    playerQueue.push(...setup);
    io.in(chatRoom).emit("chatroom_users", chatRoomUsers);
  });
});

app.get("/", (req, res) => {
  res.send("Hello world");
});

server.listen(Port, () => console.log(`http://localhost:${Port}`));
