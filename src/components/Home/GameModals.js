import { Button, Modal } from "react-bootstrap";
import { IoCloseCircle } from "react-icons/io5";

export const GameOverModal = ({ gameOver, handleRestartGame, winnerName }) => {
  return (
    <>
      <Modal
        show={gameOver}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title>
            <h2> Jeu terminé !!!</h2>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p className="fw-bold"> Le gagnant est :</p>
          {winnerName ? (
            <div>
              <h2>{winnerName}</h2>
            </div>
          ) : (
            <p>Loading winner...</p>
          )}
          {winnerName && (
            <img
              src="img/animated-gif.gif"
              alt="animated-gif"
              className="animated_img"
            />
          )}
          <button onClick={handleRestartGame} className="new_game_btn">
            Nouveau jeu
          </button>
        </Modal.Body>
      </Modal>
    </>
  );
};

export const GameBattleModal = ({ cardmatchValue }) => {
  return (
    <>
      <Modal
        show={cardmatchValue}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        className="battle_modal"
        centered
      >
        <Modal.Body>
          <h2>Woohoo, Bataille !</h2>
        </Modal.Body>
      </Modal>
    </>
  );
};

export const GamePopUpModal = ({ handleValuePop, valuePopUp }) => {
  return (
    <>
      <Modal
        show={valuePopUp}
        onHide={handleValuePop}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <h2>Cliquez sur la pioche pour retourner 1 carte</h2>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="close_modal_icon"
            variant="secondary"
            onClick={handleValuePop}
          >
            <span>
              <IoCloseCircle />
            </span>
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export const EvaluationSelectCard = ({ handleValuePop, valuePopUp }) => {
  return (
    <>
      <Modal
        show={valuePopUp}
        onHide={handleValuePop}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>Sélectionnez d'abord la carte</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleValuePop}>
            Fermer
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export const TrainingGameOver = ({ gameOver, handleRestartGame }) => {
  return (
    <>
      <Modal
        show={gameOver}
        onHide={handleRestartGame}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title>
            <h2> Jeu terminé !!!</h2>
          </Modal.Title>
        </Modal.Header>

        <Modal.Footer>
          <button onClick={handleRestartGame} className="new_game_btn mt-5">
            Nouveau jeu
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export const BattleModal = ({
  closeBattlePop,
  showsbattlepop,
  userBattle,
  compBattle,
  userName = userName,
}) => {
  return (
    <>
      <Modal
        show={showsbattlepop}
        onHide={closeBattlePop}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        className="battle_modal"
        centered
      >
        <Modal.Body>
          <h2>Cartes cachées </h2>
          <h3 className="h3">Pendant la bataille </h3>
          <div className="battle_card_imgs">
            <div>
              <h3>{userName}</h3>
              <div className="imgs_wrapper">
                {userBattle.map((el, i) => (
                  <img key={i} src={el?.img} alt="image" />
                ))}
              </div>
            </div>
            <div>
              <h3>Ordinateur</h3>
              <div className="imgs_wrapper">
                {compBattle.map((el, i) => (
                  <img key={i} src={el?.img} alt="compimage" />
                ))}
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="close_modal_icon"
            variant="secondary"
            onClick={closeBattlePop}
          >
            {/* Fermer */}
            <span>
              <IoCloseCircle />
            </span>
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};


