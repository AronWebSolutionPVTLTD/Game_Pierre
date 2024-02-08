import React from "react";
import { Link } from "react-router-dom";

import Container from "react-bootstrap/Container";

import Nav from "react-bootstrap/Nav";
import BootStrapNavbar from "react-bootstrap/Navbar";

export const Navbar = () => {
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
                <img className="site_logo" src="./img/logo.png" alt="logo" />
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
                <a href="/evaluation">Evaluation</a>

                <a href="training">Par entrainement</a>

                {/* <Link to="/sixcard">Sixcard</Link> */}

                <Link>Règles du jeu</Link>
                <a
                  href="http://www.lirelamusique.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  Boutique
                </a>
                <a href="/contact">Contact</a>
                {Token && (
                  <Link
                    onClick={() => {
                      localStorage.clear();
                      window.location.reload();
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
