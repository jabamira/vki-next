import sqlite3 from 'sqlite3';
<<<<<<< HEAD
import StudentInterface from '@/types/StudentInterface';

sqlite3.verbose();


export const getStudentsDb = async (): Promise<StudentInterface[]> => {
  const db = new sqlite3.Database(process.env.DB ?? './db/vki-web.db');

  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM student';
    db.all(sql, [], (err, rows) => {
      db.close();
      if (err) {
        reject(err);
      } else {
        resolve(rows as StudentInterface[]);
      }
    });
  });
};

export const deleteStudentDb = async (id: number): Promise<void> => {
  const db = new sqlite3.Database(process.env.DB ?? './db/vki-web.db');

  return new Promise((resolve, reject) => {
    const sql = 'DELETE FROM student WHERE id = ?';
    db.run(sql, [id], function (err) {
      db.close();
      if (err) {
        reject(err);
      } else if (this.changes === 0) {
    
        reject(new Error('Student not found'));
      } else {
        resolve();
      }
    });
  });
};
=======

import type StudentInterface from '@/types/StudentInterface';
import getRandomFio from '@/utils/getRandomFio';
import FioInterface from '@/types/FioInterface';

sqlite3.verbose();

/**
 * Получение студентов
 * @returns Promise<StudentInterface[]>
 */
export const getStudentsDb = async (): Promise<StudentInterface[]> => {
  const db = new sqlite3.Database(process.env.DB ?? './db/vki-web.db');

  const students = await new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM student';
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
  const db = new sqlite3.Database(process.env.DB ?? './db/vki-web.db');

  await new Promise((resolve, reject) => {
    db.run('DELETE FROM student WHERE id=?', [studentId], (err) => {
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
export const addRandomStudentsDb = async (amount: number = 10): Promise<FioInterface[]> => {
  const db = new sqlite3.Database(process.env.DB ?? './db/vki-web.db');

  const fios: FioInterface[] = [];
  let fiosInsert: string = ''
  for (let i = 0; i < amount; i++) {
    const fio = getRandomFio();
    fios.push(fio);
    fiosInsert += `('${fio.firstName}', '${fio.lastName}', '${fio.middleName}', 1)`;
    fiosInsert += `${i === amount - 1 ? ';' : ','}`;
  }

  await new Promise((resolve, reject) => {
    db.run(`INSERT INTO student (firstName, lastName, middleName, groupId) VALUES ${fiosInsert}`, [], (err) => {
      if (err) {
        reject(err);
        db.close();
        return;
      }
      resolve(fios);
      db.close();
    });
  });

  return fios;
};
>>>>>>> 32326f3665f87d153f5724e9b61a5c05c281b8e4
