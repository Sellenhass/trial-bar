import React from "react";
import { Checkout as SourceCheckout } from "SourceRoute/Checkout/Checkout.component";
import classNames from "classnames";

import "./Checkout.extension.style.scss";

const DEFAULT_CHECKOUT_STEPS = [
  "SHIPPING_STEP",
  "BILLING_STEP",
  "DETAILS_STEP",
];

const STEP_CODE_TO_NAME = {
  SHIPPING_STEP: "Shipping",
  BILLING_STEP: "Review & Payments",
  DETAILS_STEP: "Thank you for your purchase!",
};

class CheckoutBar extends React.Component {
  render() {
    const { checkoutSteps, checkoutStep } = this.props;

    return (
      <div className="status-bar">
        {checkoutSteps.map((step, index) => (
          <div className="status-bar_step-wrapper">
            <div
              className={classNames("status-bar_progress", {
                "status-bar_progress-filled":
                  DEFAULT_CHECKOUT_STEPS.findIndex(
                    (defaultStep) => defaultStep === step
                  ) <=
                  DEFAULT_CHECKOUT_STEPS.findIndex(
                    (defaultStep) => defaultStep === checkoutStep
                  ),
              })}
            />
            <div className="status-bar_step-display">
              <div
                className={classNames("status-bar_step-number", {
                  "status-bar_progress-filled":
                    DEFAULT_CHECKOUT_STEPS.findIndex(
                      (defaultStep) => defaultStep === step
                    ) <=
                    DEFAULT_CHECKOUT_STEPS.findIndex(
                      (defaultStep) => defaultStep === checkoutStep
                    ),
                  "status-bar_step-number-filled":
                    DEFAULT_CHECKOUT_STEPS.findIndex(
                      (defaultStep) => defaultStep === step
                    ) <
                    DEFAULT_CHECKOUT_STEPS.findIndex(
                      (defaultStep) => defaultStep === checkoutStep
                    ),
                })}
              >
                {DEFAULT_CHECKOUT_STEPS.findIndex(
                  (defaultStep) => defaultStep === step
                ) <
                DEFAULT_CHECKOUT_STEPS.findIndex(
                  (defaultStep) => defaultStep === checkoutStep
                )
                  ? ""
                  : index + 1}
              </div>
              <span className="status-bar_step-name">
                {STEP_CODE_TO_NAME[step]}
              </span>
            </div>
          </div>
        ))}
        <div className="status-bar_step-wrapper">
          <div className="status-bar_progress" />
        </div>
      </div>
    );
  }
}

class Checkout extends SourceCheckout {
  renderTitle() {
    return (
      <>
        <CheckoutBar
          checkoutSteps={DEFAULT_CHECKOUT_STEPS}
          checkoutStep={this.props.checkoutStep}
        />
        {super.renderTitle()}
      </>
    );
  }
}

export default Checkout;
