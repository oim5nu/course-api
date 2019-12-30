import mongoose, { Schema, Document } from 'mongoose';
import { ICourse } from './course.interface';

export type ICourseModel = ICourse & Document;

const CourseSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  type: { type: String, required: true }
}, { versionKey: false });

// CourseSchema.pre('save', function(next) {
//   if (!this.id) this.id = this._id;
//   next();
// });

const CourseModel = mongoose.model<ICourseModel>('Course', CourseSchema);

export { CourseModel };
