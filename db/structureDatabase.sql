
DROP TABLE student;
CREATE TABLE student(  
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    firstName TEXT,
    lastName TEXT,
    middleName TEXT,
    groupId INTEGER,
    FOREIGN KEY (groupId) REFERENCES class(id)
);
CREATE TABLE class(
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    curator TEXT,
    year INTEGER
);