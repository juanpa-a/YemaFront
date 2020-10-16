import React from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default ({ lang = "es", refresh }) => {
  const history = useHistory();
  const dict = {
    en: {
      greet: "Hello, Yema",
      register: "Register",
      intro: "You need to create a doctor or a patient to use this demo",
      outro: "Thank you for taking the time to test my crud app!",
      name: "Name",
      email: "E-mail",
      close: "Close",
      save: "Save",
      doctor: "Doctor",
      patient: "Patient",
    },
    es: {
      greet: "Hola, YEMA!",
      register: "Registrate",
      intro: "Es necesario crear un paciente o doctor para usar este demo",
      outro: "Muchas gracias por tomarte el tiempo de probar este crud!",
      name: "Nombre",
      email: "Correo electronico",
      close: "Cerrar",
      save: "Guardar",
      doctor: "Doctor",
      patient: "Paciente",
    },
  };

  const writeDoctor = () => {
    const { name, email } = getUserData();
    axios
      .post("http://localhost:8000/doctor/", {
        doctor_name: name,
        doctor_email: email,
      })
      .then((res) => {
        history.push({
          pathname: "/app",
          state: {...res.data, type: "doctor"},
        });
      })
      .catch((err) => console.log("Error creating patient", err));
  };

  const writePatient = () => {
    const { name, email } = getUserData();
    axios
      .post("http://localhost:8000/patient/", {
        patient_name: name,
        patient_email: email,
      })
      .then((res) => {
        history.push({
          pathname: "/app",
          state: {...res.data, type: "patient"},
        });
      })
      .catch((err) => console.log("Error creating patient", err));
  };

  const getUserData = () => {
    const name = document.getElementById("user_name").value;
    const email = document.getElementById("user_email").value;
    return {
      name: name,
      email: email,
    };
  };

  const saveUser = () => {
    const isDoctor = document.getElementById("is_doctor").checked;
    const isPatient = document.getElementById("is_patient").checked;

    if (isDoctor) writeDoctor();
    else if (isPatient) writePatient();
  };

  return (
    <>
      <div className="jumbotron mt-5">
        <h1 className="display-4">{dict[lang].greet}</h1>
        <p className="lead">{dict[lang].intro}</p>
        <hr className="my-4" />
        <p>{dict[lang].outro}</p>
        <button
          type="button"
          className="btn btn-primary"
          data-toggle="modal"
          data-target="#registerModal"
        >
          {dict[lang].register}
        </button>
      </div>

      <div
        className="modal fade"
        id="registerModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="registerModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="registerModalLabel">
                {dict[lang].register}
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="input-group mb-3">
                <input
                  id="user_name"
                  type="text"
                  className="form-control"
                  placeholder={dict[lang].name}
                  aria-label="name"
                />
              </div>
              <div className="input-group mb-3">
                <input
                  id="user_email"
                  type="text"
                  className="form-control"
                  placeholder={dict[lang].email}
                  aria-label="email"
                />
              </div>

              <div className="form-check">
                <input
                  id="is_doctor"
                  className="form-check-input"
                  type="radio"
                  name="type"
                  value="option1"
                  checked
                />
                <label className="form-check-label" for="doctor">
                  {dict[lang].doctor}
                </label>
              </div>
              <div className="form-check">
                <input
                  id="is_patient"
                  className="form-check-input"
                  type="radio"
                  name="type"
                  value="option2"
                  checked
                />
                <label
                  id="is_patient?"
                  className="form-check-label"
                  htmlFor="patient"
                >
                  {dict[lang].patient}
                </label>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                {dict[lang].close}
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  saveUser()
                }}
              >
                {dict[lang].save}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
