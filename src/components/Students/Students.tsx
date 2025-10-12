"use client";

import { useState, useEffect } from "react";
import Student from "./Student/Student";
import StudentInterface from "@/types/StudentInterface";
import AddStudent from "./AddStudent";
export default function Students() {
  const [students, setStudents] = useState<StudentInterface[]>([]);

  useEffect(() => {
    fetch("/api/students")
      .then((res) => res.json())
      .then((data) => setStudents(data));
  }, []);

  const handleDelete = (id: number) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
    fetch(`/api/students/${id}`, { method: "DELETE" });
  };
  const handleAdd = (student: StudentInterface) => {
    setStudents((prev) => [...prev, student]);
  };

  return (
    <div>
      <AddStudent onAdd={handleAdd} />
      {students.map((student) => (
        <Student key={student.id} student={student} onDelete={handleDelete} />
      ))}
    </div>
  );
}
