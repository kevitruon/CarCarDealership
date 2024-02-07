import React, { useState, useEffect } from "react";

function AutomobileList() {
    const [autos, setAutos] = useState([]);
    const getData = async () => {
      const response = await fetch("http://localhost:8100/api/automobiles/");
      if (response.ok) {
        const data = await response.json();
        setAutos(data.autos);
      }
    };
    useEffect(() => {
      getData();
    }, []);
    return (
      <div className="container my-5">
        <div className="card shadow">
          <div className="card-body">
            <h1>Automobiles</h1>
            <table className="table table-striped table-hover table-borderless">
              <thead className="thead border-bottom thick-border">
                <tr>
                <th>VIN</th>
                <th>Color</th>
                <th>Year</th>
                <th>Model</th>
                <th>Manufacturer</th>
                <th>Sold</th>
                </tr>
              </thead>
              <tbody>
                {autos.map((autos) => {
                  return (
                    <tr key={autos.id}>
                      <td>{autos.vin}</td>
                      <td>{autos.color}</td>
                      <td>{autos.year}</td>
                      <td>{autos.model.name}</td>
                      <td>{autos.model.manufacturer.name}</td>
                      <td>{autos.sold}</td>
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

export default AutomobileList
