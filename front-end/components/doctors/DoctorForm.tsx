import React, { useEffect, useState } from 'react';
import { Doctor, StatusMessage, User } from '@/types';
import DoctorService from '@/service/DoctorService';
import { useRouter } from 'next/router';
import pages from '@/pages';
import { title } from 'process';
import { Form, Button } from 'react-bootstrap';
import StatusMessageParser from '../StatusMessageParser';
import UserService from '@/service/UserService';

const DoctorForm: React.FC = () => {
    const router = useRouter()

    const [experience, setExperience] = useState("")
    const [name, setName] = useState("")
    const [availability, setAvailability] = useState("")
    const [userId, setUserId] = useState<number | undefined>(undefined);
    
    const [experienceError, setExperienceError] = useState("")
    const [nameError, setNameError] = useState("")
    const [availabilityError, setAvailabilityError] = useState("")
    const [userError, setUserError] = useState("")

    const [statusMessage, setStatusMessage] = useState<StatusMessage | null>(null);

    const [users, setUsers] = useState<Array<User>>()

    useEffect(() => {
        // Fetch the list of users and set it in the state
        const fetchUsers = async () => {
            try {
                const response = await UserService.getAllUsers(); 
                const data = await response.json();
                if (response.status === 200) {
                    setUsers(data); 
                } else {
                    console.error("Error fetching data");
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchUsers();
    }, []);
    
    const validate = (): boolean => {
        let isValid = true

        setExperienceError("")
        setNameError("")
        setAvailabilityError("")
        setUserError("")

        setStatusMessage(null)

        if (!name && name.trim() === "") {
            setNameError("Name can't be empty")
            isValid = false
        }
        if (!availability && availability.trim() === "") {
            setAvailabilityError("availability can't be empty")
            isValid = false
        }
        if (!experience && experience.trim() === "") {
            setExperienceError("experience can't be empty")
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
        const user = {
            email: users.find((u) => u.id === userId)?.email || "",
        };

        const doctor = {
            name,
            experience,
            availability,
            user: {
                email: users.find((u) => u.id === userId)?.email || "",
                password: users.find((u) => u.id === userId)?.password || "",
                role: users.find((u) => u.id === userId)?.role || "",
            },
        };
        const response = await DoctorService.addDoctor(doctor)

        const data = await response.json()
        if (response.status === 200) {
            setStatusMessage({
                type: "success",
                message: "Successfully added"
            })
            setTimeout(() => {
                router.push("/doctors")
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
            )}          <Form onSubmit={handleSubmit} style={{ marginBottom: '10rem' }}>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="name">name</Form.Label>
                    <Form.Control id="name" type="text" value={name} onChange={(event) => { setName(event.target.value) }} />
                    <Form.Text className="text-muted">
                        {nameError && <div className="text-danger">{nameError}</div>}
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="">Availability</Form.Label>
                    <Form.Control id="availability" type="text" value={availability} onChange={(event) => { setAvailability(event.target.value) }} />
                    <Form.Text className="text-muted">
                        {availabilityError && <div className="text-danger">{availabilityError}</div>}
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="">experience</Form.Label>
                    <Form.Control id="experience" type="text" value={experience} onChange={(event) => { setExperience(event.target.value) }} />
                    <Form.Text className="text-muted">
                        {experienceError && <div className="text-danger">{experienceError}</div>}
                    </Form.Text>
                </Form.Group>


                <Form.Group className="mb-3">
                    <Form.Label htmlFor="selectUser">User</Form.Label>
                    <Form.Select
                        defaultValue={'DEFAULT'}
                        id="selectUser"
                        onChange={(event) => {
                            setUserId(Number(event.target.value)); // Convert the value to a number
                        }}
                    >
                        <option value="DEFAULT" disabled>Choose existing user ...</option>
                        {users && users.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.email}
                            </option>
                        ))}
                    </Form.Select>

                    <Form.Text>
                        {userError && <div className="text-danger">{userError}</div>}
                    </Form.Text>
                </Form.Group>


                <Button variant="outline-primary"
                 type="submit">
                    Add
                </Button>
            </Form>
        </>
    )
}
export default DoctorForm;
