<<<<<<< HEAD
"use client";

import { useState, useEffect } from "react";
import Student from "./Student/Student";
import StudentInterface from "@/types/StudentInterface";

export default function Students() {
  const [students, setStudents] = useState<StudentInterface[]>([]);

  useEffect(() => {
    fetch("/api/students")
      .then((res) => res.json())
      .then((data) => setStudents(data));
  }, []);

  const handleDelete = (id: number) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
     fetch(`/api/students/${id}`, { method: "DELETE" })
  };

  return (
    <div>
      {students.map((student) => (
        <Student
          key={student.id}
          student={student}
          onDelete={handleDelete}
=======
'use client';

import useStudents from '@/hooks/useStudents';
import type StudentInterface from '@/types/StudentInterface';
import styles from './Students.module.scss';
import Student from './Student/Student';

const Students = (): React.ReactElement => {
  const { students, deleteStudentMutate } = useStudents();

  const onDeleteHandler = (studentId: number): void => {
    if (confirm('Удалить студента?')) {
      deleteStudentMutate(studentId);
    }
  };

  return (
    <div className={styles.Students}>
      {students.map((student: StudentInterface) => (
        <Student
          key={student.id}
          student={student}
          onDelete={onDeleteHandler}
>>>>>>> 32326f3665f87d153f5724e9b61a5c05c281b8e4
        />
      ))}
    </div>
  );
<<<<<<< HEAD
}
=======
};

export default Students;
>>>>>>> 32326f3665f87d153f5724e9b61a5c05c281b8e4
