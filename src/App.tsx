import './App.css'
import CurrencyRateChart from './Components/Currency';
import Homepage from './Components/Homepage';
import WeatherForecast from './Components/Weather';
import { Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <div className='API'>
      <header className='API-header'>
        <Link to="/">Дом</Link>
        <Link to="/rate">Доллар</Link>
        <Link to="/forecast">Погода</Link>
      </header>
      <main>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/rate' element={<CurrencyRateChart />} />
          <Route path='/forecast' element={<WeatherForecast />} />
          <Route path='*' element={<Homepage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
