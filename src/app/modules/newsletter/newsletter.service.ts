import { NewsletterModel } from './newsletter.model';
import { TNewsletter } from './newsletter.interface';

// Subscribe to newsletter
const subscribeToNewsletter = async (email: string) => {
  // Check if email already exists
  const existingSubscription = await NewsletterModel.findOne({ email });
  
  if (existingSubscription) {
    // If exists but unsubscribed, resubscribe
    if (!existingSubscription.subscribed) {
      return await NewsletterModel.findOneAndUpdate(
        { email },
        { subscribed: true, subscribedAt: new Date() },
        { new: true }
      );
    }
    // Already subscribed
    return existingSubscription;
  }
  
  // Create new subscription
  return await NewsletterModel.create({
    email,
    subscribed: true,
    subscribedAt: new Date()
  });
};

// Unsubscribe from newsletter
const unsubscribeFromNewsletter = async (email: string) => {
  const result = await NewsletterModel.findOneAndUpdate(
    { email },
    { subscribed: false },
    { new: true }
  );
  
  return result;
};

// Get all newsletter subscriptions (for admin)
const getAllSubscriptions = async () => {
  return await NewsletterModel.find({}).sort({ subscribedAt: -1 });
};

// Get active subscriptions only (for admin)
const getActiveSubscriptions = async () => {
  return await NewsletterModel.find({ subscribed: true }).sort({ subscribedAt: -1 });
};

export const NewsletterService = {
  subscribeToNewsletter,
  unsubscribeFromNewsletter,
  getAllSubscriptions,
  getActiveSubscriptions
}; 