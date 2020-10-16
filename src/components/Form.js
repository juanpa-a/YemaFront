import React, { useEffect, useState } from "react";
import axios from "axios";

export default ({ lang, type, currentUserId, refresh }) => {
  const [prospects, setProspects] = useState([]);
  const prospectType = type === "doctor" ? "patient" : "doctor";
  const dict = {
    en: {
      create: "Schedule an appointment",
      hour: "Hour",
      date: "Date",
      comment: "Add a comment",
      doctor: "Choose your doctor",
      patient: "Choose your patient",
      save: "Schedule",
    },
    es: {
      create: "Haz una cita",
      hour: "Hora",
      date: "Fecha",
      comment: "Deja un comentario",
      doctor: "Selecciona a tu doctor",
      patient: "Selecciona a tu paciente",
      save: "Agendar",
    },
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8000/${prospectType}/`)
      .then((res) => setProspects(res.data));
  }, []);

  const getData = () => {
    return {
      doctor:
        type === "doctor"
          ? currentUserId
          : document.getElementById("prospect").value,
      patient:
        type === "patient"
          ? currentUserId
          : document.getElementById("prospect").value,
      comments: document.getElementById("comment").value,
      date: document.getElementById("date").value,
      hour: document.getElementById("hour").value,
    };
  };

  const saveAppointment = () => {
    const payload = getData();
    axios
      .post("http://127.0.0.1:8000/appointment/", payload)
      .then((res) => console.log(res.data))
      .catch((err) => console.log("Error creating appointment", err));
  };

  return (
    <>
      <h1 className="mt-5">{dict[lang].create}</h1>
      <form>
        <div className="form-group">
          <label htmlFor="prospect">{dict[lang][prospectType]}</label>
          <select className="form-control" id="prospect">
            {prospects.map((elem) => (
              <option key={elem.id} value={elem.id}>
                {elem[`${prospectType}_name`]}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="comment">{dict[lang].comment}</label>
          <textarea
            id="comment"
            className="form-control"
            id="comment"
            rows="3"
          ></textarea>
        </div>

        <div className="row">
          <div className="col">
            <label className="mr-5" for="appt">
              {dict[lang].hour}
            </label>
            <input type="time" id="hour" name="appt" />
          </div>
          <div className="col">
            <label className="mr-5" for="birthday">
              {dict[lang].date}
            </label>
            <input type="date" id="date" name="date" />
          </div>
        </div>
      </form>

      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-success mt-3 mb-5"
          onClick={() => {
            saveAppointment();
            refresh();
          }}
        >
          {dict[lang].save}
        </button>
      </div>
    </>
  );
};
