import express, {Request, Response} from 'express';
import medicalTestService from '../service/medicalTest.service';
import { MedicalTestInput } from '../types/types';
/**
 * @swagger
 * components:
 *   schemas:
 *     MedicalTest:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           format: int64
 *         name:
 *           type: string
 *           description: Name of the test
 *         cost:
 *           type: number
 *           description: cost of test
 *         description:
 *           type: string
 *           description: Description of the test
 *         patient:
 *           type: object
 *           description: Who gets tested
 *         doctor:
 *           type: object
 *           description: Who does the testing
 *     MedicalTestInput:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the test
 *           example: Toxicology test
 *         cost:
 *           type: number
 *           description: cost of test
 *           example: 50
 *         description:
 *           type: string
 *           description: Description of the test
 *           example: Testing for substances in the blood
 *         patient:
 *           type: object
 *           description: Who gets tested
 *         doctor:
 *           type: object
 *           description: Who does the testing
 */

export const medicalTestRouter =  express.Router();

/**
 * @swagger
 * /medicalTests:
 *   get:
 *     summary: Get all tests
 *     responses:
 *       200:
 *         description: Returns all MedicalTests.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MedicalTest'
 */


medicalTestRouter.get('/',async (req:Request, res: Response) => {
    try{
        const tests = await medicalTestService.getAllMedicalTests();
        res.status(200).json(tests);
    } catch (error){
        res.status(500).json({status: 'error', errorMessage: error.message});
    }
})


  /**
   * @swagger
   * /medicalTests/{id}:
   *   get:
   *     summary: Get a medical test by ID
   *     description: Retrieve a medical test by its ID.
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: ID of the medical test to retrieve.
   *         schema:
   *           type: integer
   *     responses:
   *       '200':
   *         description: A medical test.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/MedicalTest'
   *       '404':
   *         description: Medical test not found.
   */
  medicalTestRouter.get('/:id', async (req, res) => {
    try {
      const id: number = parseInt(req.params.id);
      const medicalTest = await medicalTestService.getMedicalTestById(id);
      res.status(200).json(medicalTest);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch medical test.' });
    }
  });
  
/**
 * @swagger
 * /medicalTests:
 *   post:
 *     summary: Add a new medical test
 *     description: Create a new medical test.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MedicalTestInput'
 *     responses:
 *       200:
 *         description: The newly created medical test.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MedicalTest'
 *       400:
 *         description: Bad request, input data is invalid.
 */
medicalTestRouter.post('/', async (req: Request, res: Response) => {
  try {
      const medicalTestInput = <MedicalTestInput>req.body;
    
      const medicalTest= await medicalTestService.addMedicalTest(medicalTestInput);
      res.status(200).json(medicalTest);
  } catch (error) {
      res.status(400).json({ status: 'error', errorMessage: error.message });
  }
});




  