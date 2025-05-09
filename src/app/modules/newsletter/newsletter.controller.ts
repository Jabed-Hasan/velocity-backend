import { Request, Response } from 'express';
import { NewsletterService } from './newsletter.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

// Subscribe to newsletter (public API)
const subscribeToNewsletter = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.body;
  
  const result = await NewsletterService.subscribeToNewsletter(email);
  
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully subscribed to newsletter',
    data: {
      email: result.email,
      subscribed: result.subscribed
    }
  });
});

// Unsubscribe from newsletter (public API)
const unsubscribeFromNewsletter = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.params;
  
  const result = await NewsletterService.unsubscribeFromNewsletter(email);
  
  if (!result) {
    return sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'Subscription not found',
      data: null
    });
  }
  
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully unsubscribed from newsletter',
    data: {
      email: result.email,
      subscribed: result.subscribed
    }
  });
});

// Get all newsletter subscriptions (admin API)
const getAllSubscriptions = catchAsync(async (req: Request, res: Response) => {
  const result = await NewsletterService.getAllSubscriptions();
  
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Subscriptions retrieved successfully',
    data: result
  });
});

// Get active subscriptions only (admin API)
const getActiveSubscriptions = catchAsync(async (req: Request, res: Response) => {
  const result = await NewsletterService.getActiveSubscriptions();
  
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Active subscriptions retrieved successfully',
    data: result
  });
});

export const NewsletterController = {
  subscribeToNewsletter,
  unsubscribeFromNewsletter,
  getAllSubscriptions,
  getActiveSubscriptions
}; 