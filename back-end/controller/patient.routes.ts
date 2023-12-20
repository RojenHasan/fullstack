import express, {Request, Response} from 'express';
import patientService from '../service/patient.service';
import { PatientInput } from '../types/types';


/**
 * @swagger
 *  components:
 *      schemas:
 *          Patient:
 *            type: object
 *            properties:
 *              id:
 *                   type: number
 *                   format: int64
 *              name:
 *                   type: string
 *                   description: User name
 *              user:
 *                  type: object
 *                  description: userObject
 *              medical_History:
 *                   type: string
 *                   description: Medical history of the patient
 *              stad:
 *                   type: string
 *                   description: stad woonplaats patient
 *              postcode:
 *                  type: string
 *                  description: postcode patient
 *              street:
 *                  type: string
 *                  description: street patient
 *              housenr:
 *                  type: number
 *                  description: house number patient
 *          PatientInput:
 *            type: object
 *            properties:
 *              id:
 *                   type: number
 *                   format: int64
 *                   description : Id of the updated doctor
 *              name:
 *                   type: string
 *                   description: User name
 *              user:
 *                  type: object
 *                  description: userObject
 *              medical_History:
 *                   type: string
 *                   description: Medical history of the patient
 *              stad:
 *                   type: string
 *                   description: stad woonplaats patient
 *              postcode:
 *                  type: number
 *                  description: postcode patient
 *              street:
 *                  type: string
 *                  description: street patient
 *              housenr:
 *                  type: number
 *                  description: house number patient
 */
export const patientRouter = express.Router();

/**
 * @swagger
 * /patients:
 *  get:
 *      security:
 *       - bearerAuth: []
 *      summary: Get all patients
 *      responses:
 *          200:
 *              description: Returns all patients.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Patient'
 */

patientRouter.get('/', async (req: Request, res: Response) => {
    try {
        const patients = await patientService.getAllPatients();
        res.status(200).json(patients);
    } catch (error) {
        res.status(500).json({ status: 'error', errorMessage: error.message });
    }
});


/**
 * @swagger
 * /patients/{id}:
 *  get:
 *      security:
 *        - bearerAuth: []
 *      summary: Get a patient by ID
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: ID of the patient to retrieve
 *          schema:
 *            type: number
 *      responses:
 *          200:
 *              description: Returns the patient.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Patient'
 *          404:
 *              description: Patient not found
 */
patientRouter.get('/:id', async (req: Request, res: Response) => {
    try {
        const id: number = parseInt(req.params.id);
        const patient = await patientService.getPatientById(id);
        res.status(200).json(patient);
    } catch (error) {
        res.status(500).json({ status: 'error', errorMessage: error.message });
    }
});

/**
 * @swagger
 * /patients:
 *  post:
 *      security:
 *        - bearerAuth: []
 *      summary: Add a new patient
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/PatientInput'
 *      responses:
 *          200:
 *              description: Returns the new patient.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Patient'
 *          400:
 *              description: Bad request
 */
patientRouter.post('/', async (req: Request, res: Response) => {
    try {
        const patientInput = <PatientInput>req.body;
        if (!patientInput.name || !patientInput.user) {
            throw new Error('Please provide name and user');
        }

        const patient = await patientService.addPatient(patientInput);
        res.status(200).json(patient);
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: error.message });
    }
});
/**
 * @swagger
 * /patients:
 *  put:
 *      security:
 *        - bearerAuth: []
 *      summary: Update a patient by ID
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/PatientInput'
 *      responses:
 *          200:
 *              description: Returns the updated patient.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Patient'
 *          404:
 *              description: Patient not found
 */
patientRouter.put('/', async (req: Request, res: Response) => {
    try {
        const updatedPatient = <PatientInput>req.body;
        const result = await patientService.updatePatient(updatedPatient);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: error.message });
    }
});

/**
 * @swagger
 * /patients/{id}:
 *  delete:
 *      security:
 *        - bearerAuth: []
 *      summary: Delete a patient by ID
 *      responses:
 *          204:
 *              description: Patient deleted successfully
 *          404:
 *              description: Patient not found
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: ID of the patient to delete
 *          schema:
 *            type: number
 */
patientRouter.delete('/:id', async (req: Request, res: Response) => {
    try {
        const id: number = parseInt(req.params.id);
        await patientService.deletePatient(id);
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: error.message });
    }
});