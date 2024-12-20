const daysOfWeekElem = document.getElementById('daysOfWeek');
const calendarElem = document.getElementById('dates');
const selectedDateElem = document.getElementById('selectedDate');
const roomListElem = document.getElementById('roomList');
const roomsElem = document.getElementById('rooms');
const timeSlotsElem = document.getElementById('timeSlots');
const availableTimesElem = document.getElementById('availableTimes');
const currentMonthElem = document.getElementById('currentMonth');
const prevMonthBtn = document.getElementById('prevMonth');
const nextMonthBtn = document.getElementById('nextMonth');

let currentYear = new Date().getFullYear();
let currentMonth = new Date().getMonth();
let selectedDate = null;
let selectedRoom = null;

// 요일 배열
const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];

// 강의실 목록
const rooms = [
  { id: 1, name: 'T101' },
  { id: 2, name: 'T102' },
  { id: 3, name: 'T103' },
  { id: 4, name: 'T501' },
  { id: 5, name: 'T502' },
  { id: 6, name: 'T503' },
  { id: 7, name: 'T601' },
  { id: 8, name: 'T602' },
  { id: 9, name: 'T603' },
  { id: 10, name: 'T701' },
  { id: 11, name: 'T702' },
  { id: 12, name: 'T703' },
];

// 요일 표시
function displayDaysOfWeek() {
  daysOfWeekElem.innerHTML = '';
  daysOfWeek.forEach((day) => {
    const dayElem = document.createElement('div');
    dayElem.textContent = day;
    daysOfWeekElem.appendChild(dayElem);
  });
}

// 캘린더 생성
function generateCalendar(year, month) {
  calendarElem.innerHTML = '';
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  currentMonthElem.textContent = `${year}년 ${month + 1}월`;

  // 빈 칸 추가
  for (let i = 0; i < firstDay; i++) {
    const emptyCell = document.createElement('div');
    calendarElem.appendChild(emptyCell);
  }

  // 날짜 추가
  for (let day = 1; day <= daysInMonth; day++) {
    const dateCell = document.createElement('div');
    dateCell.textContent = day;
    dateCell.classList.add('date');
    dateCell.addEventListener('click', () => selectDate(year, month, day));
    calendarElem.appendChild(dateCell);
  }
}

// 날짜 선택
function selectDate(year, month, day) {
  selectedDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  selectedDateElem.textContent = `${selectedDate} 예약`;
  highlightSelectedDate(year, month, day);
  roomListElem.style.display = 'block';
  loadRooms();
}

// 선택된 날짜 강조
function highlightSelectedDate(year, month, day) {
  const dateCells = document.querySelectorAll('.dates .date');
  dateCells.forEach((cell) => {
    cell.classList.remove('selected');
  });

  const selectedCell = Array.from(dateCells).find(
    (cell) =>
      cell.textContent == day &&
      cell.closest('.dates') === calendarElem
  );
  if (selectedCell) selectedCell.classList.add('selected');
}

// 강의실 목록 표시
function loadRooms() {
  roomsElem.innerHTML = '';
  rooms.forEach((room) => {
    const btn = document.createElement('button');
    btn.textContent = room.name;
    btn.addEventListener('click', () => selectRoom(room.id, room.name));
    roomsElem.appendChild(btn);
  });
}

// 강의실 선택
function selectRoom(roomId, roomName) {
  selectedRoom = roomName;
  timeSlotsElem.style.display = 'block';
  loadTimeSlots();
}

// 예약 가능한 시간 표시
function loadTimeSlots() {
  availableTimesElem.innerHTML = '';
  const times = ['18:00', '19:00', '20:00', '21:00'];
  times.forEach((time) => {
    const btn = document.createElement('button');
    btn.textContent = time;
    btn.addEventListener('click', () => alert(`${selectedDate} ${selectedRoom} ${time} 예약 완료`));
    availableTimesElem.appendChild(btn);
  });
}

// 이전/다음 버튼 클릭 이벤트
prevMonthBtn.addEventListener('click', () => {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  generateCalendar(currentYear, currentMonth);
});

nextMonthBtn.addEventListener('click', () => {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  generateCalendar(currentYear, currentMonth);
});

// 초기 실행
displayDaysOfWeek();
generateCalendar(currentYear, currentMonth);
