import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Accueil from "./routes/Accueil";
import RecapitulatifAchat from "./routes/RecapitulatifAchat";
import Page3 from "./routes/page3.js";
import NotFound from "./routes/pageError.js";

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/Achat" element={<RecapitulatifAchat />} />
          <Route path="/Page3" element={<Page3 />} />
          <Route path="*"element={<NotFound />} />
        </Routes>
      </Router>
  );
}

export default App;
