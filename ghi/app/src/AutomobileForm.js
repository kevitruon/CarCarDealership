import React, { useState, useEffect } from "react";

function AutomobileForm() {
  const [model, setModel] = useState([]);
  const [formData, setFormData] = useState({
    vin: "",
    color: "",
    year: 0,
    model: 0,
  });
  const getData = async () => {
    const response = await fetch("http://localhost:8100/api/models/");
    if (response.ok) {
      const data = await response.json();
      setModel(data.models);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
    const autoURL = "http://localhost:8100/api/automobiles/";
    const fetchConfig = {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(autoURL, fetchConfig);
    if (response.ok) {
      setFormData({
        vin: "",
        color: "",
        year: 0,
      });
      setModel(parseInt(model.id));
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
          <h1>Add an automobile to inventory</h1>
          <form onSubmit={handleSubmit} id="create-auto-form">
            <div className="form-floating mb-3">
              <input
                onChange={handleFormChange}
                value={formData.vin}
                placeholder="vin"
                required
                type="text"
                name="vin"
                id="vin"
                className="form-control"
              />
              <label htmlFor="vin">VIN</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleFormChange}
                value={formData.color}
                placeholder="color"
                required
                type="text"
                name="color"
                id="color"
                className="form-control"
              />
              <label htmlFor="color">Color</label>
            </div>
            <div className="form-floating mb-3"></div>
            <input
              onChange={handleFormChange}
              value={parseInt(formData.year)}
              placeholder="year"
              required
              type="number"
              name="year"
              id="year"
              className="form-control"
            />
            <label htmlFor="year">Year</label>
            <div className="form-floating mb-3">
              <select
                onChange={handleFormChange}
                value={parseInt(formData.model)}
                placeholder="Model"
                required
                type="number"
                name="model"
                id="model"
                className="form-select"
              >
                <option value="">Choose a model...</option>
                {model.map((model) => {
                  return (
                    <option key={parseInt(model.id)} value={parseInt(model.id)}>
                      {model.name}
                    </option>
                  );
                })}
              </select>
              <label htmlFor="model">Model</label>
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AutomobileForm;
