import React, { useEffect, useState } from "react";

function AppointmentHist() {
  const [app, setApp] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const getData = async () => {
    const response = await fetch("http://localhost:8080/api/appointments/");
    if (response.ok) {
      const data = await response.json();
      setApp(data.appointment);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  const handleSearch = (event) => {
    setSearchValue(event.target.value);
  };

  const filteredAppointments = app.filter((appointment) => {
    return appointment.vin.toLowerCase().includes(searchValue.toLowerCase());
  });
  return (
    <div className="container my-5">
      <div className="card shadow">
        <div className="card-body">
          <h1>Appointment</h1>
          <input
              type="text"
              className="form-control"
              placeholder="Search by VIN"
              value={searchValue}
              onChange={handleSearch}
            />
          <h1 className="card-title text-center">Appointment</h1>
          <table className="table table-striped table-hover table-borderless">
            <thead className="thead border-bottom thick-border">
              <tr>
                <th>VIN</th>
                <th>Is VIP?</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Time</th>
                <th>Technician</th>
                <th>Reason</th>
                <th>Finished?</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.map((app) => {
                return (
                  <tr key={app.id}>
                    <td>{app.vin}</td>
                    <td>{app.vip ? "Yes" : "No"}</td>
                    <td>{app.owner}</td>
                    <td>{app.date}</td>
                    <td>{app.time}</td>
                    <td>
                      {app.technician.first_name} {app.technician.last_name}
                    </td>
                    <td>{app.reason}</td>
                    <td>
                      {app.finished === null
                        ? "Canceled"
                        : app.finished
                        ? "Complete"
                        : "Created"}
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
export default AppointmentHist;
