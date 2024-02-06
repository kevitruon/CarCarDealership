import React, {useState, useEffect} from 'react'

function AppointmentForm() {
    const [tech, setTech] = useState([])
    const [FormData,setFormData]= useState({
        vin: "",
        owner: "",
        date_time: "",
        technician: "",
        reason: "",
    })
    const getData = async () => {
        const response = await fetch("http://localhost:8080/api/technicians/")
        if (response.ok) {
            const data = await response.json()
            setTech(data.technician)
        }
    }
    useEffect(() => {
        getData()
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault()
        console.log(FormData)
        const techURL = "http://localhost:8080/api/service_appointments/"
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(FormData),
            headers: {
                "Content-Type": "application/json",
            },
        }
        const response = await fetch(techURL, fetchConfig)
        if (response.ok) {
            setFormData({
                vin: "",
                owner: "",
                date_time: "",
                technician: "",
                reason: "",
            })
        } else {
            console.error("Error:", response.status, response.statusText)
        }
    }
    const handleFormChange = (event) => {
        const value = event.target.value
        const inputName = event.target.name
        setFormData({
            ...FormData,
            [inputName]: value,
        })
    }
  return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Create a Service Appointment</h1>
                        <form onSubmit={handleSubmit} id="create-tech-form">
                            <div className="form-floating mb-3">
                                <input
                                    onChange={handleFormChange}
                                    value={FormData.vin}
                                    placeholder="vin"
                                    required
                                    type="text"
                                    name="vin"
                                    id="vin"
                                    className="form-control"
                                />
                                <label htmlFor="vin">VIN</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    onChange={handleFormChange}
                                    value={FormData.owner}
                                    placeholder="owner"
                                    required
                                    type="text"
                                    name="owner"
                                    id="owner"
                                    className="form-control"
                                />
                                <label htmlFor="owner">Owner</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    onChange={handleFormChange}
                                    value={FormData.date_time}
                                    placeholder="date_time"
                                    required
                                    type="text"
                                    name="date_time"
                                    id="date_time"
                                    className="form-control"
                                />
                                <label htmlFor="date_time">Date and Time</label>
                            </div>
                            <div className="form-floating mb-3">
                                <select
                                    onChange={handleFormChange}
                                    value={FormData.technician}
                                    placeholder="technician"
                                    required
                                    type="text"
                                    name="technician"
                                    id="technician"
                                    className="form-select"
                                >
                                    <option value="">Select a Technician</option>
                                    {tech.map((tech) => {
                                        return (
                                            <option key={tech.id} value={tech.id}>
                                                {tech.first_name} {tech.last_name}
                                            </option>
                                        )
                                    })}
                                </select>
                                <label htmlFor="technician">Technician</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    onChange={handleFormChange}
                                    value={FormData.reason}
                                    placeholder="reason"
                                    required
                                    type="text"
                                    name="reason"
                                    id="reason"
                                    className="form-control"
                                />
                                <label htmlFor="reason">Reason</label>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

    export default AppointmentForm;
