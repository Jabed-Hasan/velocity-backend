import express from 'express';
import { orderController } from './order.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.interface';
// import validateRequest from '../../middleware/validateRequest';
// import orderValidation from './order.validation';

const router = express.Router();


router.get("/verify", auth(USER_ROLE.user), orderController.verifyPayment);

router
    .route("/")
    .post(auth(USER_ROLE.user), orderController.createOrder)
    .get(auth(USER_ROLE.user), orderController.getOrders);



// router.post('/',
//     auth(USER_ROLE.admin),
//     // validateRequest(orderValidation),
//     orderController.orderCar);
// router.get("/verify", auth(USER_ROLE.user), orderController.verifyPayment);
// router.get("/", auth(USER_ROLE.user), orderController.getOrders);
router.get('/revenue', orderController.getRevenue);
router.get('/details', orderController.getDetails);

export const orderRoutes = router;
