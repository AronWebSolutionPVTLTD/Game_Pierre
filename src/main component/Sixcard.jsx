import { useCallback, useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import { Points } from "../components/Home/Points";
import { toast, ToastContainer } from "react-toastify";
import "./Sixcard.css";
import "react-toastify/dist/ReactToastify.css";
import { FaRobot } from "react-icons/fa";
import { RoomForm } from "./RoomForm";

const socket = io("http://localhost:4000", { transports: ["websocket"] });

function Sixcard() {
  const [username, setUsername] = useState("");
  const [check, setCheck] = useState(0);
  const [room, setRoom] = useState("");
  const [play, setPlay] = useState(false);
  const [players, setPlayers] = useState([]);
  const [coloured, setColoured] = useState({});
  const [flippedcard, setFlippedCard] = useState({});
  const [timer, setTimer] = useState(20);
  const [start, setStart] = useState(false);
  const [user, setUser] = useState("");
  const [flipcardvalue, setFlippedCardValue] = useState("");

  useEffect(() => {
    socket.on("status", (data) => {
      setColoured(data);
      setTimeout(() => {
        setColoured({ color: "", checkValue: 0 });
      }, 2000);
    });
    return () => {
      socket.off("status");
    };
  }, []);

  useEffect(() => {
    players.map((el) => {
      setUser(el.username);
    });
  }, [user]);

  // TO FORMAT TIME
  const formattedTime = (timer) => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    const ok = `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
    return ok;
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      // toast.info(`${data.message}`, {
      //   position: "top-right",
      //   autoClose: 5000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: "dark",
      //   icon: <FaRobot />,
      // });

      toast(`${data.message}`);
      setTimeout(() => {
        if (data?.remove) {
          setPlay(false);
        }
      }, 2000);
    });
    return () => {
      socket.off("receive_message");
    };
  }, []);

  useEffect(() => {
    socket.on("chatroom_users", (data) => {
      console.log(data);
      setPlayers(data);
    });
    socket.on("startGame", (data) => {
      console.log(data);
      setStart(data);
    });

    return () => {
      socket.off("chatroom_users");
      socket.off("startGame");
    };
  }, []);

  const sendMessage = (card, id, socketId, play, cardValue) => {
    if (!play) {
      return toast("Wait for other player to have his turn");
    }

    if (socket.id === socketId && check !== 1) {
      setCheck(1);
      setFlippedCard(card);
      setFlippedCardValue(cardValue);
      socket.emit("send_card", { card, id, room });
    } else {
      toast("You can't play with opponent cards");
    }
  };

  // FOR TIMER:------->
  useEffect(() => {
    if (start) {
      let interval = null;
      if (timer > 0) {
        interval = setInterval(() => {
          setTimer((prevTimer) => prevTimer - 1);
        }, 1000);
      } else {
        socket.emit("stopGame", { room });
      }

      return () => {
        if (interval) {
          clearInterval(interval);
        }
      };
    }
  }, [timer, start]);

  const PointsClick = (value) => {
    if (flippedcard.value === value && check == 1) {
      setCheck(0);
      socket.emit("showHighlight", {
        color: "1",
        checkValue: value,
        room,
      });
      toast(`${username} + 1 Point`);
    } else {
      if (check == 1) {
        setCheck(0);
        socket.emit("showHighlight", {
          color: "2",
          checkValue: value,
          room,
        });
      }
      toast(`La valeur correcte est: ${flipcardvalue}`);
    }
  };

  const cardHeight = (i) => ({
    height: `calc(100% - ${players[0]?.card.length * 1}px)`,
    transform: `translateY(${i * 2}px)`,
  });
  const WoncardHeight = (i) => ({
    height: `calc(100% - ${players[0]?.card.length * 4}px)`,
    transform: `translateY(${i * 2}px)`,
  });
  // Play GAME:------------------>
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      socket.emit("join_room", { Username: username, room }); // Provide an empty array for the card on join
      setPlay(true);
    },
    [username, room],
  );

  return (
    <>
      {timer == 0 ? <>TIMER KHTM</> : ""}
      {!play && (
        <RoomForm
          onHandleSubmit={handleSubmit}
          username={username}
          room={room}
          setUsername={setUsername}
          setRoom={setRoom}
        />
      )}
      {play && (
        <div
          className="container mt-5 py-2"
          style={{ border: "2px solid blue" }}
        >
          <div className="p-2" style={{ border: "2px solid" }}>
            <div className="row">
              {players.map((el, i) => (
                <>
                  <div className={`col-md-3 col-cards`} key={i}>
                    <h5 style={{ textAlign: "center" }}>
                      {`User ${el.username}`}
                    </h5>
                    <div className="outer-div-wrapper">
                      <div
                        className={`outer-div ${
                          el?.card.length === 0 ? "outer-div-empty" : ""
                        }`}
                      >
                        {el?.card.length !== 0 ? (
                          el?.card.map((card, i) => (
                            <div
                              style={cardHeight(i)}
                              key={i}
                              className={`card ${
                                card.isFlipped ? "flipped" : ""
                              }`}
                              onClick={() =>
                                sendMessage(
                                  card,
                                  card.id,
                                  el.id,
                                  el.play,
                                  card?.value,
                                )
                              }
                            >
                              <div>
                                <div className="card-front">
                                  <img
                                    alt={card.id}
                                    src="./img/Image verso card.png"
                                  />
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="incoming_card h-100">
                            {" "}
                            <div
                              className="front_card_text"
                              style={{ border: "3px solid black" }}
                            >
                              <p>No more cards left</p>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="inputSix_wrapper">
                        <input
                          className="inputSix"
                          type="text"
                          value={el.points}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3 col-cards">
                    <h5
                      className="inVissible_el"
                      style={{ textAlign: "center" }}
                    >
                      {`User ${el.username}`}
                    </h5>
                    <div className="outer-div-wrapper">
                      <div className="incoming_card outer-div">
                        {el?.currentCard?.img ? (
                          <img
                            className="incoming_card_image"
                            width={"100px"}
                            src={el?.currentCard?.img}
                            alt="shivam"
                          />
                        ) : (
                          <div className="front_card_text">
                            <div
                              className="front_card_text"
                              style={{ border: "3px solid black" }}
                            >
                              <p>Flip the card</p>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="inputSix_wrapper inVissible_el">
                        <input
                          className="inputSix"
                          type="text"
                          value={el.points}
                        />
                      </div>
                    </div>
                  </div>
                </>
              ))}
            </div>
            <div className="col-md-10 point-col">
              <Points
                color={coloured?.color}
                checkValue={coloured?.checkValue}
                handleClick={PointsClick}
              />
              <div className="row justify-content-between">
                {players.map((el) => (
                  <div className="col-md-3">
                    <div className="outer-div">
                      {el?.wonCards.map((card, i) => (
                        <div
                          key={i}
                          style={WoncardHeight(i)}
                          className={`card ${card.isFlipped ? "flipped" : ""}`}
                          onClick={() =>
                            sendMessage(card, card.id, el.id, el?.card?.length)
                          }
                        >
                          <div>
                            <div className="card-front">
                              <img
                                alt={card.id}
                                src="./img/Image verso card.png"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* <ToastContainer /> */}
          <input type="text" value={formattedTime(timer)} readOnly />{" "}
        </div>
      )}
    </>
  );
}

export default Sixcard;
