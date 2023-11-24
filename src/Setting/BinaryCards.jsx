import { useContext } from "react";

import { GameContext } from "../Context/GameContext";
import { useState } from "react";
import { BiCheck } from "react-icons/bi";
import { BsArrowLeftCircleFill, BsCheckLg } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import PureModal from "react-pure-modal";
import "react-pure-modal/dist/react-pure-modal.min.css";
import { Button, Modal } from "react-bootstrap";
import { filter } from "underscore";

export default function BinaryCards() {
  const {
    dispatch,
    binaryfiltercard,
    setBinaryFilterCard,
    defaultbinary,
    setDefaultBinary,
  } = useContext(GameContext);
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [checked, setChecked] = useState(false);

  const handleClose = () => {
    setModal(false);
  };

  useEffect(() => {
    const storedCards = JSON.parse(localStorage.getItem("selectedCards"));

    const initialCards = storedCards || defaultbinary.slice(0, 6);
    // const initialCards = defaultbinary.slice(0, 6);

    setBinaryFilterCard(initialCards);
    dispatch({ type: "cards", payload: initialCards });
  }, []);

  const handleChange = (e, card) => {
    const { checked } = e.target;

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

  return (
    <div className="container binarycontainer">
      {/* <div onClick={() => navigate("/setting")}><BsArrowLeftCircleFill /></div> */}
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
                onChange={(e) => handleChange(e, el)}
                checked={binaryfiltercard.some((card) => card.id === el.id)}
              />

              <label htmlFor={`beat_value_${i}`} className="fw-medium">
                <img src={el.img} alt="image" />
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
          <Button variant="secondary" onClick={handleClose}>
            Premium Version
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
