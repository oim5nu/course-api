import mongoose, { Schema, Document } from 'mongoose';
import { IStudent } from './student.interface';

export type IStudentModel = IStudent & Document;
const StudentSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  courses: { type: Array, required: true }
}, { versionKey: false } );

// studentSchema.pre('save', function(next) {
//   if (!this.id) this.id = this._id;
//   next();
// });

const StudentModel = mongoose.model<IStudentModel>(
  'Student',
  StudentSchema
);

export { StudentModel };
