import express, { Request, Response } from 'express';
import doctorService from '../service/doctor.service';
import { DoctorInput } from '../types/types';

/**
 * @swagger
 * components:
 *   schemas:
 *     Doctor:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           format: int64
 *         name:
 *           type: string
 *           description: Doctor name
 *         user:
 *           type: object
 *           description: userObject
 *         experience:
 *           type: string
 *           description: Doctor's experience
 *         availability:
 *           type: string
 *           description: Doctor's availability
 *     DoctorInput:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           format: int64
 *           description : Id of the updated doctor
 *         name:
 *           type: string
 *           description: Doctor name
 *         user:
 *           type: object
 *           description: userObject
 *         experience:
 *           type: string
 *           description: Doctor's experience
 *         availability:
 *           type: string
 *           description: Doctor's availability
 */

export const doctorRouter = express.Router();


/**
 * @swagger
 * /doctors:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get all doctors
 *     responses:
 *       200:
 *         description: Returns all Doctors.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Doctor'
 */
doctorRouter.get('/', async (req: Request, res: Response) => {
    try {
        const doctors = await doctorService.getAllDoctors();
        res.status(200).json(doctors);
    } catch (error) {
        res.status(500).json({ status: 'error', errorMessage: error.message });
    }
});


/**
 * @swagger
 * /doctors/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get a doctor by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the doctor to retrieve
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Returns the doctor.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Doctor'
 *       404:
 *         description: Doctor not found
 */
doctorRouter.get('/:id', async (req: Request, res: Response) => {
    try {
        const id: number = parseInt(req.params.id);
        const doctor = await doctorService.getDoctorById(id);
        res.status(200).json(doctor);
    } catch (error) {
        res.status(500).json({ status: 'error', errorMessage: error.message });
    }
});


/**
 * @swagger
 * /doctors:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Add a new doctor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DoctorInput'
 *     responses:
 *       200:
 *         description: Returns the new doctor.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Doctor'
 *       400:
 *         description: Bad request
 */
doctorRouter.post('/', async (req: Request, res: Response) => {
    try {
        const doctorInput = <DoctorInput>req.body;
        if (!doctorInput.name || !doctorInput.user || !doctorInput.experience || !doctorInput.availability) {
            throw new Error('Please provide name, user, experience, and availability');
        }

        const doctor = await doctorService.addDoctor(doctorInput);
        res.status(200).json(doctor);
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: error.message });
    }
});
/**
 * @swagger
 * /doctors/{id}:
 *  delete:
 *      security:
 *        - bearerAuth: []
 *      summary: Delete a doctor by ID
 *      responses:
 *          204:
 *              description: doctor deleted successfully
 *          404:
 *              description: doctor not found
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: ID of the doctor to delete
 *          schema:
 *            type: number
 */
doctorRouter.delete("/:id", async (req: Request, res: Response) => {
    try {
        const id: number = parseInt(req.params.id);
        await doctorService.deleteDoctor(id);
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: error.message });
    }
});

/**
 * @swagger
 * /doctors:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     summary: Update a doctor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DoctorInput'
 *     responses:
 *       200:
 *         description: Returns the updated doctor.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Doctor'
 *       400:
 *         description: Bad request
 */
doctorRouter.put("/", async (req: Request, res: Response) => {
    const doctor = <DoctorInput>req.body
    try {
        const newDoctor = await doctorService.updateDoctor(doctor)
        res.status(200).json(newDoctor)
    } catch (error) {
        res.status(500).json({ status: 'error', errorMessage: error.message })
    }
})

/**
 * @swagger
 * /doctors/{id}/medical-tests:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get all medical tests for a doctor
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the doctor to retrieve medical tests for
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Returns all medical tests for the doctor.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/MedicalTest' # Define the MedicalTest schema if not defined already
 *       404:
 *         description: Doctor not found
 */

doctorRouter.get('/:id/medical-tests', async (req: Request, res: Response) => {
    try {
        const id: number = parseInt(req.params.id);
        const medicalTests = await doctorService.getAllMedicalTestsByDoctor(id);
        res.status(200).json(medicalTests);
    } catch (error) {
        res.status(500).json({ status: 'error', errorMessage: error.message });
    }
});
/**
 * @swagger
 * /doctors/{id}/appointments:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get all appointments for a doctor
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the doctor to retrieve appointments for
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Returns all appointments for the doctor.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Appointement' # Define the MedicalTest schema if not defined already
 *       404:
 *         description: Doctor not found
 */

doctorRouter.get('/:id/appointments', async (req: Request, res: Response) => {
    try {
        const id: number = parseInt(req.params.id);
        const appointments = await doctorService.getAppointementsByDoctor(id);
        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ status: 'error', errorMessage: error.message });
    }
});
/**
 * @swagger
 * /doctors/{id}/appointments:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Add an appointment to a doctor
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the doctor to add an appointment to
 *         schema:
 *           type: number
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AppointmentInput'
 *     responses:
 *       200:
 *         description: Returns the updated doctor with the new appointment.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Doctor'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Doctor not found
 */
doctorRouter.post('/:id/appointments', async (req: Request, res: Response) => {
    try {
        const doctorId: number = parseInt(req.params.id);
        const appointmentInput = req.body;

        const updatedDoctor = await doctorService.addAppointmentToDoctorById(doctorId, appointmentInput);
        res.status(200).json(updatedDoctor);
    } catch (error) {
        if (error.message === 'Doctor not found') {
            res.status(404).json({ status: 'error', errorMessage: error.message });
        } else {
            res.status(400).json({ status: 'error', errorMessage: error.message });
        }
    }
});



