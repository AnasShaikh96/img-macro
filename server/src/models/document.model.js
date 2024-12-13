import mongoose, { Schema } from 'mongoose'

const documentSchema = new Schema({
  name: {
    type: String,
    required: true,
    max: [100, 'Name is too long'],
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'Company'
  },
  fileUrl: {
    type: 'String',
    required: true
  }
}, { timestamps: true });

export const Document = mongoose.model('Document', documentSchema)