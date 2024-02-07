import React, { useEffect, useState } from "react";

function AppointmentList() {
  const [app, setApp] = useState([]);
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
  const cancelStatus = (id) => {
    const appURL = "http://localhost:8080/api/appointments/" + id + "/";
    const fetchConfig = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ finished: "" }),
    };
    fetch(appURL, fetchConfig);
  };
  const finishStatus = (id) => {
    const appURL = "http://localhost:8080/api/appointments/" + id + "/";
    const fetchConfig = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ finished: true }),
    };
    fetch(appURL, fetchConfig);
  };
  return (
    <>
      <h1>Appointment</h1>
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
          </tr>
        </thead>
        <tbody>
          {app.map((app) => {
            if (app.finished === false) {
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
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => cancelStatus(app.id)}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={() => finishStatus(app.id)}
                    >
                      Finish
                    </button>
                  </td>
                </tr>
              );
            }
          })}
        </tbody>
      </table>
    </>
  );
}
export default AppointmentList;
