import { Sequelize } from "sequelize";
import userModel from './User';
import deviceModel from './Device'
import teacherModel from './Teacher'
import classModel from './Class'
import classTeacherModel from './ClassTeacher'

interface Models {
  User: ReturnType<typeof userModel>;
  Device: ReturnType<typeof deviceModel>
  Teacher: ReturnType<typeof teacherModel>
  Class: ReturnType<typeof classModel>
  ClassTeacher: ReturnType<typeof classTeacherModel>
}
export const allModel = (sequelize: Sequelize): Models => {
  const User = userModel(sequelize);
  const Device = deviceModel(sequelize);
  const Teacher = teacherModel(sequelize)
  const Class = classModel(sequelize)
  const ClassTeacher = classTeacherModel(sequelize)
  return { User, Device, Teacher, Class, ClassTeacher };
};