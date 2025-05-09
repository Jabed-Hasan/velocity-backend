import { z } from 'zod';

const emailSubscribeValidationSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: 'Email is required' })
      .email({ message: 'Invalid email format' })
  })
});

export const NewsletterValidation = {
  emailSubscribeValidationSchema
}; 