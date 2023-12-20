import React, { useState } from "react";
import { Appointment } from "../../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";
import router from "next/router";
import MedicalTestForm from "@/components/medicalTests/medicalTestForm";
import Link from "next/link";

type Props = {
  appointments: Array<Appointment>;
  onAppointementClick: (appointment: Appointment) => void;
};

const AppointmentsOverviewTable: React.FC<Props> = ({
  appointments,
  onAppointementClick,
}: Props) => {
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<number | null>(null);

  const handleMedicalTestClick = (appointment: Appointment) => {
    if (appointment.id !== undefined) {
      setSelectedAppointmentId(appointment.id);
      onAppointementClick(appointment);
    }
  };

  return (
    <>
      {appointments.length > 0 ? (
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Time</th>
              <th scope="col">Doctor</th>
              <th scope="col">Patient</th>
              <th scope="col">Medical Record</th>
              <th scope="col">Medical Test</th>
              <th scope="col">Delete</th>
              <th scope="col">Update</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment, index) => (
              <React.Fragment key={index}>
                <tr key={appointment.id} onClick={() => onAppointementClick(appointment)}>
                  <td>{appointment.date && format(new Date(appointment.date), "MM/dd/yyyy")}</td>
                  <td>{appointment.time && format(new Date(appointment.time), "HH:mm:ss")}</td>
                  <td>{appointment.doctor.name}</td>
                  <td>{appointment.patient.name}</td>
                  <td>
                    {appointment.medicalRecord ? (
                      appointment.medicalRecord.diagnosis
                    ) : (
                      <button
                        className="btn btn-link"
                        onClick={() => {
                          router.push({
                            pathname: `/medicalRecords/add`,
                            query: { appointmentId: appointment.id },
                          });
                        }}
                      >
                        <FontAwesomeIcon size="xs" icon={faPlus} />
                      </button>
                    )}
                  </td>
                  <td>
                    <button className="btn btn-link" onClick={() => handleMedicalTestClick(appointment)}>
                      <FontAwesomeIcon size="xs" icon={faPlus} />
                    </button>
                  </td>
                  <td>
                    <Link href={`/appointments/${appointment.id}/delete`} className="btn btn-outline-danger">
                      <FontAwesomeIcon size="xs" icon={faTrash} />
                    </Link>
                  </td>
                  <td>
                    <Link href={`/appointments/${appointment.id}/update`} className="btn btn-outline-primary">
                      <FontAwesomeIcon size="xs" icon={faPen} />
                    </Link>
                  </td>
                </tr>
                {selectedAppointmentId === appointment.id && (
                  <tr>
                    <td colSpan={8}>
                      <MedicalTestForm appointmentId={appointment.id} />
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No medicalTests available</p>
      )}
    </>
  );
};

export default AppointmentsOverviewTable;
