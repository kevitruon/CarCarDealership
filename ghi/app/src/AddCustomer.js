import { useState } from "react";

function AddCustomer() {
  const [customer, setCustomer] = useState({
    first_name: "",
    last_name: "",
    address: "",
    phone_number: "",
  });
  const [addSuccess, setAddSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8090/api/customers/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(customer),
      });

      if (response.ok) {
        setCustomer({
          first_name: "",
          last_name: "",
          address: "",
          phone_number: "",
        });
        setAddSuccess(true);
        setTimeout(() => {
          setAddSuccess(false);
        }, 3000);
      } else {
        console.error("Error adding customer");
      }
    } catch (error) {
      console.error("Error during customer addition:", error.message);
    }
  };

  return (
    <div className="container my-5">
      <div className="card shadow">
        <div className="card-body">
          {addSuccess && (
            <div
              className="alert alert-success alert-dismissible fade show"
              role="alert"
            >
              Customer successfully Added!
              <button
                type="button"
                className="btn-close"
                onClick={() => setAddSuccess(false)}
              ></button>
            </div>
          )}
          <h1 className="card-title">Add Customer</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="first_name" className="form-label">
                First Name
              </label>
              <input
                type="text"
                className="form-control"
                id="first_name"
                name="first_name"
                value={customer.first_name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="last_name" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                className="form-control"
                id="last_name"
                name="last_name"
                value={customer.last_name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="address" className="form-label">
                Address
              </label>
              <input
                type="text"
                className="form-control"
                id="address"
                name="address"
                value={customer.address}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="phone_number" className="form-label">
                Phone Number
              </label>
              <input
                type="text"
                className="form-control"
                id="phone_number"
                name="phone_number"
                value={customer.phone_number}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Add Customer
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddCustomer;
