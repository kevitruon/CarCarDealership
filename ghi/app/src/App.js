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
import AddSale from "./AddSale";
import ListSales from "./ListSales";
import SalespersonHistory from "./SalesPersonHistory";
import AppointmentList from "./AppointmentList";
import AppointmentHist from "./AppointmentHist";
import ManufacturesList from "./ManufacturesList";
import ManufacturesForm from "./ManufacturesForm";
import AutomobileList from "./AutomobileList";
import AutomobileForm from "./AutomobileForm";
import ListModels from "./ListModels";
import AddModel from "./AddModel";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/manufactures" element={<ManufacturesList />} />
          <Route path="/create-manufacture" element={<ManufacturesForm />} />
          <Route path="/models" element={<ListModels />} />
          <Route path="/create-models" element={<AddModel />} />
          <Route path="/automobiles" element={<AutomobileList />} />
          <Route path="/create-auto" element={<AutomobileForm />} />
          <Route path="/salespeople" element={<ListSalesPeople />} />
          <Route path="/add-salesperson" element={<AddSalesPerson />} />
          <Route path="/customer" element={<ListCustomer />} />
          <Route path="/add-customer" element={<AddCustomer />} />
          <Route path="/sale" element={<ListSales />} />
          <Route path="/add-sale" element={<AddSale />} />
          <Route path="/sales-history" element={<SalespersonHistory />} />
          <Route path="/technicians" element={<TechnicianList />} />
          <Route path="/add-technician" element={<TechnicianForm />} />
          <Route path="/service-appointment" element={<AppointmentList />} />
          <Route
            path="/create-service-appointment"
            element={<AppointmentForm />}
          />
          <Route path="/service-history" element={<AppointmentHist />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
