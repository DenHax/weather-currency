import './App.css'
import CurrencyRateChart from './Components/Currency';
import WeatherForecast from './Components/Weather';

function App() {
  return (
    <div className='API'>
      <header className='API-header'>
        <h1>Курс доллара и прогноз погоды</h1>
        <WeatherForecast />
        <CurrencyRateChart />
      </header>
    </div>
  )
}

export default App
