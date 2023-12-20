import { Button, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import StatusMessageParser from "../StatusMessageParser";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import pages from "@/pages";
import { StatusMessage, User } from "@/types";
import { title } from "process";
import UserService from "@/service/UserService";
import DoctorService from "@/service/DoctorService";

const UpdateDoctor: React.FC = () => {
    const router = useRouter();

    const [id, setId] = useState<number | undefined>(undefined);
    const [experience, setExperience] = useState("");
    const [name, setName] = useState("");
    const [availability, setAvailability] = useState("");
    const [userId, setUserId] = useState<number | undefined>(undefined);

    const [experienceError, setExperienceError] = useState("");
    const [nameError, setNameError] = useState("");
    const [availabilityError, setAvailabilityError] = useState("");
    const [userError, setUserError] = useState("");

    const [statusMessage, setStatusMessage] = useState<StatusMessage | null>(null);

    const [users, setUsers] = useState<Array<User>>([]);

    const doctorToUpdate = async () => {
        try {
            // Check if doctorId is available in router.query
            if (!router.query.doctorId) {
                console.error("Doctor ID is undefined");
                return;
            }

            const doctorId = Number(router.query.doctorId);

            // Check if doctorId is a valid number
            if (isNaN(doctorId)) {
                console.error("Invalid Doctor ID:", router.query.doctorId);
                return;
            }

            const response = await DoctorService.getDoctorById(doctorId);

            // Check if the response status is OK (200)
            if (response.ok) {
                const body = await response.text();
                const doctorFound = body ? JSON.parse(body) : null;

                if (doctorFound) {
                    setName(doctorFound.name);
                    setAvailability(doctorFound.availability);
                    setExperience(doctorFound.experience);
                    setId(doctorId);
                } else {
                    throw new Error("Empty or invalid JSON in doctor response");
                }
            } else {
                // If the response status is not OK, handle the error
                throw new Error(`Failed to fetch doctor: ${response.statusText}`);
            }
        } catch (error) {
            console.error("Error fetching doctor:", error);
            // Handle error, e.g., show an error message to the user
        }
    };

    const getUsers = async () => {
        try {
            const response = await UserService.getAllUsers();
            const usersData = await response.json();
            setUsers(usersData);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    useEffect(() => {
        if (router.isReady) {
            doctorToUpdate();
        }
        getUsers();
    }, [router.isReady]);

    const validate = (): boolean => {
        let isValid = true;

        setExperienceError("");
        setNameError("");
        setAvailabilityError("");
        setUserError("");

        setStatusMessage(null);

        if (!name || name.trim() === "") {
            setNameError("Name can't be empty");
            isValid = false;
        }
        if (!availability || availability.trim() === "") {
            setAvailabilityError("Availability can't be empty");
            isValid = false;
        }
        if (!experience || experience.trim() === "") {
            setExperienceError("Experience can't be empty");
            isValid = false;
        }

        return isValid;
    };

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        if (!validate() || users.length === 0) {
            return;
        }

        const user = users.find((u) => u.id === userId);

        if (!user) {
            setUserError("Selected user not found");
            return;
        }

        const doctor = {
            id: id || -1,
            name,
            experience,
            availability,
            user: {
                id: user.id,  // Keep the user id the same
                email: user.email,
                password: "your-placeholder-password",
                role: 'existingPatient.user.role || ""',
            },
        };

        try {
            const response = await DoctorService.updateDoctor(doctor);

            if (response.status === 200) {
                const body = await response.text();
                const data = body ? JSON.parse(body) : null;

                if (data) {
                    setStatusMessage({
                        type: "success",
                        message: "Successfully updated",
                    });
                    setTimeout(() => {
                        router.push("/doctors");
                    }, 2000);
                } else {
                    throw new Error("Empty or invalid JSON in update response");
                }
            } else if (response.status === 401) {
                const data = await response.json();
                setStatusMessage({
                    type: "unauthorized",
                    message: data.errorMessage,
                });
            } else {
                const body = await response.text();
                const data = body ? JSON.parse(body) : null;

                if (data && data.errorMessage) {
                    setStatusMessage({
                        type: "error",
                        message: data.errorMessage,
                    });
                } else {
                    setStatusMessage({
                        type: "error",
                        message: "An error occurred",
                    });
                }
            }
        } catch (error) {
            if (error instanceof Error) {
                console.error("Fetch error:", error);
                setStatusMessage({
                    type: "error",
                    message: `Fetch error: ${error.message}`,
                });
            } else {
                console.error("Unknown error:", error);
                setStatusMessage({
                    type: "error",
                    message: `Unknown error: ${error}`,
                });
            }
        }
    };

    return (
        <>
            {statusMessage !== null && (
                <StatusMessageParser statusMessage={statusMessage} />
            )}
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="name">name</Form.Label>
                    <Form.Control
                        id="name"
                        type="text"
                        value={name}
                        onChange={(event) => {
                            setName(event.target.value);
                        }}
                    />
                    <Form.Text className="text-muted">
                        {nameError && <div className="text-danger">{nameError}</div>}
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="">Availability</Form.Label>
                    <Form.Control
                        id="availability"
                        type="text"
                        value={availability}
                        onChange={(event) => {
                            setAvailability(event.target.value);
                        }}
                    />
                    <Form.Text className="text-muted">
                        {availabilityError && <div className="text-danger">{availabilityError}</div>}
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="">experience</Form.Label>
                    <Form.Control
                        id="experience"
                        type="text"
                        value={experience}
                        onChange={(event) => {
                            setExperience(event.target.value);
                        }}
                    />
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

                <Button variant="outline-primary" type="submit">
                    Update
                </Button>
            </Form>

            <Link href="/doctors" className="btn btn-outline-primary mt-2">
                <FontAwesomeIcon size="xs" icon={faArrowLeft} /> Doctors
            </Link>
        </>
    );
};

export default UpdateDoctor;
