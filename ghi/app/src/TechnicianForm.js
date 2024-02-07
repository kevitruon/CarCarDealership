import React, { useState } from "react";

function TechnicianForm() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    employee_id: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
    const techURL = "http://localhost:8080/api/technicians/";
    const fetchConfig = {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(techURL, fetchConfig);
    if (response.ok) {
      setFormData({
        first_name: "",
        last_name: "",
        employee_id: "",
      });
    } else {
      console.error("Error:", response.status, response.statusText);
    }
  };
  const handleFormChange = (event) => {
    const value = event.target.value;
    const inputName = event.target.name;
    setFormData({
      ...formData,
      [inputName]: value,
    });
  };
  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1 className="card-title text-center">Add a Technician</h1>
          <form onSubmit={handleSubmit} id="create-tech-form">
            <div className="form-floating mb-3">
              <input
                onChange={handleFormChange}
                value={formData.first_name}
                placeholder="firstName"
                required
                type="text"
                name="first_name"
                id="first_name"
                className="form-control"
              />
              <label htmlFor="firstName">First Name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleFormChange}
                value={formData.last_name}
                placeholder="lastName"
                required
                type="text"
                name="last_name"
                id="last_name"
                className="form-control"
              />
              <label htmlFor="lastName">Last Name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleFormChange}
                value={formData.employee_id}
                placeholder="employeeID"
                required
                type="text"
                name="employee_id"
                id="employee_id"
                className="form-control"
              />
              <label htmlFor="employeeID">Employee ID</label>
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default TechnicianForm;
