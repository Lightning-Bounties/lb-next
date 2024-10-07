import React from "react";
import InvoiceDecoder from "../invoicedecoder/InvoiceDecoder";
import "./withdrawl.css";

const Withdrawal: React.FC = () => {
  return (
    <div className="withdrawal-container">
      <h2>Withdrawal</h2>
      {/* Integrate the Invoice Decoder */}
      <InvoiceDecoder />
      {/* Other withdrawal logic can go here */}
      <div className="withdrawal-form">
        {/* Example: Add a form for withdrawal amount */}
        <label htmlFor="amount">Amount to Withdraw:</label>
        <input type="number" id="amount" placeholder="Enter amount" />
        <button type="submit">Withdraw</button>
      </div>
    </div>
  );
};

export default Withdrawal;
