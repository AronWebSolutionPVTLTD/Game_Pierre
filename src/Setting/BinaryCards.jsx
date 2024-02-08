/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable jsx-a11y/img-redundant-alt */
import { useContext } from "react";

import { GameContext } from "../Context/GameContext";
import { useState } from "react";
import { BiCheck } from "react-icons/bi";

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import "react-pure-modal/dist/react-pure-modal.min.css";
import { Button, Modal } from "react-bootstrap";

export default function BinaryCards() {
  const {
    dispatch,
    binaryfiltercard,
    setBinaryFilterCard,
    defaultbinary,

    premium,
    setPremium,
  } = useContext(GameContext);
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);

  const handleClose = () => {
    setModal(false);
  };

  // console.log(premium, "premium");

  const HandlePremium = () => {
    setModal(false);
    setPremium((prevPremium) => !prevPremium);
  };

  useEffect(() => {
    const storedCards = JSON.parse(localStorage.getItem("selectedCards"));

    const initialCards = storedCards || defaultbinary.slice(0, 6);

    setBinaryFilterCard(initialCards);
    dispatch({ type: "cards", payload: initialCards });
  }, []);

  const handleCheckboxChange = (e, card) => {
    const { checked } = e.target;

    if (premium) {
      handlePremiumCheckboxChange(checked, card);
    } else {
      handleRegularCheckboxChange(checked, card);
    }
  };

  const handleRegularCheckboxChange = (checked, card) => {
    const isFirstLineCard = defaultbinary.indexOf(card) < 6;

    if (checked && isFirstLineCard) {
      setBinaryFilterCard((prevfilter) => {
        const updatedBinaryFilter = [...prevfilter, card];
        dispatch({ type: "cards", payload: updatedBinaryFilter });
        localStorage.setItem(
          "selectedCards",
          JSON.stringify(updatedBinaryFilter),
        );
        return updatedBinaryFilter;
      });
    } else if (!isFirstLineCard) {
      setModal(true);
    } else {
      const filteredData = binaryfiltercard.filter((el) => el.id !== card.id);
      setBinaryFilterCard(filteredData);
      dispatch({ type: "cards", payload: filteredData });
      localStorage.setItem("selectedCards", JSON.stringify(filteredData));
    }
  };

  const handlePremiumCheckboxChange = (checked, card) => {
    if (checked) {
      setBinaryFilterCard((prevfilter) => {
        const updatedBinaryFilter = [...prevfilter, card];
        dispatch({ type: "cards", payload: updatedBinaryFilter });
        localStorage.setItem(
          "selectedCards",
          JSON.stringify(updatedBinaryFilter),
        );
        return updatedBinaryFilter;
      });
    } else {
      const filteredData = binaryfiltercard.filter((el) => el.id !== card.id);
      setBinaryFilterCard(filteredData);
      dispatch({ type: "cards", payload: filteredData });
      localStorage.setItem("selectedCards", JSON.stringify(filteredData));
    }
  };

  // console.log(binaryfiltercard, "bina");

  const premiumclose = () => {
    setPremium(false);
    setBinaryFilterCard([]);
    dispatch({ type: "cards", payload: [] });
    localStorage.removeItem("selectedCards");
  };

  return (
    <div className="container binarycontainer" style={{ position: "relative" }}>
      {premium && (
        <div
          style={{
            position: "absolute",
            top: "10px",
            left: "10px",
            cursor: "pointer",
            padding: "10px",
            backgroundColor: "#007bff",
            color: "#fff",
            borderRadius: "5px",
          }}
          onClick={premiumclose}
        >
          <span>Normal Version</span>
        </div>
      )}
      <h1 className="fw-semibold mb-2 text-center">Binary Card</h1>

      <div className="row justify-content-center">
        {defaultbinary.map((el, i) => (
          <div className="col-md-2 " key={el.id}>
            <div className="radio_btn radio_img_btn">
              <input
                type="checkbox"
                id={`beat_value_${i}`}
                name="beat_selection"
                className="d-none"
                onChange={(e) => handleCheckboxChange(e, el)}
                checked={binaryfiltercard.some((card) => card.id === el.id)}
              />

              <label htmlFor={`beat_value_${i}`} className="fw-medium">
                <img src={el.img} alt="binaryimage" />
                <span className="radio_box">
                  <BiCheck />
                </span>
              </label>
            </div>
          </div>
        ))}
      </div>

      <Modal show={modal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Purchase Premium Version</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Purchase the Premium version to play with more cards!
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={HandlePremium}>
            Premium Version
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
