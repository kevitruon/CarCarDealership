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
    <>
      <table>
        <thead>
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
    </>
  );
}

export default TechnicianList;
