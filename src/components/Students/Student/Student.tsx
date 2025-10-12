import StudentInterface from "@/types/StudentInterface";

import React from "react";
import styles from "./Student.module.scss";
interface StudentProps {
  student: StudentInterface;
  onDelete: (id: number) => void;
}

const Student = ({ student, onDelete }: StudentProps): React.ReactElement => {
  console.log("styles in Student.tsx:", styles);
  return (
    <div className={styles.card}>
      <span>
        {student.lastName} {student.firstName} {student.middleName} — группа:{" "}
        {student.groupId}
      </span>
      <button
        className={styles.deleteBtn}
        onClick={() => onDelete(student.id)}
        disabled={false}
      >
        Удалить
      </button>
    </div>
  );
};

export default Student;
