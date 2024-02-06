import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import Nav from "./Nav";
import TechnicianForm from "./TechnicianForm";
import TechnicianList from "./TechnicianList";
import AppointmentForm from "./AppointmentForm";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/manufactures" element= {<MainPage />} />
        </Routes>
        <Routes>
          <Route path="/create-manufacture" element={<MainPage />} />
        </Routes>
        <Routes>
          <Route path="/models" element={<MainPage />} />
        </Routes>
        <Routes>
          <Route path="/create-models" element={<MainPage />} />
        </Routes>
        <Routes>
          <Route path="/automobiles" element={<MainPage />} />
        </Routes>
        <Routes>
          <Route path="/create-auto" element={<MainPage />} />
        </Routes>
        <Routes>
          <Route path="/salespeople" element={<MainPage />} />
        </Routes>
        <Routes>
          <Route path="/add-salesperson" element={<MainPage />} />
        </Routes>
        <Routes>
          <Route path="/customer" element={<MainPage />} />
        </Routes>
        <Routes>
          <Route path="/sale" element={<MainPage />} />
        </Routes>
        <Routes>
          <Route path="/sales-history" element={<MainPage />} />
        </Routes>
        <Routes>
          <Route path="/technicians" element={<TechnicianList />} />
        </Routes>
        <Routes>
          <Route path="/add-technician" element={<TechnicianForm />} />
        </Routes>
        <Routes>
          <Route path="/service-appointment" element={<MainPage />} />
        </Routes>
        <Routes>
          <Route path="/create-service-appointment" element={<AppointmentForm />} />
        </Routes>
        <Routes>
          <Route path="/service-history" element={<MainPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
