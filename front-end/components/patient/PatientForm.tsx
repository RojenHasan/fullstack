import Head from "next/head"
import { Button, Form } from "react-bootstrap"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import StatusMessageParser from "../../components/StatusMessageParser"
import Footer from "../../components/Footer"
import PatientService from "@/service/PatientService"
import { Patient, StatusMessage, User } from "../../types"
import UserService from "@/service/UserService"

const PatientForm: React.FC = () => {
    const router = useRouter()

    const [name, setName] = useState("")
    const [userId, setUserId] = useState<number | undefined>(undefined);
    const [medical_History, setMedical_History] = useState("")
    const [street, setStreet] = useState("")
    const [postcode, setPostcode] = useState<number | undefined>(undefined);
    const [housenr, setHousenr] = useState<number | undefined>(undefined)
    const [stad, setStad] = useState("")

    const [nameError, setNameError] = useState("")
    const [userError, setUserError] = useState("")
    const [medical_HistoryError, setMedical_HistoryError] = useState("")
    const [streetError, setStreetError] = useState("")
    const [postcodeError, setPostcodeError] = useState("")
    const [housenrError, setHousenrError] = useState("")
    const [stadError, setStadError] = useState("")
    
    const [statusMessage, setStatusMessage] = useState<StatusMessage | null>(null);
    const [users, setUsers] = useState<Array<User>>()

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await UserService.getAllUsers();
                const data = await response.json();
                if (response.status === 200) {
                    setUsers(data); 
                } else {
                    // Handle the error
                }
            } catch (error) {
                // Handle any fetch errors
            }
        };

        fetchUsers();
    }, []);
    
    const validate = (): boolean => {
        let isValid = true

        setHousenrError("")
        setMedical_HistoryError("")
        setNameError("")
        setPostcodeError("")
        setStreetError("")
        setStadError("")

        setStatusMessage(null)

        if (!name && name.trim() === "") {
            setNameError("Name can't be empty")
            isValid = false
        }
        if (!street && street.trim() === "") {
            setStreetError("Street can't be empty")
            isValid = false
        }
        if (!stad && stad.trim() === "") {
            setStadError("Stad can't be empty")
            isValid = false
        }
        

        if (!userId) {
            setUserError("Choose a user")
            isValid = false
        }


        return isValid
    }

    const handleSubmit = async (event: any) => {
        event.preventDefault()
        if (!validate() || users === undefined) {
            return
        }
      

        const patient = {
            name,
            user: {
                email: users.find((u) => u.id === userId)?.email || "",
                password: users.find((u) => u.id === userId)?.password || "",
                role: users.find((u) => u.id === userId)?.role || "",
            },
            medical_History,
            street,
            postcode,
            housenr,
            stad
        };
        const response = await PatientService.addPatient(patient)

        const data = await response.json()
        if (response.status === 200) {
            setStatusMessage({
                type: "success",
                message: "Successfully added"
            })
            setTimeout(() => {
                router.push("/patients")
            }, 2000)

        } else if (response.status === 401) {
            setStatusMessage({
                type: "unauthorized",
                message: data.errorMessage
            })
        } else {
            setStatusMessage({
                type: "error",
                message: data.errorMessage
            })
        }
    }
    return (
        <>
            {statusMessage !== null && (
                <StatusMessageParser statusMessage={statusMessage} />
            )}           <Form onSubmit={handleSubmit} style={{ marginBottom: '10rem' }}>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="name">name</Form.Label>
                    <Form.Control id="name" type="text" value={name} onChange={(event) => { setName(event.target.value) }} />
                    <Form.Text className="text-muted">
                        {nameError && <div className="text-danger">{nameError}</div>}
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="">medical_History</Form.Label>
                    <Form.Control id="medical_History" type="text" value={medical_History} onChange={(event) => { setMedical_History(event.target.value) }} />
                    <Form.Text className="text-muted">
                        {medical_HistoryError && <div className="text-danger">{medical_HistoryError}</div>}
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="">Street</Form.Label>
                    <Form.Control id="street" type="text" value={street} onChange={(event) => { setStreet(event.target.value) }} />
                    <Form.Text className="text-muted">
                        {streetError && <div className="text-danger">{streetError}</div>}
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="">Postcode</Form.Label>
                    <Form.Control id="postcode" type="number" value={postcode} onChange={(event) => { setPostcode(Number(event.target.value)) }} />
                    <Form.Text className="text-muted">
                        {postcodeError && <div className="text-danger">{postcodeError}</div>}
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="">Housenr</Form.Label>
                    <Form.Control id="housenr" type="number" value={housenr} onChange={(event) => { setHousenr(Number(event.target.value)) }} />
                    <Form.Text className="text-muted">
                        {housenrError && <div className="text-danger">{housenrError}</div>}
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="">Stad</Form.Label>
                    <Form.Control id="stad" type="text" value={stad} onChange={(event) => { setStad(event.target.value) }} />
                    <Form.Text className="text-muted">
                        {stadError && <div className="text-danger">{stadError}</div>}
                    </Form.Text>
                </Form.Group>


                <Form.Group className="mb-3">
                    <Form.Label htmlFor="selectUser">User</Form.Label>
                    <Form.Select
                        defaultValue={'DEFAULT'}
                        id="selectUser"
                        onChange={(event) => {
                            setUserId(parseInt(event.target.value)); // Convert the value to a number
                        }}
                    >
                        <option value="DEFAULT" disabled>Choose existing user ...</option>
                        {users && users.map((user, index) => (
                            <option key={index} value={user.id}>
                                {user.email}
                            </option>
                        ))}
                    </Form.Select>

                    <Form.Text>
                        {userError && <div className="text-danger">{userError}</div>}
                    </Form.Text>
                </Form.Group>


                <Button variant="outline-primary" type="submit">
                    Add
                </Button>
            </Form>
        </>
    )
}
export default PatientForm;
