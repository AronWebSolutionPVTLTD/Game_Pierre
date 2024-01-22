import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import BootStrapNavbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

export const Navbar = () => {
  const navigate = useNavigate();
  const Token = localStorage.getItem("token");

  return (
    <div>
      <div className="custom_header">
        {/* react navbar  */}
        <BootStrapNavbar
          expand="lg"
          className="bg-body-tertiary"
          style={{ boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)" }}
        >
          <Container fluid>
            <BootStrapNavbar.Brand>
              <Link to="/">
                <img className="site_logo" src="./img/logo.png" />
              </Link>
            </BootStrapNavbar.Brand>
            <BootStrapNavbar.Toggle aria-controls="navbarScroll" />
            <BootStrapNavbar.Collapse id="navbarScroll">
              <Nav
                className="my-7 my-lg-0 align-items-center gap-4 text-decoration-none "
                style={{
                  maxHeight: "auto",
                  marginLeft: "auto",
                  fontWeight: "600",
                  fontSize: "larger",
                  fontFamily: "math",
                }}
                navbarScroll
              >
                <Link to="/">Jouer</Link>
                <Link to="/evaluation">Evaluation</Link>

                <Link to="training">Par entrainement</Link>

                {/* <Link>Sixcard</Link> */}

                <Link>Règles du jeu</Link>
                <a href="http://www.lirelamusique.com" target="_blank">
                  Boutique
                </a>
                <Link to="/contact">Contact</Link>
                {Token && (
                  <Link
                    onClick={() => {
                      localStorage.clear();
                      navigate("/login");
                    }}
                  >
                    Déconnexion
                  </Link>
                )}
              </Nav>
            </BootStrapNavbar.Collapse>
          </Container>
        </BootStrapNavbar>
      </div>
    </div>
  );
};
