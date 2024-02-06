function AddSalesPerson() {
  const handleSubmit = (e) => {
    e.preventdefault();
  };
  return (
    <div className="container my-5">
      <div className="card shadow">
        <div className="card-body">
          <h1 className="card-title">Add Sales Rep.</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="first_name" className="form-label">
                First Name
              </label>
              <input
                type="text"
                className="form-control"
                id="firt_name"
                name="first_name"
                value={""}
                onChange={""}
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
                value={""}
                onChange={"handleChange"}
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
                value={""}
                onChange={"handleChange"}
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
