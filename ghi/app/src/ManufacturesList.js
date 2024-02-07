import React, { useState, useEffect } from "react";

function ManufacturesList() {
    const [man, setMan] = useState([]);
    const getData = async () => {
      const response = await fetch("http://localhost:8100/api/manufacturers/");
      if (response.ok) {
        const data = await response.json();
        setMan(data.manufacturers);
      }
    };
    useEffect(() => {
      getData();
    }, []);
    return (
      <div className="container my-5">
        <div className="card shadow">
          <div className="card-body">
            <h1>Manufacturers</h1>
            <table className="table table-striped table-hover table-borderless">
              <thead className="thead border-bottom thick-border">
                <tr>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody>
                {man.map((man) => {
                  return (
                    <tr key={man.id}>
                      <td>{man.name}</td>
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

export default ManufacturesList
