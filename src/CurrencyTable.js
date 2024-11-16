import React from "react";

const CurrencyTable = ({ rates }) => {
  return (
    <table
      border="1"
      cellPadding="10"
      style={{ width: "100%", textAlign: "left" }}
    >
      <thead>
        <tr>
          <th>Currency</th>
          <th>We Buy (5% Higher)</th>
          <th>Exchange Rate</th>
          <th>We Sell (5% Lower)</th>
        </tr>
      </thead>
      <tbody>
        {rates.map((rate) => (
          <tr key={rate.currency}>
            <td>{rate.currency}</td>
            <td>{rate.weBuy.toFixed(2)}</td>
            <td>{rate.exchangeRate.toFixed(2)}</td>
            <td>{rate.weSell.toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CurrencyTable;
