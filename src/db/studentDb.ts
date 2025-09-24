import sqlite3 from 'sqlite3';
import StudentInterface from '@/types/StudentInterface';

sqlite3.verbose();

function openDb(): sqlite3.Database {
  return new sqlite3.Database(process.env.DB ?? './db/vki-web.db');
}


export const getStudentsDb = async (): Promise<StudentInterface[]> => {
  const db = openDb();

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
  const db = openDb();

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