import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import PayerForm from "./Pages/PayerForm/PayerForm";
import ProviderForm from "./Pages/ProviderForm/ProviderForm";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/payerform" element={<PayerForm />} />
          <Route path="/providerform" element={<ProviderForm />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
