import { useState, useEffect } from "react";

function ListCustomer() {
  const [customers, setCustomers] = useState([]);
  const [deletionSuccess, setDeletionSuccess] = useState(false);

  useEffect(() => {
    async function loadCustomers() {
      try {
        const response = await fetch("http://localhost:8090/api/customers/");
        if (response.ok) {
          const data = await response.json();

          console.log(data);

          setCustomers(data.customers);
        } else {
          console.error(response);
        }
      } catch (error) {
        console.error("Error loading customers:", error);
      }
    }
    loadCustomers();
  }, []);

  const handleDelete = async (customer_id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this customer?"
    );
    if (!confirmDelete) {
      return;
    }
    const deleteUrl = `http://localhost:8090/api/customers/${customer_id}/`;
    const fetchOptions = {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    };

    try {
      const deleteResponse = await fetch(deleteUrl, fetchOptions);
      if (deleteResponse.ok) {
        setCustomers((prevCustomers) =>
          prevCustomers.filter((customer) => customer.id !== customer_id)
        );
        setDeletionSuccess(true);
        setTimeout(() => {
          setDeletionSuccess(false);
        }, 3000);
      } else {
        const errorMessage = await deleteResponse.text();
        console.error(
          `Error deleting hat with id ${customer_id}: ${errorMessage}`
        );
      }
    } catch (error) {
      console.error("Error during hat deletion:", error.message);
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
              Customer successfully deleted!
              <button
                type="button"
                className="btn-close"
                onClick={() => setDeletionSuccess(false)}
              ></button>
            </div>
          )}
          <h1 className="card-title text-center mb-4">Customers</h1>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Address</th>
                <th>Phone Number</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => {
                return (
                  <tr key={customer.id}>
                    <td>{`${customer.first_name} ${customer.last_name}`}</td>
                    <td>{customer.address}</td>
                    <td>{customer.phone_number}</td>
                    <td className="text-end">
                      <button className="btn btn-sm btn-primary me-2">
                        Update
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(customer.id)}
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

export default ListCustomer;
