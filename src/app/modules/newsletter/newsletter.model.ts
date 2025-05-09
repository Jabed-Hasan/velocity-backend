import { model, Schema } from 'mongoose';
import { TNewsletter } from './newsletter.interface';

const NewsletterSchema = new Schema<TNewsletter>(
  {
    email: { 
      type: String, 
      required: true, 
      unique: true,
      trim: true,
      lowercase: true
    },
    subscribed: { 
      type: Boolean, 
      default: true 
    },
    subscribedAt: { 
      type: Date, 
      default: Date.now 
    }
  },
  {
    timestamps: true,
  }
);

export const NewsletterModel = model<TNewsletter>('Newsletter', NewsletterSchema); 