import mongoose from 'mongoose';

const newsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a title'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Please provide a description']
    },
    content: {
      type: String,
      required: [true, 'Please provide content']
    },
    category: {
      type: String,
      required: true,
      enum: ['Achievement', 'Research', 'Partnership', 'Campus', 'Alumni', 'Placements', 'International']
    },
    author: {
      type: String,
      required: true
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    image: {
      type: String,
      default: null
    },
    featured: {
      type: Boolean,
      default: false
    },
    published: {
      type: Boolean,
      default: true
    },
    views: {
      type: Number,
      default: 0
    },
    likes: {
      type: Number,
      default: 0
    },
    readTime: {
      type: String,
      default: '3 min read'
    }
  },
  {
    timestamps: true
  }
);

newsSchema.index({ category: 1 });
newsSchema.index({ featured: 1 });
newsSchema.index({ createdAt: -1 });

const News = mongoose.model('News', newsSchema);

export default News;
