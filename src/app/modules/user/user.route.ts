import express from 'express';
import { USER_ROLE } from './user.interface';
import { userController } from './user.controller';
import auth from '../../middleware/auth';

const router = express.Router();

// 1. Get All Users
router.get('/', auth(USER_ROLE.admin), userController.getUsers);

// 2. Get a Specific User
router.get('/:id', auth(USER_ROLE.admin), userController.getSingleUsers);

// 3. Update user information (email, name, etc. but not password)
router.patch('/update/:id', auth(USER_ROLE.user, USER_ROLE.admin), userController.updateUserInfo);

// 4. Change password (dedicated endpoint)
router.patch('/change-password/:id', auth(USER_ROLE.user, USER_ROLE.admin), userController.changePassword);

export const userRoutes = router;