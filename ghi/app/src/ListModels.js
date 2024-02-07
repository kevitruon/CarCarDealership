import { useState, useEffect } from "react";

function ListModels() {
  const [models, setModels] = useState([]);
  const [deletionSuccess, setDeletionSuccess] = useState(false);

  useEffect(() => {
    async function loadModels() {
      try {
        const response = await fetch("http://localhost:8100/api/models/");
        if (response.ok) {
          const data = await response.json();

          setModels(data.models);
        } else {
          console.error(response);
        }
      } catch (error) {
        console.error("Error loading models rep:", error);
      }
    }
    loadModels();
  }, []);

  console.log(models);

  const handleDelete = async (model_id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this model?"
    );
    if (!confirmDelete) {
      return;
    }
    const deleteUrl = `http://localhost:8100/api/models/${model_id}/`;
    const fetchOptions = {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    };

    try {
      const deleteResponse = await fetch(deleteUrl, fetchOptions);
      if (deleteResponse.ok) {
        setModels((prevModel) =>
          prevModel.filter((model) => model.id !== model_id)
        );
        setDeletionSuccess(true);
        setTimeout(() => {
          setDeletionSuccess(false);
        }, 3000);
      } else {
        const errorMessage = await deleteResponse.text();
        console.error(
          `Error deleting model with id ${model_id}: ${errorMessage}`
        );
      }
    } catch (error) {
      console.error("Error during model deletion:", error.message);
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
              Model successfully deleted!
              <button
                type="button"
                className="btn-close"
                onClick={() => setDeletionSuccess(false)}
              ></button>
            </div>
          )}
          <h1 className="card-title text-center mb-4">Vehicle Models</h1>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Manufacture</th>
                <th>Picture</th>
              </tr>
            </thead>
            <tbody>
              {models.map((model) => {
                return (
                  <tr key={model.id}>
                    <td>{model.name}</td>
                    <td>{model.manufacturer.name}</td>
                    <td>
                      <img src={model.picture_url} alt={model.manufacturer} />
                    </td>
                    <td className="text-end">
                      <button className="btn btn-sm btn-primary me-2">
                        Update
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(model.id)}
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

export default ListModels;
