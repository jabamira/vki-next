<<<<<<< HEAD
import StudentInterface from '@/types/StudentInterface';

import React from "react";
import styles from "./Student.module.scss";
interface StudentProps {
=======
import type StudentInterface from '@/types/StudentInterface';
import styles from './Student.module.scss';

interface Props {
>>>>>>> 32326f3665f87d153f5724e9b61a5c05c281b8e4
  student: StudentInterface;
  onDelete: (id: number) => void;
}

<<<<<<< HEAD
const Student = ({ student, onDelete }: StudentProps): React.ReactElement => {
    console.log('styles in Student.tsx:', styles);
  return (
    <div className={styles.card}>
      <span>
        
        {student.last_name} {student.first_name} {student.middle_name} — группа: {student.groupId}
      </span>
      <button
        className={styles.deleteBtn}
        onClick={() => onDelete(student.id)}
        disabled={false} 
        
      >
        Удалить
      </button>
=======
const Student = ({ student, onDelete }: Props): React.ReactElement => {
  const onDeleteHandler = (): void => {
    onDelete(student.id);
  };

  return (
    <div className={`${styles.Student} ${student.isDeleted ? styles['--isDeleted'] : '' } `}>
      {`${student.id} - ${student.lastName} ${student.firstName} ${student.middleName}`}
      <button onClick={onDeleteHandler}>Удалить</button>
>>>>>>> 32326f3665f87d153f5724e9b61a5c05c281b8e4
    </div>
  );
};

<<<<<<< HEAD
export default Student;
=======
export default Student;
>>>>>>> 32326f3665f87d153f5724e9b61a5c05c281b8e4
