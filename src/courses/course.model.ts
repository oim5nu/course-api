import mongoose, { Schema, Document } from 'mongoose';
import { ICourse } from './course.interface';

const courseSchema: Schema = new Schema({
  id: { type: String },
  name: { type: String, required: true, unique: true },
  type: { type: String, required: true }
});

courseSchema.pre('save', function(next) {
  if (!this.id) this.id = this._id;
  next();
});

const CourseModel = mongoose.model<ICourse & Document>('Course', courseSchema);

export { CourseModel };
