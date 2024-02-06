import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import Nav from "./Nav";
import TechnicianForm from "./TechnicianForm";
import TechnicianList from "./TechnicianList";
import AddSalesPerson from "./AddSalesPerson";
import ListSalesPeople from "./ListSalesPeople";
import AddCustomer from "./AddCustomer";
import ListCustomer from "./ListCustomer";
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
          <Route path="/technicians" element={<TechnicianList />} />
          <Route path="/add-technician" element={<TechnicianForm />} />
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
