CREATE DATABASE classroom_rental;

USE classroom_rental;

-- user 테이블 생성
CREATE TABLE user (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  password VARCHAR(100),
  major VARCHAR(100),
  role ENUM('student', 'admin') DEFAULT 'student'
);

-- classroom 테이블 생성
CREATE TABLE classroom (
  classroom_id INT AUTO_INCREMENT PRIMARY KEY,
  capacity INT,
  location VARCHAR(100),
  facilities TEXT
);

-- reservation 테이블 생성
CREATE TABLE reservation (
  reservation_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  classroom_id INT,
  reservation_time DATETIME,
  duration INT, -- 예약 시간(단위: 분)
  status ENUM('reserved', 'cancelled') DEFAULT 'reserved',
  FOREIGN KEY (user_id) REFERENCES user(user_id),
  FOREIGN KEY (classroom_id) REFERENCES classroom(classroom_id)
);

-- 초기 데이터 삽입
INSERT INTO user (name, password, major, role) VALUES
('C035406', 'test1234', 'CS', 'student'),
('admin', 'adminpass', 'CS', 'admin'),
('student1', 'studentpass1', 'CS', 'student'),
('student2', 'studentpass2', 'EE', 'student');

INSERT INTO classroom (capacity, location, facilities) VALUES
(100, 'T101', 'Projector, Whiteboard'),
(100, 'T102', 'Projector, Whiteboard'),
(100, 'T103', 'Projector, Whiteboard'),
(100, 'T501', 'Projector, Whiteboard'),
(100, 'T502', 'Projector, Whiteboard'),
(100, 'T503', 'Projector, Whiteboard'),
(60, 'T601', 'Projector, Whiteboard'),
(60, 'T602', 'Projector, Whiteboard'),
(60, 'T603', 'Projector, Whiteboard'),
(60, 'T701', 'Projector, Whiteboard'),
(60, 'T702', 'Projector, Whiteboard'),
(60, 'T703', 'Projector, Whiteboard');