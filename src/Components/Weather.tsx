import axios from 'axios'
import { saver } from 'file-saver'
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
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

}

export default WeatherForecast;
