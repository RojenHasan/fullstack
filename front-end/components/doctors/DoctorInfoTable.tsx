import React from "react"
import { Doctor } from "../../types"
import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft} from "@fortawesome/free-solid-svg-icons"

type Props = {
    doctor: Doctor | undefined
}


const DoctorInfoTable : React.FC<Props> = ({ doctor }: Props) => {
    return (
        <div className="col-6">

            {doctor && (
                    <>
                    <h4 className="text-center mb-4">Doctor {doctor.id} info</h4>
                    <table className="table table-hover table-bordered">
                    <thead >
                        <tr>
                            <th>Attribute</th>
                            <th>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="fw-bold" scope="col">Name</td>
                            <td>
                                {doctor.name}
                            </td>
                        </tr>
                        <tr>
                            <td className="fw-bold"  scope="col">Experience</td>
                            <td>
                                {doctor.experience}
                            </td>
                        </tr>
                        <tr>
                            <td className="fw-bold" scope="col">Availability</td>
                            <td>
                                {doctor.availability}
                            </td>
                        </tr>
                        <tr>
                            <td className="fw-bold" scope="col">Email</td>
                            <td>
                                {doctor.user.email}
                            </td>
                        </tr>

                        
                    </tbody>
                    </table>
             
                        
                
            <Link href="/doctors" className="btn btn-outline-primary">
                    <FontAwesomeIcon  size="xs" icon={faArrowLeft}/> Doctors
            </Link>
                    </>
            )}
        </div>
    )
}

export default DoctorInfoTable