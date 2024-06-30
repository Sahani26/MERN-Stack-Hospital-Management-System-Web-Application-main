import React, { useEffect, useState } from 'react'
import axios from "axios";
export default function Apoint() {
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [email, setEmail] = useState("")
    const [number, setNumber] = useState("")
    const [nic, setNic] = useState("")
    const [birth, setBirth] = useState("")
    const [gender, setGender] = useState("")
    const [apdate, setApdate] = useState("")
    const [address, setAddress] = useState("")
    const [department, setDepartment] = useState("Pediatrics");
    const [formDataArray, setFormDataArray] = useState([]);
    const [doctorFirstName, setDoctorFirstName] = useState("");
    const [doctorLastName, setDoctorLastName] = useState("");


    const hendleonsubmit = (e) => {
        e.preventDefault();
        const newFormData = {
            firstname,
            lastname,
            email,
            number,
            nic,
            birth,
            gender,
            apdate,
            address,
        };
        setFormDataArray([...formDataArray, newFormData]);
        console.log([...formDataArray, newFormData]);
    }
    const departmentsArray = [
        "Pediatrics",
        "Orthopedics",
        "Cardiology",
        "Neurology",
        "Oncology",
        "Radiology",
        "Physical Therapy",
        "Dermatology",
        "ENT",
    ];

    const [doctors, setDoctors] = useState([]);
    useEffect(() => {
        const fetchDoctors = async () => {
            const { data } = await axios.get(
                "http://localhost:4000/api/v1/user/doctors",
                { withCredentials: true }
            );
            setDoctors(data.doctors);
            // console.log(data.doctors);
        };
        fetchDoctors();
    }, []);

    return (


        <>
            <div className="container form-component appointment-form " style={{ marginTop: '50px' }}>

                <form onSubmit={hendleonsubmit}>
                    <div>
                        <input
                            type="text"
                            placeholder="First Name"
                            value={firstname}
                            onChange={(e) => setFirstname(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Last Name"
                            value={lastname}
                            onChange={(e) => setLastname(e.target.value)}

                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="number"
                            placeholder="Mobile Number"
                            value={number}
                            onChange={(e) => setNumber(e.target.value)}

                            inputMode="numeric"
                            pattern="[0-9]*"
                        />
                    </div>
                    <div>
                        <input
                            type="number"
                            placeholder="NIC"
                            value={nic}
                            onChange={(e) => setNic(e.target.value)}
                        />
                        <input
                            type="date"
                            placeholder="Date of Birth"
                            value={birth}
                            onChange={(e) => setBirth(e.target.value)}
                        />
                    </div>
                    <div>
                        <select  >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                        </select>
                        <input
                            type="date"
                            placeholder="Appointment Date"
                            value={apdate}
                            onChange={(e) => setApdate(e.target.value)}
                        />
                    </div>
                    <div>
                        <div>
                            <select
                                value={department}
                                onChange={(e) => {
                                    setDepartment(e.target.value);

                                }}

                            >

                                {
                                    departmentsArray.map((depart, index) => {
                                        return (
                                            <option value={depart} key={index}>
                                                {depart}
                                            </option>
                                        )
                                    })
                                }


                            </select>
                            <select
                                value={`${doctorFirstName} ${doctorLastName}`}
                                onChange={(e) => {
                                    const [firstName, lastName] = e.target.value.split(" ");
                                    setDoctorFirstName(firstName);
                                    setDoctorLastName(lastName);
                                }}
                                disabled={!department}
                            >
                                <option value="">Select Doctor</option>
                                {doctors
                                    .filter((doctor) => doctor.doctorDepartment === department)
                                    .map((doctor, index) => (
                                        <option
                                            value={`${doctor.firstName} ${doctor.lastName}`}
                                            key={index}
                                        >
                                            {doctor.firstName} {doctor.lastName}
                                        </option>
                                    ))}
                            </select>

                        </div>
                    </div>
                    <textarea
                        rows="3"

                        placeholder="Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />

                    <button style={{ margin: "0 auto" }}>GET APPOINTMENT</button>
                </form>
            </div>
        </>
    )
}
