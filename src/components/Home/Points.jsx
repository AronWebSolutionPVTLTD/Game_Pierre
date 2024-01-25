import React from "react";
import { useContext } from "react";
import { GameContext } from "../../Context/GameContext";
import { motion, AnimatePresence } from "framer-motion";

export const Points = ({ color, checkValue, handleClick,pointwinner,strongvalue}) => {
  const { selectedcardvalue, setselectedCardValue } = useContext(GameContext);

  const noireValue = [
    { value: 0.25, fraction: "1/4" },
    { value: 0.5, fraction: "1/2" },
    { value: 0.75, fraction: "3/4" },
    1,

    1.5,
    2,
    3,
    4,
    "Joker",
  ];

  const blancheValue = [
    { value: 0.125, fraction: "1/8" },
    { value: 0.25, fraction: "1/4" },
    { value: 0.375, fraction: "3/8" },
    { value: 0.5, fraction: "1/2" },
    { value: 0.75, fraction: "3/4" },
    1,

    1.5,
    2,
    "Joker",
  ];

  const crocheValue = [
    { value: 0.5, fraction: "1/2" },
    1,

    1.5,
    3,
    2,
    4,
    6,
    8,
    "Joker",
  ];

  const variants = {
    initial: { opacity: 0, y: -50 },
    animate: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } },
    exit: { opacity: 0, y: -50 },
  };

  const itemVariants = {
    initial: { opacity: 0, y: -50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -50 },
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}
    >

     
      <div className="points_count">
        <div className="container">
          {strongvalue &&
          <div className={pointwinner === "Ordinateur"?"strong_computer":"strong_user"}>
          <h2>{`${pointwinner} a la carte la plus élevée + 1 point`}</h2>
          </div>
          }
          
          <div className="row">
            <div className="col-md-1" />
            <div className="col-md-10">
              <AnimatePresence>
                <motion.div className="points_count">
                  {selectedcardvalue === "croche"
                    ? crocheValue.map((item, index) => (
                        <motion.div
                          key={index}
                          variants={itemVariants}
                          transition={{ duration: 0.2, ease: "linear" }}
                          initial={{ scale: 1 }}
                          animate={{
                            scale:
                              color !== "1" && color !== "2"
                                ? 1
                                : checkValue ===
                                    (typeof item === "object"
                                      ? item.value
                                      : item)
                                  ? 1.2
                                  : 1,
                            opacity:
                              color === "2" ||
                              (color === "1" &&
                                checkValue ===
                                  (typeof item === "object"
                                    ? item.value
                                    : item))
                                ? 1
                                : 0.8,
                          }}
                          style={{
                            background:
                              color === "2" &&
                              checkValue ===
                                (typeof item === "object" ? item.value : item)
                                ? "red"
                                : color === "1" &&
                                  checkValue ===
                                    (typeof item === "object"
                                      ? item.value
                                      : item) &&
                                  "green",
                          }}
                          className="item_point"
                          onClick={() =>
                            handleClick(
                              typeof item === "object" ? item.value : item,
                            )
                          }
                        >
                          {typeof item === "object" ? (
                            <>
                              <span>{item.fraction}</span>
                              <span>{item.value}</span>
                            </>
                          ) : typeof item === "number" ? (
                            <span>{item}</span>
                          ) : (
                            <span className="point_bg_icon">
                              <img
                                src="img/point-dorgue-icon.png"
                                alt="point-dorgue-icon"
                              />
                            </span>
                          )}
                        </motion.div>
                      ))
                    : selectedcardvalue === "blanche"
                      ? blancheValue.map((item, index) => (
                          <motion.div
                            key={index}
                            variants={itemVariants}
                            transition={{ duration: 0.2, ease: "linear" }}
                            animate={{
                              scale:
                                color !== "1" && color !== "2"
                                  ? 1
                                  : checkValue ===
                                      (typeof item === "object"
                                        ? item.value
                                        : item)
                                    ? 1.2
                                    : 1,
                              opacity:
                                color === "2" ||
                                (color === "1" &&
                                  checkValue ===
                                    (typeof item === "object"
                                      ? item.value
                                      : item))
                                  ? 1
                                  : 0.8,
                            }}
                            style={{
                              background:
                                color === "2" &&
                                checkValue ===
                                  (typeof item === "object" ? item.value : item)
                                  ? "red"
                                  : color === "1" &&
                                    checkValue ===
                                      (typeof item === "object"
                                        ? item.value
                                        : item) &&
                                    "green",
                            }}
                            className="item_point"
                            onClick={() =>
                              handleClick(
                                typeof item === "object" ? item.value : item,
                              )
                            }
                          >
                            {typeof item === "object" ? (
                              <>
                                <span>{item.fraction}</span>
                                <span>{item.value}</span>
                              </>
                            ) : typeof item === "number" ? (
                              <span>{item}</span>
                            ) : (
                              <span className="point_bg_icon">
                                <img
                                  src="img/point-dorgue-icon.png"
                                  alt="point-dorgue-icon"
                                />
                              </span>
                            )}
                          </motion.div>
                        ))
                      : noireValue.map((item, index) => (
                          <motion.div
                            key={index}
                            variants={itemVariants}
                            transition={{ duration: 0.2, ease: "linear" }}
                            animate={{
                              scale:
                                color !== "1" && color !== "2"
                                  ? 1
                                  : checkValue ===
                                      (typeof item === "object"
                                        ? item.value
                                        : item)
                                    ? 1.2
                                    : 1,
                              opacity:
                                color === "2" ||
                                (color === "1" &&
                                  checkValue ===
                                    (typeof item === "object"
                                      ? item.value
                                      : item))
                                  ? 1
                                  : 0.8,
                            }}
                            style={{
                              background:
                                color === "2" &&
                                checkValue ===
                                  (typeof item === "object" ? item.value : item)
                                  ? "red"
                                  : color === "1" &&
                                    checkValue ===
                                      (typeof item === "object"
                                        ? item.value
                                        : item) &&
                                    "green",
                            }}
                            className="item_point"
                            onClick={() =>
                              handleClick(
                                typeof item === "object" ? item.value : item,
                              )
                            }
                          >
                            {typeof item === "object" ? (
                              <>
                                <span>{item.fraction}</span>
                                <span>{item.value}</span>
                              </>
                            ) : typeof item === "number" ? (
                              <span>{item}</span>
                            ) : (
                              <span className="point_bg_icon">
                                <img
                                  src="img/point-dorgue-icon.png"
                                  alt="point-dorgue-icon"
                                />
                              </span>
                            )}
                          </motion.div>
                        ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
         
        </div>
      </div>
     
    </motion.div>
  );
};
