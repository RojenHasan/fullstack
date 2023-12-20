import React from "react"
import { Doctor } from "../../types"
import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft, faTrash } from "@fortawesome/free-solid-svg-icons"
import DoctorService from "@/service/DoctorService"
import { useRouter } from "next/router"
type Props = {
    doctor: Doctor
}


const DeleteDoctor: React.FC<Props> = ({ doctor }: Props) => {
    const router = useRouter()

    return (
        <div className="col-6">
            {doctor && (
                <>
                    <h4 className="text-center mb-4">Delete doctor with id : {doctor.id}</h4>
                    <p>Delete doctor with <b>name:</b> {doctor.name} for <b>doctor:</b>  {doctor.user.email}?</p>
                    <button onClick={async () => {
                        await DoctorService.deleteDoctor({ id: doctor.id });
                        router.push("/doctors")
                    }} className="btn btn-outline-danger px-4 fs-6">
                        <FontAwesomeIcon size="xs" icon={faTrash} /> Yes
                    </button>
                    <button onClick={() => router.push("/doctors")} className="btn btn-outline-danger px-4 fs-6">
                        <FontAwesomeIcon size="xs" icon={faTrash} /> No
                    </button>
                </>
            )}
        </div>
    )
}



export default DeleteDoctor