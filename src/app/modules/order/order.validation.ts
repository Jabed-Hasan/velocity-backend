import { z } from 'zod';

const orderValidation = z.object({
  body: z.object({
    userId: z.string().regex(/^[a-f\d]{24}$/i, { message: 'Invalid UserID ObjectId' }),
    carId: z.string().regex(/^[a-f\d]{24}$/i, { message: 'Invalid car ObjectId' }),
    status: z.enum(["Pending", "Paid", "Shipped", "Completed", "Cancelled"]),
    transaction: z.object({
      body: z.object({
        id: z.string(),
        transactionStatus: z.string(),
        bank_status: z.string(),
        sp_code: z.string(),
        sp_message: z.string(),
        method: z.string(),
        date_time: z.string()
      })
    }),
    quantity: z
      .number()
      .int()
      .positive({ message: 'Quantity must be a + integer' }),
    price: z
      .number()
      .nonnegative({ message: 'Price must be 0 or greater' }),
    totalPrice: z
      .number()
      .nonnegative({ message: 'Total price must be 0 or greater' }).optional()
  })
});

export default orderValidation;
