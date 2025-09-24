import StudentInterface from '@/types/StudentInterface';
import styles from './Student.module.scss';

interface StudentProps {
  student: StudentInterface;
  onDelete: (id: number) => void;
}

const Student = ({ student, onDelete }: StudentProps): React.ReactElement => {
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
    </div>
  );
};

export default Student;