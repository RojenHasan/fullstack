import React from "react"
import { Patient } from "../../types"
import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import { faInfo, faTrash, faPen } from "@fortawesome/free-solid-svg-icons"; 


type Props = {
    patients: Array<Patient>
}


const PatientsOverviewTable: React.FC<Props> = ({ patients }: Props) => {
    return (
        <>
            {patients && (
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">medical_History</th>
                        <th scope="col">street</th>
                        <th scope="col">postcode</th>
                        <th scope="col">housenr</th>
                        <th scope="col">stad</th>
                    </tr>
                </thead><tbody>
                        {patients.map((patient, index) => (
                            <tr key={index}>
                                <td>{patient.name}</td>
                                <td>{patient.medical_History}</td>
                                <td>{patient.street}</td>
                                <td>{patient.postcode}</td>
                                <td>{patient.housenr}</td>
                                <td>{patient.stad}</td>
                            </tr>
                        )
                        )}
                    </tbody>
                </table>
            )}
        </>
    );
}

export default PatientsOverviewTable