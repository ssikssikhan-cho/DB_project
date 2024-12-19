import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Reservation = () => {
  const [classrooms, setClassrooms] = useState([]);
  const [selectedTime, setSelectedTime] = useState([]);
  const [reservedTimes, setReservedTimes] = useState({});

  useEffect(() => {
    const fetchClassrooms = async () => {
      const response = await axios.get('/api/classrooms');
      setClassrooms(response.data);
    };

    fetchClassrooms();
  }, []);

  const handleRoomClick = async (roomId) => {
    const response = await axios.get(`/api/reservations/${roomId}`);
    const reserved = response.data;
    setReservedTimes(prevState => ({ ...prevState, [roomId]: reserved }));
  };

  const handleTimeClick = (time) => {
    setSelectedTime(prevSelected => [...prevSelected, time]);
  };

  const handleReserve = async () => {
    try {
      await axios.post('/api/reservations', { rooms: selectedTime });
      alert('예약완료');
      setSelectedTime([]);
    } catch (error) {
      console.error('예약 실패:', error);
    }
  };

  return (
    <div>
      <h2>강의실 예약</h2>
      <div>
        {classrooms.map((room) => (
          <button
            key={room.id}
            onClick={() => handleRoomClick(room.id)}
            disabled={reservedTimes[room.id]?.length === 0}
          >
            {room.name}
          </button>
        ))}
      </div>
      <div>
        <h3>예�� 시간</h3>
        {['17:00', '18:00', '19:00', '20:00', '21:00'].map((time) => (
          <button
            key={time}
            onClick={() => handleTimeClick(time)}
            disabled={selectedTime.includes(time)}
          >
            {time}
          </button>
        ))}
      </div>
      <button onClick={handleReserve} disabled={selectedTime.length === 0}>
        예약하기
      </button>
    </div>
  );
};

export default Reservation;
