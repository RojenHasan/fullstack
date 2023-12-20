import express, {Request, Response} from 'express';
import medicalRecordService from '../service/medicalRecord.service';
import { MedicalRecordInput } from '../types/types';
/**
 * @swagger
 * components:
 *   schemas:
 *     MedicalRecord:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           format: int64
 *         diagnosis:
 *           type: string
 *           description: diagnosis
 *         treatment:
 *           type: string
 *           description: treatment
 *         date:
 *           type: string
 *           format: date-time
 *           description: date
 *         patient:
 *           type: object
 *           description: patient
 *         doctor:
 *           type: object
 *           description: doctor
 *     MedicalRecordInput:
 *       type: object
 *       properties:
 *         diagnosis:
 *           type: string
 *           description: diagnosis
 *         treatment:
 *           type: string
 *           description: treatment
 *         date:
 *           type: string
 *           format: date-time
 *           description: date
 *           example: "2023-11-11T12:00:00Z"
 *         patient:
 *           type: object
 *           description: patient
 *         doctor:
 *           type: object
 *           description: doctor
 */
export const medicalRecordRouter =  express.Router();

/**
 * @swagger
 * /medicalRecords:
 *   get:
 *     summary: Get all medical records
 *     description: Retrieve a list of all medical records.
 *     responses:
 *       200:
 *         description: A list of medical records.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MedicalRecord'
 */
medicalRecordRouter.get('/', async (req, res) => {
    try {
      const medicalRecords = await medicalRecordService.getAllMedicalRecords();
      res.status(200).json(medicalRecords);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch medical records.' });
    }
  });
  
  /**
   * @swagger
   * /medicalRecords/{id}:
   *   get:
   *     summary: Get a medical record by ID
   *     description: Retrieve a medical record by its ID.
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: ID of the medical record to retrieve.
   *         schema:
   *           type: integer
   *     responses:
   *       '200':
   *         description: A medical record.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/MedicalRecord'
   *       '404':
   *         description: Medical record not found.
   */
  medicalRecordRouter.get('/:id', async (req, res) => {
    try {
      const id: number = parseInt(req.params.id);
      const medicalRecord = await medicalRecordService.getMedicalRecordById(id);
      res.status(200).json(medicalRecord);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch medical record.' });
    }
  });

/**
 * @swagger
 * /medicalRecords:
 *   post:
 *     summary: Add a new medical record
 *     description: Create a new medical record.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MedicalRecordInput'
 *     responses:
 *       200:
 *         description: The newly created medical record.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MedicalRecord'
 *       400:
 *         description: Bad request, input data is invalid.
 */
medicalRecordRouter.post('/', async (req: Request, res: Response) => {
  try {
    const medicalRecordInput = <MedicalRecordInput>req.body;
    const medicalRecord = await medicalRecordService.addMedicalRecord(medicalRecordInput);
    res.status(200).json(medicalRecord);
  } catch (error) {
    res.status(400).json({ status: 'error', errorMessage: error.message });
  }
});

/**
 * @swagger
 * /medicalRecords/patient/{patientId}:
 *   get:
 *     summary: Get all medical records for a specific patient
 *     description: Retrieve a list of all medical records for a specific patient.
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *         description: ID of the patient.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A list of medical records for the specified patient.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MedicalRecord'
 *       404:
 *         description: Patient not found or no medical records for the specified patient.
 */
medicalRecordRouter.get('/patient/:patientId', async (req, res) => {
  try {
    const patientId: number = parseInt(req.params.patientId);
    const medicalRecords = await medicalRecordService.getAllMedicalRecordsByPatientId(patientId);

    if (medicalRecords.length > 0) {
      res.status(200).json(medicalRecords);
    } else {
      res.status(404).json({ error: 'No medical records found for the specified patient.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch medical records for the specified patient.' });
  }
});



  