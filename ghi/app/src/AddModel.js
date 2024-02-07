import { useState, useEffect } from "react";

function AddModel() {
  const [model, setModel] = useState({
    name: "",
    picture_url: "",
    manufacturer_id: 0,
  });
  const [manufacture, setManufacture] = useState([]);
  const [addSuccess, setAddSuccess] = useState(false);

  useEffect(() => {
    async function loadManufacture() {
      try {
        const response = await fetch(
          "http://localhost:8100/api/manufacturers/"
        );
        if (response.ok) {
          const data = await response.json();

          setManufacture(data.manufacturers);
        } else {
          console.error(response);
        }
      } catch (error) {
        console.error("Error loading manufactures rep:", error);
      }
    }
    loadManufacture();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setModel((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8100/api/models/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(model),
      });

      if (response.ok) {
        setModel({
          name: "",
          picture_url: "",
          manufacturer_id: 0,
        });
        setAddSuccess(true);
        setTimeout(() => {
          setAddSuccess(false);
        }, 3000);
      } else {
        console.error("Error adding model");
      }
    } catch (error) {
      console.error("Error during model addition:", error.message);
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
              Model successfully Added!
              <button
                type="button"
                className="btn-close"
                onClick={() => setAddSuccess(false)}
              ></button>
            </div>
          )}
          <h1 className="card-title text-center">Create a vehicle model</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Model Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={model.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="picture_url" className="form-label">
                Picture URL
              </label>
              <input
                type="text"
                className="form-control"
                id="picture_url"
                name="picture_url"
                value={model.picture_url}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="preview" className="form-label">
                Picture Preview
              </label>
              <img
                src={model.picture_url}
                alt="Model Preview"
                className="img-fluid"
                style={{ maxHeight: "200px" }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="manufacture" className="form-label">
                Manufacture
              </label>
              <select
                value={model.automobile}
                onChange={handleChange}
                className="form-control"
                name="manufacturer_id"
              >
                <option value="">Choose manfucature</option>
                {manufacture.map(({ id, name }) => (
                  <option value={id} key={id}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className="btn btn-primary">
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddModel;
