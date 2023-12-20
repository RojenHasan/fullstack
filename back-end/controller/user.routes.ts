import express, {Request, Response} from 'express';
import userService from '../service/user.service';
import { UserInput } from '../types/types';

/**
 * @swagger
 *  components:
 *      schemas:
 *          User:
 *            type: object
 *            properties:
 *              id:
 *                   type: number
 *                   format: int64
 *              email:
 *                   type: string
 *                   description: user email
 *              password:
 *                  type: string
 *                  description: users password
 *              role:
 *                  type: string
 *          UserUpdateInput:
 *              type: object
 *              properties:
 *                  id:
 *                      type: number
 *                      format: int64
 *                      description: ID of the user
 *                  email:
 *                      type: string
 *                      description: The email address of the user
 *                  password:
 *                      type: string
 *                  role:
 *                      type: string
 *                      description: The role of the user regarding permissions (regular user, admin, ...)
 *          
 * 
 *          UserInput:
 *            type: object
 *            properties:
 *              email:
 *                    type: string
 *                    description: user email
 *                    example: test@test.be
 *              password:
 *                    type: string
 *                    description: users password
 *                    example: 12345678
 *              role:
 *                    type: string
 *                    description: The role of the user regarding permissions (regular user, admin)
 *                    example: user
 *              
 */

const userRouter = express.Router();

/**
 * @swagger
 * /users/:
 *  get:
 *      summary: Get all user
 *      responses:
 *          200:
 *              description: Returns all Users.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 */

userRouter.get('/',async (req:Request, res: Response) => {
    try{
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error){
        res.status(500).json({status: 'error', errorMessage: error.message});
    }
})



/**
* @swagger
* /users/signup:
*   post:
*     summary: Add an account
*     requestBody: 
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/UserInput'
*     responses:
*       200:
*         description: The new user
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/User'
*       404:
*         description: Error
*/

userRouter.post("/signup", async(req:Request, res:Response) => {
    try {
        const userInput = <UserInput>req.body;
        const user = await userService.createUser(userInput)
        res.status(200).json(user) 
    } catch (error) {
        res.status(500).json({status: "error" , errorMessage: error.message}) 
    }
})

/**
* @swagger
* /users/login:
*   post:
*     summary: Login
*     requestBody: 
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/UserInput'
*     responses:
*       200:
*         description: The new user
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/User'
*       404:
*         description: Error
*/


userRouter.post("/login", async(req:Request, res:Response) =>{
    try {
        const userInput = <UserInput>req.body
        const token = await userService.authenticate(userInput)
        const user = await userService.getUserByEmail({ email: userInput.email });
        res.status(200).json({message: "Authintication succesful", token, user: user})
    } catch (error) {
        res.status(401).json({status: "Unauthorized", errorMessage: error.message})
    }
})


/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     responses:
 *       200:
 *         description: Returns the deleted user, if not, then an error is returned
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/User'
 *     parameters:
 *        - name: id
 *          in: path
 *          description: ID of the user
 *          required: true
 *          schema:
 *            type: integer
 *            format: int64
 */

userRouter.delete('/:id', async (req: Request, res: Response) => {
    try {
        const id: number = parseInt(req.params.id as string);
        const result = await userService.deleteUserById(id);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: error.message });
    }
});


/**
 * @swagger
 * /users:
 *   put:
 *     summary: Update a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserUpdateInput'
 *     responses:
 *       200:
 *         description: The updated user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Error
 */

userRouter.put('/', async (req: Request, res: Response) => {
    try {
        const updatedUser = <UserInput>req.body;
        const result = await userService.updateUser(updatedUser);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: error.message });
    }
});

export {userRouter}