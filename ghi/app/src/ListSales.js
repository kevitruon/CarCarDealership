import { useState, useEffect } from "react";

function ListSales() {
  const [sales, setSales] = useState([]);
  const [deletionSuccess, setDeletionSuccess] = useState(false);

  useEffect(() => {
    async function loadSales() {
      try {
        const response = await fetch("http://localhost:8090/api/sales/");
        if (response.ok) {
          const data = await response.json();

          setSales(data.sales);
        } else {
          console.error(response);
        }
      } catch (error) {
        console.error("Error loading sales rep:", error);
      }
    }
    loadSales();
  }, []);

  const handleDelete = async (sale_id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this sales?"
    );
    if (!confirmDelete) {
      return;
    }
    const deleteUrl = `http://localhost:8090/api/sales/${sale_id}/`;
    const fetchOptions = {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    };

    try {
      const deleteResponse = await fetch(deleteUrl, fetchOptions);
      if (deleteResponse.ok) {
        setSales((prevSale) => prevSale.filter((sale) => sale.id !== sale_id));
        setDeletionSuccess(true);
        setTimeout(() => {
          setDeletionSuccess(false);
        }, 3000);
      } else {
        const errorMessage = await deleteResponse.text();
        console.error(
          `Error deleting sale with id ${sale_id}: ${errorMessage}`
        );
      }
    } catch (error) {
      console.error("Error during sale deletion:", error.message);
    }
  };

  return (
    <div className="container my-5">
      <div className="card shadow">
        <div className="card-body">
          {deletionSuccess && (
            <div
              className="alert alert-success alert-dismissible fade show"
              role="alert"
            >
              Sale successfully deleted!
              <button
                type="button"
                className="btn-close"
                onClick={() => setDeletionSuccess(false)}
              ></button>
            </div>
          )}
          <h1 className="card-title text-center mb-4">Sales</h1>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Salesperson Employee ID</th>
                <th>Salesperson Name</th>
                <th>Customer</th>
                <th>VIN</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {sales.map((sale) => {
                return (
                  <tr key={sale.id}>
                    <td>{sale.salesperson.employee_id}</td>
                    <td>{`${sale.salesperson.first_name} ${sale.salesperson.last_name}`}</td>
                    <td>{`${sale.customer.first_name} ${sale.customer.last_name}`}</td>
                    <td>{sale.automobile.vin}</td>
                    <td>{`$${sale.price}`}</td>
                    <td className="text-end">
                      <button className="btn btn-sm btn-primary me-2">
                        Update
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(sale.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ListSales;
