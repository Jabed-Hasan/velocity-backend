import { Router } from 'express';
import { NewsletterController } from './newsletter.controller';
import validateRequest from '../../middleware/validateRequest';
import { NewsletterValidation } from './newsletter.validation';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.interface';

const router = Router();

// Public routes
router.post(
  '/subscribe',
  validateRequest(NewsletterValidation.emailSubscribeValidationSchema),
  NewsletterController.subscribeToNewsletter
);

router.patch(
  '/unsubscribe/:email',
  NewsletterController.unsubscribeFromNewsletter
);

// Admin only routes
router.get(
  '/all',
  auth(USER_ROLE.admin),
  NewsletterController.getAllSubscriptions
);

router.get(
  '/active',
  auth(USER_ROLE.admin),
  NewsletterController.getActiveSubscriptions
);

export const newsletterRoutes = router; 