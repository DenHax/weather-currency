import './App.css'
import CurrencyRateChart from './Components/Currency';
import Homepage from './Components/Homepage';
import WeatherForecast from './Components/Weather';
import { Routes, Route, Link } from 'react-router-dom';
import DHIcon from '../public/DH.svg'

function App() {
  return (
    <div className='API'>
      <header className='API-header'>
        <Link to="/">Домашня страница</Link>
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
      <footer>

        <a href='https://github.com/DenHax' target='_blank' className='svg-a'>
          <img src={DHIcon} className='dh-svg' alt="Animated Icon" />
        </a>
      </footer>
    </div>
  )
}

export default App
