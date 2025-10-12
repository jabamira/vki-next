import sqlite3 from "sqlite3";

import type StudentInterface from "@/types/StudentInterface";
import getRandomFio from "@/utils/getRandomFio";
import FioInterface from "@/types/FioInterface";

sqlite3.verbose();

/**
 * Получение студентов
 * @returns Promise<StudentInterface[]>
 */
export const getStudentsDb = async (): Promise<StudentInterface[]> => {
  const db = new sqlite3.Database(process.env.DB ?? "./db/vki-web.db");

  const students = await new Promise((resolve, reject) => {
    const sql = "SELECT * FROM student";
    db.all(sql, [], (err, rows) => {
      if (err) {
        reject(err);
        db.close();
        return;
      }
      resolve(rows);
      db.close();
    });
  });

  return students as StudentInterface[];
};

/**
 * Удаления студента
 * @param studentId
 * @returns
 */
export const deleteStudentDb = async (studentId: number): Promise<number> => {
  const db = new sqlite3.Database(process.env.DB ?? "./db/vki-web.db");

  await new Promise((resolve, reject) => {
    db.run("DELETE FROM student WHERE id=?", [studentId], (err) => {
      if (err) {
        reject(err);
        db.close();
        return;
      }
      resolve(studentId);
      db.close();
    });
  });

  return studentId;
};

/**
 * Добавление  рандомных студента
 * @param mount количество добавляемых записей - 10 по умолчанию
 * @returns
 */
export const addRandomStudentsDb = async (
  amount: number = 10
): Promise<StudentInterface[]> => {
  const db = new sqlite3.Database(process.env.DB ?? "./db/vki-web.db");

  const newStudents: StudentInterface[] = [];

  for (let i = 0; i < amount; i++) {
    const fio = getRandomFio();
    const randomGroupId = Math.floor(Math.random() * 100) + 1;

    // Вставка через prepared statement
    const student: StudentInterface = await new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO student (firstName, lastName, middleName, groupId) VALUES (?, ?, ?, ?)`,
        [fio.firstName, fio.lastName, fio.middleName || "", randomGroupId],
        function (err) {
          if (err) {
            reject(err);
            db.close();
            return;
          }
          resolve({
            id: this.lastID,
            firstName: fio.firstName,
            lastName: fio.lastName,
            middleName: fio.middleName || "",
            groupId: randomGroupId,
          });
        }
      );
    });

    newStudents.push(student);
  }

  db.close();
  return newStudents;
};

export const addStudentDb = async (
  student: Omit<StudentInterface, "id">
): Promise<StudentInterface> => {
  const db = new sqlite3.Database(process.env.DB ?? "./db/vki-web.db");

  const newStudent: StudentInterface = await new Promise((resolve, reject) => {
    const sql = `INSERT INTO student (firstName, lastName, middleName, groupId) 
                 VALUES (?, ?, ?, ?)`;

    db.run(
      sql,
      [
        student.firstName,
        student.lastName,
        student.middleName || "",
        student.groupId,
      ],
      function (err) {
        if (err) {
          reject(err);
          db.close();
          return;
        }
        // this.lastID — id только что вставленной записи
        resolve({ id: this.lastID, ...student });
        db.close();
      }
    );
  });

  return newStudent;
};
