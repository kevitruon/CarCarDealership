import { useState, useEffect } from "react";

function AddSale() {
  const [addSuccess, setAddSuccess] = useState(false);

  const [autos, setAutos] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [salesPerson, setSalesPerson] = useState([]);

  const [formData, setFormData] = useState({
    automobile: 0,
    salesperson: 0,
    customer: 0,
    price: 0,
  });

  useEffect(() => {
    async function loadSalesReps() {
      try {
        const response = await fetch("http://localhost:8090/api/salespeople/");
        if (response.ok) {
          const data = await response.json();

          setSalesPerson(data.salespeople);
        } else {
          console.error(response);
        }
      } catch (error) {
        console.error("Error loading sales rep:", error);
      }
    }
    loadSalesReps();

    async function loadCustomers() {
      try {
        const response = await fetch("http://localhost:8090/api/customers/");
        if (response.ok) {
          const data = await response.json();

          setCustomers(data.customers);
        } else {
          console.error(response);
        }
      } catch (error) {
        console.error("Error loading customers:", error);
      }
    }
    loadCustomers();

    async function loadAutos() {
      try {
        const response = await fetch("http://localhost:8100/api/automobiles/");

        if (response.ok) {
          const data = await response.json();

          const autosAvaliable = data.autos.filter((auto) => !auto.sold);

          setAutos(autosAvaliable);
        } else {
          console.error(response);
        }
      } catch (error) {
        console.error("Error loading autos:", error);
      }
    }
    loadAutos();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8090/api/sales/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({
          automobile: 0,
          salesperson: 0,
          customer: 0,
          price: 0,
        });
        setAddSuccess(true);
        setTimeout(() => {
          setAddSuccess(false);
        }, 3000);
      } else {
        console.error("Error adding sale");
      }
    } catch (error) {
      console.error("Error during sale addition:", error.message);
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
              Sale successfully added!
              <button
                type="button"
                className="btn-close"
                onClick={() => setAddSuccess(false)}
              ></button>
            </div>
          )}
          <h1 className="card-title text-center mb-4">Add Sales</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="vin" className="form-label">
                Automobile Vin
              </label>
              <select
                value={formData.automobile}
                onChange={handleChange}
                className="form-control"
                name="automobile"
              >
                <option value="">Choose an Automobile vin</option>
                {autos.map(({ id, vin }) => (
                  <option value={id} key={id + vin}>
                    {vin}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="salesperson" className="form-label">
                Salesperson
              </label>
              <select
                value={formData.salesperson}
                onChange={handleChange}
                className="form-control"
                name="salesperson"
              >
                <option value="">Choose a salesperson</option>
                {salesPerson.map(({ id, first_name, last_name }) => (
                  <option value={id} key={id}>
                    {`${first_name}, ${last_name}`}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="customer" className="form-label">
                Customer
              </label>
              <select
                value={formData.customer}
                onChange={handleChange}
                className="form-control"
                name="customer"
              >
                <option value="">Choose a customer</option>
                {customers.map(({ id, first_name, last_name }) => (
                  <option value={id} key={id}>
                    {`${first_name}, ${last_name}`}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="price" className="form-label">
                Price
              </label>
              <input
                value={formData.price}
                onChange={handleChange}
                type="number"
                className="form-control"
                name="price"
                step="0.01"
              ></input>
            </div>

            <button className="btn btn-lg btn-primary w-100" type="submit">
              Create Sale
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddSale;
