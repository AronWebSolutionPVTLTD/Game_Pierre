import { useContext, useEffect, useState } from "react";
import "./settings.css";
import { BiCheck } from "react-icons/bi";

import { GameContext } from "../Context/GameContext";
import BinaryCards from "./BinaryCards";
import { useNavigate } from "react-router-dom";
import TernaryCards from "./TernaryCards";

function GameSettings() {
  const {
    timerValue,
    setTimerValue,
    selectedmode,
    setSelectedMode,
    selectedcardvalue,
    setselectedCardValue,
  } = useContext(GameContext);
  const navigate = useNavigate();

  // -------------------------timer-------------
  const minutes = Math.floor(timerValue / 60);
  const seconds = timerValue % 60;
  const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;

  localStorage.setItem("timer", JSON.stringify(timerValue));
  // -------------------------timer  end-------------

  const handlebinaryMode = (e) => {
    setSelectedMode("binary");
  };

  const handleternaryMode = (e) => {
    setSelectedMode("ternary");
  };

  // ____________________HANDLE VALUE OF BEAT_________________
  const handleValue = (e, value) => {
    const { checked } = e.target;
    if (checked) {
      setselectedCardValue(value);
    }
  };

  return (
    <>
      <div className="container">
        <h3 className="text-center fs-4 fw-bold"> Settings</h3>
        <div className="row justify-content-center">
          <div className="col-md-5 text-center pt-5">
            <h4 className="fw-semibold mb-4">Mode selection</h4>
            <div className="setting_radio justify-content-center mt-3">
              <div className="radio_btn">
                <input
                  type="radio"
                  id="mode_yes"
                  name="mode_selection"
                  value="binary"
                  checked={selectedmode === "binary"}
                  onChange={(e) => handlebinaryMode(e)}
                />
                <label htmlFor="mode_yes" className="fw-medium">
                  <span className="radio_box">
                    <BiCheck />
                  </span>
                  Binary
                </label>
              </div>

              <div className="radio_btn">
                <input
                  type="radio"
                  id="mode_no"
                  name="mode_selection"
                  value="ternary"
                  checked={selectedmode === "ternary"}
                  onChange={(e) => handleternaryMode(e)}
                />
                <label htmlFor="mode_no" className="fw-medium">
                  <span className="radio_box">
                    <BiCheck />
                  </span>
                  Ternary
                </label>
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="row justify-content-center align-items-center mt-5">
              <div className="col-md-2">
                <div className="setting_field justify-content-center">
                  <label className="d-block" htmlFor="duration">
                    Duration
                  </label>
                  <div className="Result_wrapper_duration m-0 mt-2">
                    <div className="Result_timmer">
                      <input
                        type="text"
                        className="w-100 text-center"
                        readOnly
                        value={formattedTime}
                      />
                      <div className="pts_box">
                        <button
                          className="plus_icon"
                          onClick={() => setTimerValue(timerValue + 30)}
                        >
                          +
                        </button>
                        <button
                          className="minus_icon"
                          onClick={() => {
                            if (timerValue > 30) {
                              setTimerValue(timerValue - 30);
                            }
                          }}
                        >
                          -
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-5">
                <div className="setting_radio justify-content-center">
                  <label className="fw-semibold mb-2">
                    Rhythm sound of my card
                  </label>
                  <div className="radio_btn">
                    <input type="radio" id="rythm_yes" name="rythm" />
                    <label htmlFor="rythm_yes" className="fw-medium">
                      <span className="radio_box">
                        <BiCheck />
                      </span>
                      Yes
                    </label>
                  </div>
                  <div className="radio_btn">
                    <input type="radio" id="rythm_no" name="rythm" />

                    <label htmlFor="rythm_no" className="fw-medium">
                      <span className="radio_box">
                        <BiCheck />
                      </span>
                      No
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {selectedmode === "binary" && (
            <div className="col-md-8 mt-5 pb-5">
              <h4 className="fw-semibold text-center ">Value of 1 beat</h4>
              <div className="setting_radio">
                <div className="row">
                  <div className="col">
                    <div className="radio_btn radio_img_btn">
                      <input
                        type="radio"
                        id="beat_1"
                        name="beat_selection"
                        onChange={(e) => handleValue(e, "noire")}
                        checked={selectedcardvalue === "noire"}
                      />
                      <label htmlFor="beat_1" className="fw-medium">
                        <img src="img/4 noire.jpg" alt="noire" />
                        <span className="radio_box">
                          <BiCheck />
                        </span>
                      </label>
                    </div>
                  </div>
                  <div className="col">
                    <div className="radio_btn radio_img_btn">
                      <input
                        type="radio"
                        id="beat_2"
                        name="beat_selection"
                        onChange={(e) => handleValue(e, "blanche")}
                        checked={selectedcardvalue === "blanche"}
                      />
                      <label htmlFor="beat_2" className="fw-medium">
                        <img src="img/3 blanche.jpg" alt="blanche" />
                        <span className="radio_box">
                          <BiCheck />
                        </span>
                      </label>
                    </div>
                  </div>
                  <div className="col">
                    <div className="radio_btn radio_img_btn">
                      <input
                        type="radio"
                        id="beat_3"
                        name="beat_selection"
                        onChange={(e) => handleValue(e, "croche")}
                        checked={selectedcardvalue === "croche"}
                      />
                      <label htmlFor="beat_3" className="fw-medium">
                        <img src="img/5 croche.jpg" alt="5-croche" />
                        <span className="radio_box">
                          <BiCheck />
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedmode === "ternary" && (
            <div className="col-md-3 mt-5 pb-5">
              <h4 className="fw-semibold text-center ">Value of 1 beat</h4>
              <div className="setting_radio">
                <div className="row">
                  <div className="col">
                    <div className="radio_btn radio_img_btn">
                      <input
                        type="radio"
                        id="beat_3"
                        name="beat_selection"
                        onChange={(e) => handleValue(e, "noire pointee")}
                        checked={selectedcardvalue === "noire pointee"}
                      />
                      <label htmlFor="beat_3" className="fw-medium">
                        <img src="/img/13 noire pointée.jpg" alt="noire" />
                        <span className="radio_box">
                          <BiCheck />
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {(selectedcardvalue === "noire" ||
            selectedcardvalue === "blanche" ||
            selectedcardvalue === "croche") &&
            selectedmode !== "ternary" && (
              <div className="pt-5">
                <BinaryCards />
              </div>
            )}
          {selectedcardvalue === "noire pointee" &&
            selectedmode === "ternary" && (
              <div className="pt-5">
                <TernaryCards />
              </div>
            )}
        </div>
      </div>
    </>
  );
}

export default GameSettings;
