import React from "react"
import { Doctor } from "../../types"
import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo, faTrash, faPen } from "@fortawesome/free-solid-svg-icons";


type Props = {
    doctors: Array<Doctor>;
    onDoctorClick: (doctor: Doctor) => void;
    userRole: string | null;
}


const DoctorsOverviewTable: React.FC<Props> = ({ doctors, onDoctorClick, userRole }: Props) => {
    const isAdmin = userRole === 'admin';
    return (
        <>
            {doctors && (
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">DoctorInfo</th>
                            {isAdmin && <th scope="col">Delete</th>}
                            {isAdmin && <th scope="col">Update</th>}
                            <th scope="col">Make appointment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {doctors.map((doctor) => (
                            <tr
                                key={doctor.id}
                                onClick={() => onDoctorClick(doctor)}
                                role="button">
                                <td>{doctor.name}</td>
                                <td><Link href={`/doctors/${doctor.id}`} className="btn btn-outline-info"><FontAwesomeIcon size="xs" icon={faInfo} /></Link></td>
                                {isAdmin && <td><Link href={`/doctors/${doctor.id}/delete`} className="btn btn-outline-danger"><FontAwesomeIcon size="xs" icon={faTrash} /></Link></td>}
                                {isAdmin && <td><Link href={`/doctors/${doctor.id}/update`} className="btn btn-outline-primary"><FontAwesomeIcon size="xs" icon={faPen} /></Link></td>}
                                <td>
                                    <Link href={`/doctors/${doctor.id}/appointments`} className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
                                        +
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    )
}

export default DoctorsOverviewTable