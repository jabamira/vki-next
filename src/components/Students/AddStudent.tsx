"use client";
import styles from "./AddStudent.module.scss";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import StudentInterface from "@/types/StudentInterface";
import { addStudentApi, addRandomStudentsApi } from "@/api/studentsApi";

interface AddStudentProps {
  onAdd: (student: StudentInterface) => void;
}

interface FormInputs {
  firstName: string;
  lastName: string;
  middleName?: string;
  groupId: number;
}

const AddStudent = ({ onAdd }: AddStudentProps) => {
  const { register, handleSubmit, reset } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    try {
      const newStudent = await addStudentApi(data);
      if (newStudent) {
        onAdd(newStudent);
        reset();
      } else {
        alert("Ошибка при добавлении студента");
      }
    } catch (err) {
      console.error("Ошибка при добавлении студента:", err);
      alert("Ошибка при добавлении студента");
    }
  };

  const handleAddRandom = async () => {
    try {
      const randomStudent = await addRandomStudentsApi(1); // добавляем 1 случайного студента
      if (randomStudent?.length) {
        onAdd(randomStudent[0]); // берём первого из массива
      } else {
        alert("Ошибка при добавлении случайного студента");
      }
    } catch (err) {
      console.error("Ошибка при добавлении случайного студента:", err);
      alert("Ошибка при добавлении случайного студента");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <input
        {...register("firstName")}
        placeholder="Имя"
        required
        className={styles.input}
      />
      <input
        {...register("lastName")}
        placeholder="Фамилия"
        required
        className={styles.input}
      />
      <input
        {...register("middleName")}
        placeholder="Отчество"
        className={styles.input}
      />
      <input
        type="number"
        {...register("groupId", { valueAsNumber: true })}
        placeholder="Группа"
        required
        className={styles.input}
      />
      <button type="submit" className={styles.button}>
        Добавить
      </button>
      <button type="button" className={styles.button} onClick={handleAddRandom}>
        Добавить случайного
      </button>
    </form>
  );
};

export default AddStudent;
