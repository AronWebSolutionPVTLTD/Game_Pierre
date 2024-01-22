import React, { useState } from "react";

import { Link } from "react-router-dom";

import StripeCheckout from "react-stripe-checkout";

const PricingComponent = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [payment, setPayment] = useState(false);
  const userName = localStorage.getItem("username");
  const plans = [
    { amount: 35.99, plan: "Per Week" },
    { amount: 99.99, plan: "Per Month" },
    { amount: 199.99, plan: "Per Year" },
  ];

  const onToken = (token) => {
    console.log(token);
  };
  return (
    <section className="pricing-section">
      <div className="container">
        <div className="sec-title text-center">
          <span className="title">Obtenir un Plan</span>
          <h2>Choisissez un plan</h2>
        </div>

        <div className="outer-box">
          <div className="row">
            {plans.map((plan, index) => (
              <div
                key={index}
                className="pricing-block col-lg-4 col-md-6 col-sm-12 wow fadeInUp"
              >
                <div className="inner-box">
                  <div className="icon-box">
                    <div className="icon-outer">
                      <i className="fas fa-paper-plane">
                        <img src="./img/logo.png" alt="logo" width={"90px"} />
                      </i>
                    </div>
                  </div>
                  <div className="price-box">
                    <div className="title">{plan.plan}</div>
                    <h4 className="price">${plan.amount}</h4>
                  </div>
                  <ul className="features">
                    <li className="true">
                      Vous pouvez sélectionner plusieurs cartes
                    </li>
                    <li className="true">
                      Vous avez le choix entre des cartes Ternaires/Binaires
                    </li>
                    <li className="true">
                      Vous pouvez jouer avec plusieurs joueurs
                    </li>
                    <li className="false">Easy Access</li>
                    <li className="false">Free Contacts</li>
                  </ul>
                  <div className="btn-box">
                    <Link
                      to=""
                      className="theme-btn"
                      onClick={() => {
                        setSelectedPlan(plan?.amount);
                        setPayment(true);
                      }}
                    >
                      BUY Plan
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {payment && (
          <div className="stripe-container">
            <StripeCheckout
              token={onToken}
              name={userName}
              currency="USD"
              amount={selectedPlan ? selectedPlan * 100 : 0}
              stripeKey="pk_test_51NBsPWSHyA2R2rbSY6h18N7MFlCLk8c3tNn93IdG5Jddl01837e0z0TRWu8PnpC2Z7B1yEVRtNqTAHn1pEvCFNMF00lX7oCZ77"
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default PricingComponent;
