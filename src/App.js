import './App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Page1 from "./routes/page1.jsx";
import Page2 from "./routes/page2";
import Page3 from "./routes/page3.js";
import NotFound from "./routes/pageError.js";

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Page1 />} />
          <Route path="/Page2" element={<Page2 />} />
          <Route path="/Achat" element={<Page2 />} />
          <Route path="/Page3" element={<Page3 />} />
          <Route path="*"element={<NotFound />} />
        </Routes>
      </Router>
  );
}

export default App;
