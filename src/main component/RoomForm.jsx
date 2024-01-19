import React from "react";
import "./Sixcard.css";

export const RoomForm = ({
  onHandleSubmit,
  username,
  room,
  setUsername,
  setRoom,
}) => {
  return (
    <div className="game_form_container">
      <div className="game_form">
        <form onSubmit={onHandleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            value={username}
            placeholder="Enter username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="room">Room</label>
          <input
            type="text"
            name="room"
            value={room}
            placeholder="Enter room"
            onChange={(e) => setRoom(e.target.value)}
          />
          <button type="submit">Join </button>
        </form>
      </div>
    </div>
  );
};
