import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [rates, setRates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRates = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.currencyfreaks.com/latest?apikey=0c5f91dacf6c4028bd6fde71d85e1273`
      );
      const { rates } = response.data;

      // Mata uang yang ingin ditampilkan
      const selectedCurrencies = ["CAD", "IDR", "JPY", "CHF", "EUR", "GBP"];

      // Proses data untuk menambahkan kolom "We Buy" dan "We Sell"
      const processedRates = selectedCurrencies.map((currency) => ({
        currency,
        exchangeRate: parseFloat(rates[currency]),
        weBuy: parseFloat(rates[currency]) * 1.05,
        weSell: parseFloat(rates[currency]) * 0.95,
      }));

      setRates(processedRates);
    } catch (err) {
      setError("Gagal mengambil data. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRates();
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Currency Rates</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && !error && (
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
      )}
    </div>
  );
};

export default App;
