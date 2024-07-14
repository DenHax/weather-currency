import { useEffect, useState } from 'react';
import { saveAs } from 'file-saver';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const CurrencyRateChart = () => {
  const [chartData, setChart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [useAPI, setUseAPI] = useState(true);

  useEffect(() => {
    if (useAPI) {
      axios.get('https://api.exchangerate-api.com/v4/latest/USD')
        .then(response => {
          const rates = response.data.rates;
          const labels = Object.keys(rates);
          const data = Object.values(rates);

          setData({ labels, data });
          setChart({
            labels,
            datasets: [
              {
                label: 'Отношение курса валют к доллару (USD)',
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
    }
  }, [useAPI]);

  const handleDelete = (index) => {
    const newLabels = data.labels.filter((_, i) => i !== index);
    const newData = data.data.filter((_, i) => i !== index);

    setData({ labels: newLabels, data: newData });
    setChart({
      labels: newLabels,
      datasets: [
        {
          label: 'Отношение курса валют к доллару (USD)',
          data: newData,
          fill: false,
          borderColor: 'rgba(75,192,192,1)',
        },
      ],
    });
  };

  const handleDownload = () => {
    const jsonData = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    saveAs(blob, 'currency_rate.json');
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const jsonData = JSON.parse(e.target.result);
        setData(jsonData);
        setChart({
          labels: jsonData.labels,
          datasets: [
            {
              label: 'Отношение курса валют к доллару (USD)',
              data: jsonData.data,
              fill: false,
              borderColor: 'rgba(75,192,192,1)',
            },
          ],
        });
        setUseAPI(false);
      };
    }
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
        <button onClick={() => handleDownload()}>Скачать файл</button>
        <h2>Загрузить файл в формате JSON</h2>
        <input type="file" accept=".json" onChange={handleFileUpload} />
      </div>
    </div>
  );
};

export default CurrencyRateChart;
