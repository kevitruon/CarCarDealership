import { useState } from "react";

function AddSalesPerson() {
  const [salesRep, setSalesRep] = useState({
    first_name: "",
    last_name: "",
    employee_id: "",
  });
  const [addSuccess, setAddSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSalesRep((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8090/api/salespeople/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(salesRep),
      });

      if (response.ok) {
        setSalesRep({
          first_name: "",
          last_name: "",
          employee_id: "",
        });
        setAddSuccess(true);
        setTimeout(() => {
          setAddSuccess(false);
        }, 3000);
      } else {
        console.error("Error adding sales represantative");
      }
    } catch (error) {
      console.error("Error during sales rep. addition:", error.message);
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
              Sales rep successfully Added!
              <button
                type="button"
                className="btn-close"
                onClick={() => setAddSuccess(false)}
              ></button>
            </div>
          )}
          <h1 className="card-title">Add Sales Rep.</h1>
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
                value={salesRep.first_name}
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
                value={salesRep.last_name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="employee_id" className="form-label">
                Employee Id
              </label>
              <input
                type="text"
                className="form-control"
                id="employee_id"
                name="employee_id"
                value={salesRep.employee_id}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Add Sales Rep.
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddSalesPerson;
