import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import Nav from "./Nav";
<<<<<<< HEAD
import TechnicianForm from "./TechnicianForm";
import TechnicianList from "./TechnicianList";
import AppointmentForm from "./AppointmentForm";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/manufactures" element={<MainPage />} />
          <Route path="/create-manufacture" element={<MainPage />} />
          <Route path="/models" element={<MainPage />} />
          <Route path="/create-models" element={<MainPage />} />
          <Route path="/automobiles" element={<MainPage />} />
          <Route path="/create-auto" element={<MainPage />} />
          <Route path="/salespeople" element={<ListSalesPeople />} />
          <Route path="/add-salesperson" element={<AddSalesPerson />} />
          <Route path="/customer" element={<ListCustomer />} />
          <Route path="/add-customer" element={<AddCustomer />} />
          <Route path="/sale" element={<MainPage />} />
          <Route path="/sales-history" element={<MainPage />} />
<<<<<<< HEAD
        </Routes>
        <Routes>
          <Route path="/technicians" element={<TechnicianList />} />
        </Routes>
        <Routes>
          <Route path="/add-technician" element={<TechnicianForm />} />
        </Routes>
        <Routes>
=======
          <Route path="/technicians" element={<MainPage />} />
          <Route path="/add-technician" element={<MainPage />} />
>>>>>>> cf5ff751a737a3318daf9624c512a95e63a46ab8
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
