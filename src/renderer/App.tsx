import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import {Page} from "./component/Page";

const Main = () => {
  return (
    <div>
      <div>react-electron-app</div>
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
