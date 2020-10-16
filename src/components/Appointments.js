import React, { useEffect, useState } from "react";
import axios from "axios";
import List from "./List";
import Form from "./Form";

export default (props) => {

  const [appointments, setAppointments] = useState([]);
  const [doctorsNames, setDoctorsNames] = useState([]);
  const [patientsNames, setPatientsNames] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const prospectType = props.type === "doctor" ? "patient" : "doctor";
  const dict = {
    en: {
      appointment: "Appointments",
      name: "Name",
      doctor: "Doctor",
      patient: "Patient",
      comment: "Comment",
      hour: "Hour",
      date: "Date",
      refresh: "Refresh",
    },
    es: {
      appointment: "Citas",
      name: "Nombre",
      doctor: "Doctor",
      patient: "Paciente",
      comment: "Comentario",
      hour: "Hora",
      date: "Fecha",
      refresh: "Actualizar",
    },
  };

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/appointment/")
      .then((res) => {
        setAppointments(res.data);
      })
      .catch((err) => console.log("Error getting appointments", err));
  }, []);

  const loadNames = () => {
    let doctorNamesArray = [];
    let patientsNamesArray = [];


    if (appointments.length > 0) {
      appointments.forEach(async (elem) => {
        await axios
          .get(`http://localhost:8000/doctor/${elem.doctor}`)
          .then((res) => {
            doctorNamesArray.push(res.data[`doctor_name`]);
          });
      });
      setDoctorsNames(doctorNamesArray);

      appointments.forEach(async (elem) => {
        await axios
          .get(`http://localhost:8000/patient/${elem.patient}`)
          .then((res) => {
            patientsNamesArray.push(res.data[`patient_name`]);
          });
      });
      setPatientsNames(patientsNamesArray);



      setTimeout(() => {
        setLoaded(true);
      }, 1000);
    }
  };

  const refresh = () => {
    setLoaded(false);
    axios
      .get("http://127.0.0.1:8000/appointment/")
      .then((res) => {
        setAppointments(res.data);
      })
      .catch((err) => console.log("Error getting appointments", err));
    setTimeout(() => {
      console.log(appointments)
      setLoaded(true);
    }, 2000);
  };

  useEffect(() => {
    loadNames();
  }, [appointments]);

  return (
    <>
      <h1 className="mt-5">{dict[props.lang].appointment}</h1>
      <div className="list-group-item bg-secondary">
        <div className="container">
          <div className="row">
            <div className="col-md-3 text-center text-white">
              <strong> {dict[props.lang].doctor} </strong>
            </div>
            <div className="col-md-3 text-center text-white">
              <strong> {dict[props.lang].patient} </strong>
            </div>
            <div className="col-md-2 text-center text-white">
              <strong> {dict[props.lang].comment} </strong>
            </div>
            <div className="col-md-2 text-center text-white">
              <strong> {dict[props.lang].hour} </strong>
            </div>
            <div className="col-md-2 text-center text-white">
              <strong> {dict[props.lang].date} </strong>
            </div>
          </div>
        </div>
      </div>
      <div className="list-group">
        {loaded ? (
          <List appointments={appointments} doctors={doctorsNames} patients={patientsNames} />
        ) : (
          "Loading"
        )}

        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => refresh()}
          >
            {dict[props.lang].refresh}
          </button>
        </div>

        <div>
          <Form
            lang={props.lang}
            refresh={refresh}
            currentUserId={props.location.state.id}
            type={props.location.state.type}
          />
        </div>
      </div>
    </>
  );
};
