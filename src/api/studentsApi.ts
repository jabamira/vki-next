import type StudentInterface from "@/types/StudentInterface";

export const getStudentsApi = async (): Promise<StudentInterface[]> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}students`);

    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}${response.statusText}`);
    }
    const students = (await response.json()) as StudentInterface[];
    return students;
  } catch (err) {
    console.log(">>> getGroupsApi", err);
    return [] as StudentInterface[];
  }
};

export const deleteStudentApi = async (studentId: number): Promise<number> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API}students/${studentId}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}${response.statusText}`);
    }
    return studentId;
  } catch (err) {
    console.log(">>> deleteStudentApi", err);
    return -1;
  }
};
interface AddStudentPayload {
  firstName: string;
  lastName: string;
  middleName?: string;
  groupId: number;
}

export const addStudentApi = async (
  student: AddStudentPayload
): Promise<StudentInterface | null> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}students`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(student),
    });

    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status} ${response.statusText}`);
    }

    const newStudent = (await response.json()) as StudentInterface;
    return newStudent;
  } catch (err) {
    console.log(">>> addStudentApi", err);
    return null;
  }
};

export const addRandomStudentsApi = async (
  amount: number = 1
): Promise<StudentInterface[]> => {
  try {
    const res = await fetch(`/api/students/random?amount=${amount}`, {
      method: "POST",
    });

    if (!res.ok) {
      throw new Error(`Ошибка HTTP: ${res.status} ${res.statusText}`);
    }

    return (await res.json()) as StudentInterface[];
  } catch (err) {
    console.error(">>> addRandomStudentsApi", err);
    return [];
  }
};
