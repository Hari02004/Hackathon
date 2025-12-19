import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a title'],
      trim: true
    },
    description: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      required: [true, 'Please provide a date']
    },
    time: {
      type: String,
      required: true
    },
    venue: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true,
      enum: ['Technical', 'Academic', 'Cultural', 'Sports', 'Workshop', 'Entrepreneurship', 'Career']
    },
    status: {
      type: String,
      enum: ['upcoming', 'ongoing', 'past'],
      default: 'upcoming'
    },
    featured: {
      type: Boolean,
      default: false
    },
    image: {
      type: String,
      default: null
    },
    speakers: [
      {
        type: String
      }
    ],
    registrations: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
        },
        registeredAt: {
          type: Date,
          default: Date.now
        }
      }
    ],
    capacity: {
      type: Number,
      default: null
    },
    organizer: {
      type: String,
      default: 'KNU'
    }
  },
  {
    timestamps: true
  }
);

eventSchema.index({ date: 1 });
eventSchema.index({ category: 1 });
eventSchema.index({ status: 1 });

const Event = mongoose.model('Event', eventSchema);

export default Event;
