import axios from 'axios'
import { saveAs } from 'file-saver';
import { Line } from 'react-chartjs-2'
import 'chart.js/auto'
import { useEffect, useState } from 'react'


const WeatherForecast = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [chartData, setChart] = useState(null);

  useEffect(() => {
    axios.get('https://wttr.in/?format=j1')
      .then(response => {
        const forecast = response.data.weather.slice(0, 7);
        const labels = forecast.map(day => day.date);
        const temperatures = forecast.map(day => parseFloat(day.avgtempC));
        setData({ labels, temperatures });
        setChart({
          labels,
          datasets: [
            {
              label: 'Average Temperature (°C)',
              data: temperatures,
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
    const newTemperatures = data.temperatures.filter((_, i) => i !== index);

    setData({ labels: newLabels, temperatures: newTemperatures });
    setChart({
      labels: newLabels,
      datasets: [
        {
          label: 'Average Temperature (°C)',
          data: newTemperatures,
          fill: false,
          borderColor: 'rgba(75,192,192,1)',
        },
      ],
    });
  };

  const handleDownload = () => {
    const jsonData = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    saveAs(blob, 'weather_forecast.json');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div>
      <h2>Прогноз погоды на неделю</h2>
      <Line data={chartData} />
      <div>
        <h3>Удаление пунктов из прогноза</h3>
        <ul>
          {data.labels.map((label, index) => (
            <li key={index}>
              {label}: {data.temperatures[index]}°C
              <button onClick={() => handleDelete(index)}>Delete</button>
            </li>
          ))}
        </ul>
        <button onClick={() => handleDownload()}>Download JSON</button>
      </div>
    </div>
  );

}

export default WeatherForecast;
