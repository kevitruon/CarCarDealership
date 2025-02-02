import React, { useState, useEffect } from "react";

function TechnicianList() {
  const [techs, setTech] = useState([]);
  const getData = async () => {
    const response = await fetch("http://localhost:8080/api/technicians/");
    if (response.ok) {
      const data = await response.json();
      setTech(data.technician);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="container my-5">
      <div className="card shadow">
        <div className="card-body">
          <h1 className="card-title text-center">Technician</h1>
          <table className="table table-striped table-hover table-borderless">
            <thead className="thead border-bottom thick-border">
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Employee ID</th>
              </tr>
            </thead>
            <tbody>
              {techs.map((techs) => {
                return (
                  <tr key={techs.id}>
                    <td>{techs.first_name}</td>
                    <td>{techs.last_name}</td>
                    <td>{techs.employee_id}</td>
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

export default TechnicianList;
