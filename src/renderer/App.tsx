import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import {Page} from "./component/Page";

const Main = () => {
  return (
    <div>
      <h1>react-electron-app</h1>
        <Page/>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </Router>
  );
}
