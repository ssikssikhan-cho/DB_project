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
