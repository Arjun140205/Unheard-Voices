import mongoose from 'mongoose';
import slugify from 'slugify';
import { v4 as uuidv4 } from 'uuid';

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  flagged: { type: Boolean, default: false },
  tags: [String],
  authorId: {
    type: String,
    default: 'Anonymous'
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  slug: {
    type: String,
    unique: true,
    required: true
  },
  reactions: {
    related: { type: Number, default: 0 },
    thoughtful: { type: Number, default: 0 },
    touched: { type: Number, default: 0 },
    inspired: { type: Number, default: 0 }
  },
  poll: {
  yes: { type: Number, default: 0 },
  no: { type: Number, default: 0 }
}
});

// Generate unique slug before saving
blogSchema.pre('validate', function (next) {
  if (this.title && !this.slug) {
    const uniqueId = uuidv4().slice(0, 6);
    this.slug = slugify(this.title, { lower: true, strict: true }) + '-' + uniqueId;
  }
  next();
});



export default mongoose.model('Blog', blogSchema);
