import React, { useState } from "react";

function ManufacturesForm() {
  const [formData, setFormData] = useState({
    name: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
    const manURL = "http://localhost:8100/api/manufacturers/";
    const fetchConfig = {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(manURL, fetchConfig);
    if (response.ok) {
      setFormData({
        name: "",
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
          <h1 className="card-title text-center">Add a Manufacturer</h1>
          <form onSubmit={handleSubmit} id="create-manufactures-form">
            <div className="form-floating mb-3">
              <input
                onChange={handleFormChange}
                value={formData.name}
                placeholder="Name"
                required
                type="text"
                name="name"
                id="name"
                className="form-control"
              />
              <label htmlFor="Name">Name</label>
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ManufacturesForm;
