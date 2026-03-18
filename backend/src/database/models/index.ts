import { Sequelize } from "sequelize";
import userModel from './User';
import deviceModel from './Device'
import teacherModel from './Teacher'
import classModel from './Class'
import classTeacherModel from './ClassTeacher'
import studentModel from './Student'
import parentModel from './Parent'
import parentStudentModel from './ParentStudent'
import timeTableModel from './Timetable'
import gradeModel from './Grade'
import attendanceModel from './Attendance'
import feeBalanceModel from './FeeBalance'
import feeTransactionModel from './FeeTransaction'

interface Models {
  User: ReturnType<typeof userModel>;
  Device: ReturnType<typeof deviceModel>
  Teacher: ReturnType<typeof teacherModel>
  Class: ReturnType<typeof classModel>
  ClassTeacher: ReturnType<typeof classTeacherModel>
  Student: ReturnType<typeof studentModel>
  Parent: ReturnType<typeof parentModel>
  ParentStudent: ReturnType<typeof parentStudentModel>
  Timetable: ReturnType<typeof timeTableModel>
  Grade: ReturnType<typeof gradeModel>
  Attendance: ReturnType<typeof attendanceModel>
  FeeBalance: ReturnType<typeof feeBalanceModel>
  FeeTransaction: ReturnType<typeof feeTransactionModel>

}
export const allModel = (sequelize: Sequelize): Models => {

  //Initial all models
  const User = userModel(sequelize);
  const Device = deviceModel(sequelize);
  const Teacher = teacherModel(sequelize)
  const Class = classModel(sequelize)
  const ClassTeacher = classTeacherModel(sequelize)
  const Student = studentModel(sequelize)
  const Parent = parentModel(sequelize)
  const ParentStudent = parentStudentModel(sequelize)
  const Timetable = timeTableModel(sequelize)
  const Grade = gradeModel(sequelize)
  const Attendance = attendanceModel(sequelize)
  const FeeBalance = feeBalanceModel(sequelize)
  const FeeTransaction = feeTransactionModel(sequelize)

  // Associations

  // User - Device
  User.hasMany(Device, {foreignKey:'userId', as:'devices'})
  Device.belongsTo(User, {foreignKey:'userId', as:'user'})

  //User - Teacher
  User.hasOne(Teacher, {foreignKey:'userId', as: 'teacherProfile'})
  Teacher.belongsTo(User, {foreignKey: 'userId', as:'user'})

  //User - Parent
  User.hasOne(Parent, {foreignKey:'userId', as: 'parentProfile'})
  Parent.belongsTo(User, {foreignKey: 'userId', as:'user'})

  //User - Student
  User.hasOne(Student, {foreignKey:'userId', as: 'studentProfile'})
  Student.belongsTo(User, {foreignKey: 'userId', as:'user'})

  //Teacher - Class (many-to-many via ClassTeacher)
  Teacher.belongsToMany(Class, {through: ClassTeacher, foreignKey:'teacherId', as:'classes'})
  Class.belongsToMany(Teacher, {through: ClassTeacher, foreignKey:'classId', as:'teachers'})

  // Class → mainTeacher
  Class.belongsTo(Teacher, { foreignKey: 'mainTeacherId', as: 'mainTeacher' })

  // Class → Students
  Class.hasMany(Student, { foreignKey: 'classId', as: 'students' })
  Student.belongsTo(Class, { foreignKey: 'classId', as: 'class' })

  // Student ↔ Parent (many-to-many via ParentStudent)
  Student.belongsToMany(Parent, { through: ParentStudent, foreignKey: 'studentId', as: 'parents' })
  Parent.belongsToMany(Student, { through: ParentStudent, foreignKey: 'parentId', as: 'children' })

  // Timetable
  Class.hasMany(Timetable, { foreignKey: 'classId', as: 'timetables' })
  Timetable.belongsTo(Class, { foreignKey: 'classId', as: 'class' })
  Teacher.hasMany(Timetable, { foreignKey: 'teacherId', as: 'timetables' })
  Timetable.belongsTo(Teacher, { foreignKey: 'teacherId', as: 'teacher' })

  // Grades
  Student.hasMany(Grade, { foreignKey: 'studentId', as: 'grades' })
  Grade.belongsTo(Student, { foreignKey: 'studentId', as: 'student' })
  Teacher.hasMany(Grade, { foreignKey: 'teacherId', as: 'grades' })
  Grade.belongsTo(Teacher, { foreignKey: 'teacherId', as: 'teacher' })
  Class.hasMany(Grade, { foreignKey: 'classId', as: 'grades' })
  Grade.belongsTo(Class, { foreignKey: 'classId', as: 'class' })

  // Attendance
  Student.hasMany(Attendance, { foreignKey: 'studentId', as: 'attendances' })
  Attendance.belongsTo(Student, { foreignKey: 'studentId', as: 'student' })
  Teacher.hasMany(Attendance, { foreignKey: 'teacherId', as: 'attendances' })
  Attendance.belongsTo(Teacher, { foreignKey: 'teacherId', as: 'teacher' })
  Class.hasMany(Attendance, { foreignKey: 'classId', as: 'attendances' })
  Attendance.belongsTo(Class, { foreignKey: 'classId', as: 'class' })

  // FeeBalance
  Student.hasOne(FeeBalance, { foreignKey: 'studentId', as: 'feeBalance' })
  FeeBalance.belongsTo(Student, { foreignKey: 'studentId', as: 'student' })

  // FeeTransaction
  Student.hasMany(FeeTransaction, { foreignKey: 'studentId', as: 'feeTransactions' })
  FeeTransaction.belongsTo(Student, { foreignKey: 'studentId', as: 'student' })
  User.hasMany(FeeTransaction, { foreignKey: 'initiatedBy', as: 'initiatedTransactions' })
  FeeTransaction.belongsTo(User, { foreignKey: 'initiatedBy', as: 'initiator' })
  User.hasMany(FeeTransaction, { foreignKey: 'processedBy', as: 'processedTransactions' })
  FeeTransaction.belongsTo(User, { foreignKey: 'processedBy', as: 'processor' })

  // Device → verifiedBy (admin qui a vérifié)
  User.hasMany(Device, { foreignKey: 'verifiedBy', as: 'verifiedDevices' })
  Device.belongsTo(User, { foreignKey: 'verifiedBy', as: 'verifier' })



  return { User, Device, Teacher, Class, ClassTeacher, Student, Parent, ParentStudent, Timetable, Grade, Attendance, FeeBalance, FeeTransaction};
};
