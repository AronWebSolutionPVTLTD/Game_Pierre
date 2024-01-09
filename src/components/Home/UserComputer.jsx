import React from "react";
import Deck from "../Deck";
import { Computer } from "../Computer";


export const UserComputer = () => {

  
 
  return (
    <div className="col-md-8">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="row">
            <div className="col-6">
              <Deck />
            </div>

       
          </div>
        </div>

        <div className="col-md-6 ">
          <div className="row justify-content-end">
           
            <div className="col-6">
              <Computer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
