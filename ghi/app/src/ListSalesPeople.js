import { useState, useEffect } from "react";

function ListSalesPeople() {
  const [salesPeople, setSalesPeople] = useState([]);
  const [deletionSuccess, setDeletionSuccess] = useState(false);

  useEffect(() => {
    async function loadSalesReps() {
      try {
        const response = await fetch("http://localhost:8090/api/salespeople/");
        if (response.ok) {
          const data = await response.json();

          setSalesPeople(data.salespeople);
        } else {
          console.error(response);
        }
      } catch (error) {
        console.error("Error loading sales rep:", error);
      }
    }
    loadSalesReps();
  }, []);

  const handleDelete = async (rep_id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this sales rep.?"
    );
    if (!confirmDelete) {
      return;
    }
    const deleteUrl = `http://localhost:8090/api/salespeople/${rep_id}/`;
    const fetchOptions = {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    };

    try {
      const deleteResponse = await fetch(deleteUrl, fetchOptions);
      if (deleteResponse.ok) {
        setSalesPeople((prevSalepPeople) =>
          prevSalepPeople.filter((person) => person.id !== rep_id)
        );
        setDeletionSuccess(true);
        setTimeout(() => {
          setDeletionSuccess(false);
        }, 3000);
      } else {
        const errorMessage = await deleteResponse.text();
        console.error(`Error deleting hat with id ${rep_id}: ${errorMessage}`);
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
              Sales rep successfully deleted!
              <button
                type="button"
                className="btn-close"
                onClick={() => setDeletionSuccess(false)}
              ></button>
            </div>
          )}
          <h1 className="card-title text-center mb-4">Sales Represantatives</h1>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Employee Id</th>
              </tr>
            </thead>
            <tbody>
              {salesPeople.map((person) => {
                return (
                  <tr key={person.id}>
                    <td>{`${person.first_name} ${person.last_name}`}</td>
                    <td>{person.employee_id}</td>
                    <td className="text-end">
                      <button className="btn btn-sm btn-primary me-2">
                        Update
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(person.id)}
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

export default ListSalesPeople;
