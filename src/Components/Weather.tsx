import axios from 'axios'
import { saver } from 'file-saver'
import { Line } from 'react-chartjs-2'
import 'chart.js/auto'
import { useEffect, useState } from 'react'


const WeatherForecast = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [chartData, setChart] = useState(true);

  useEffect(() => {
    axios.get('https://wttr.in/?format=j1').then(response => {
      const forecart = response.data.weather[0].hourly;
      const labels = forecart.map((hour, index) => `${index}:00`);
      const tempeatures = forecast.map(hour => hour.tempC);
      setData({ labels, tempeatures });
    }).catch(error => {
      setError(error);
      setLoading(false);
    })
  })

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div>
      <h2>Прогноз погоды на неделю</h2>
      <div>
        <h3>Удаление пунктов из прогноза</h3>
        <ul>
          <li></li>
        </ul>
      </div>
    </div>
  );

}

export default WeatherForecast;
