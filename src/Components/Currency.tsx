import { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const CurrencyRateChart = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    // Fetch data from the API
    axios.get('https://api.exchangerate-api.com/v4/latest/USD')
      .then(response => {
        const rates = response.data.rates;
        const labels = Object.keys(rates);
        const data = Object.values(rates);

        setData({ labels, data });
        setChartData({
          labels,
          datasets: [
            {
              label: 'Exchange Rate (USD to other currencies)',
              data,
              fill: false,
              borderColor: 'rgba(75,192,192,1)',
            },
          ],
        });
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const handleDelete = (index) => {
    const newLabels = data.labels.filter((_, i) => i !== index);
    const newData = data.data.filter((_, i) => i !== index);

    setData({ labels: newLabels, data: newData });
    setChartData({
      labels: newLabels,
      datasets: [
        {
          label: 'Exchange Rate (USD to other currencies)',
          data: newData,
          fill: false,
          borderColor: 'rgba(75,192,192,1)',
        },
      ],
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h2>Отношение курса валют к USD</h2>
      <Line data={chartData} />
      <div>
        <h3>Удаление валют из списка</h3>
        <ul>
          {data.labels.map((label, index) => (
            <li key={index}>
              {label}: {data.data[index]}
              <button onClick={() => handleDelete(index)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CurrencyRateChart;
