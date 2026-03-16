export enum Role {
    ADMIN = 'ADMIN',
    TEACHER = 'TEACHER',
    STUDENT = 'STUDENT',
    PARENT = 'PARENT'
}

export enum DeviceStatus {
    PENDING = 'PENDING',
    VERIFIED = 'VERIFIED',
    REJECTED = 'REJECTED'
}

export enum TransactionType {
    DEPOSIT = 'DEPOSIT',
    WITHDRAWAL = 'WITHDRAWAL'
}

export enum TransactionStatus {
    PENDING = 'PENDING',
    COMPLETED = 'COMPLETED',
    REJECTED = 'REJECTED'
}

export enum AttendanceStatus {
    PRESENT = 'PRESENT',
    ABSENT = 'ABSENT',
    LATE = 'LATE',
    EXCUSED = 'EXCUSED'
}

export enum Term {
    TERM_1 = 'TERM_1',
    TERM_2 = 'TERM_2',
    TERM_3 = 'TERM_3'
}

export enum DayOfWeek {
    MONDAY = 'MONDAY',
    TUESDAY = 'TUESDAY',
    WEDNESDAY = 'WEDNESDAY',
    THURSDAY = 'THURSDAY',
    FRIDAY = 'FRIDAY',
}

export enum Relationship {
    FATHER = 'FATHER',
    MOTHER = 'MOTHER',
    GUARDIAN = 'GUARDIAN'
}