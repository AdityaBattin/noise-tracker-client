import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from './components/Home';
import Info from './components/Info';
import NoiseChart from './components/NoiseChart';
import Layout from './components/shared/Layout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index path="/" element={<Home />} />
          <Route path="/chart" element={<NoiseChart /> } />
          <Route path="/info" element={<Info />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
