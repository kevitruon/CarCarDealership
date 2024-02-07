import React, { useState, useEffect } from "react";

function SalespersonHistory() {
  const [salespeople, setSalespeople] = useState([]);
  const [selectedSalesperson, setSelectedSalesperson] = useState("");
  const [salesHistory, setSalesHistory] = useState([]);

  useEffect(() => {
    async function fetchSalespeople() {
      try {
        const response = await fetch("http://localhost:8090/api/salespeople/");
        if (response.ok) {
          const data = await response.json();
          setSalespeople(data.salespeople);
        } else {
          console.error(response);
        }
      } catch (error) {
        console.error("Error fetching salespeople:", error);
      }
    }
    fetchSalespeople();
  }, []);

  useEffect(() => {
    async function fetchSalesHistory() {
      if (!selectedSalesperson) return;
      try {
        const response = await fetch("http://localhost:8090/api/sales/");
        if (response.ok) {
          const data = await response.json();
          const salesForSalesperson = data.sales.filter(
            (sale) => sale.salesperson.id === parseInt(selectedSalesperson)
          );
          setSalesHistory(salesForSalesperson);
        } else {
          console.error(response);
        }
      } catch (error) {
        console.error("Error fetching sales history:", error);
      }
    }
    fetchSalesHistory();
  }, [selectedSalesperson]);

  const handleSalespersonChange = (e) => {
    setSelectedSalesperson(e.target.value);
  };

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Salesperson History</h1>
      <div className="d-flex justify-content-center mb-4">
        <select
          className="form-select"
          value={selectedSalesperson}
          onChange={handleSalespersonChange}
        >
          <option value="">Select a salesperson</option>
          {salespeople.map((salesperson) => (
            <option key={salesperson.id} value={salesperson.id}>
              {`${salesperson.first_name} ${salesperson.last_name}`}
            </option>
          ))}
        </select>
      </div>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Salesperson</th>
              <th>Customer</th>
              <th>Automobile VIN</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {salesHistory.map((sale) => (
              <tr key={sale.id}>
                <td>{`${sale.salesperson.first_name} ${sale.salesperson.last_name}`}</td>
                <td>{`${sale.customer.first_name} ${sale.customer.last_name}`}</td>
                <td>{sale.automobile.vin}</td>
                <td>{`$${sale.price}`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SalespersonHistory;
