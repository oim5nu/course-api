import mongoose, { Schema, Document } from 'mongoose';
import { IStudent } from './student.interface';

const studentSchema: Schema = new Schema({
  id: { type: String },
  name: { type: String, required: true, unique: true },
  courses: { type: Array, required: true }
});

studentSchema.pre('save', function(next) {
  if (!this.id) this.id = this._id;
  next();
});

const StudentModel = mongoose.model<IStudent & Document>(
  'Student',
  studentSchema
);

export { StudentModel };
