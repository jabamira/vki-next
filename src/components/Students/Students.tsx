'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import useStudents from '@/hooks/useStudents';
import Student from '@/components/Students/Student/Student';
import StudentInterface from '@/types/StudentInterface';
import styles from './Students.module.scss';

const Students = (): React.ReactElement => {
  const { students, isLoading, isError } = useStudents();
  const queryClient = useQueryClient();

  // Мутация для удаления студента
  const deleteStudentMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`/api/students/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        throw new Error('Failed to delete student');
      }
    },
    onSuccess: () => {
      // Инвалидируем кэш — React Query перезапросит студентов
      queryClient.invalidateQueries({ queryKey: ['students'] });
    },
  });

  const handleDelete = (id: number) => {
    if (confirm('Вы уверены, что хотите удалить студента?')) {
      deleteStudentMutation.mutate(id);
    }
  };

  if (isLoading) return <div>Загрузка...</div>;
  if (isError) return <div>Ошибка при загрузке студентов</div>;

  return (
    <div className={styles.Students}>
      {students.map((student: StudentInterface) => (
        <Student
          key={student.id}
          student={student}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default Students;