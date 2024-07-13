import { useState, useEffect } from 'react';
import axios from 'axios';

const CurrencyRats = () => {
  const [rates, setRates] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("https://api.exchangerate-api.com//v4/latest/USD").then((response) => {
      setRates(response.data.rates);
      setLoading(false);
    }).catch((error) => {
      setError(error);
      setLoading(false);
    });
  }, []);
  if (loading) {
    return <div>Loading</div>
  }
  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div>
      <h1>Курс доллара</h1>
      <ul>
        {rates && Object.keys(rates).map((currency) => (
          <li key={currency}>
            {currency}: {rates[currency]}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default CurrencyRats;
