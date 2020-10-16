import React from "react";

export default ({ appointments, doctors, patients }) => {
  return appointments.map((elem, i) => {
    return (
      <div key={`user-${i}`} className="list-group-item">
        <div className="container">
          <div className="row">
            <div className="col-md-3 text-center">
              <span> {doctors[i]} </span>
            </div>
            <div className="col-md-3 text-center">
              <span> {patients[i]} </span>
            </div>
            <div className="col-md-2 text-center">
              <span> {elem.comments} </span>
            </div>
            <div className="col-md-2 text-center">
              <span> {elem.hour} </span>
            </div>
            <div className="col-md-2 text-center">
              <span> {elem.date} </span>
            </div>
          </div>
        </div>
      </div>
    );
  });
};
