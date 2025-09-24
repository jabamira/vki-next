import { useQuery } from '@tanstack/react-query';

import { getStudentsApi } from '@/api/studentApi';
import StudentInterface from '@/types/StudentInterface';

// Опционально: создайте интерфейс, если хотите типизировать
export interface StudentHookInterface {
  students: StudentInterface[];
  isLoading: boolean;
  isError: boolean;
  error: unknown;
}

const useStudents = (): StudentHookInterface => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['students'],
    queryFn: getStudentsApi,
    staleTime: 60 * 1000,
  });

  return {
    students: data || [],
    isLoading,
    isError,
    error,
  };
};

export default useStudents;