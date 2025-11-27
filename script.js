// Data Storage (In a real app, this would be a database)
let students = JSON.parse(localStorage.getItem('students')) || [];
let teachers = JSON.parse(localStorage.getItem('teachers')) || [];
let attendance = JSON.parse(localStorage.getItem('attendance')) || [];
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;

// Custom Alert System
function showCustomAlert(message, type = 'info', title = 'Ծանուցում') {
    const overlay = document.getElementById('custom-alert');
    const alertIcon = document.getElementById('alert-icon-content');
    const alertTitle = document.getElementById('alert-title');
    const alertMessage = document.getElementById('alert-message');
    const iconContainer = document.querySelector('.alert-icon');
    
    // Set content
    alertTitle.textContent = title;
    alertMessage.textContent = message;
    
    // Set icon and colors based on type
    switch (type) {
        case 'error':
            alertIcon.textContent = '❌';
            iconContainer.className = 'alert-icon error';
            break;
        case 'success':
            alertIcon.textContent = '✅';
            iconContainer.className = 'alert-icon success';
            break;
        case 'warning':
            alertIcon.textContent = '⚠️';
            iconContainer.className = 'alert-icon warning';
            break;
        default:
            alertIcon.textContent = 'ℹ️';
            iconContainer.className = 'alert-icon';
    }
    
    // Show the modal
    overlay.classList.remove('hidden');
    
    // Focus the OK button for accessibility
    setTimeout(() => {
        document.getElementById('alert-ok-btn').focus();
    }, 100);
}

function hideCustomAlert() {
    document.getElementById('custom-alert').classList.add('hidden');
}

// Navigation Functions
function showStudentLogin() {
    document.querySelector('.role-selection').classList.add('hidden');
    document.getElementById('student-section').classList.remove('hidden');
    document.getElementById('teacher-section').classList.add('hidden');
    
    // Reset forms and tabs
    document.getElementById('student-login-form').classList.remove('hidden');
    document.getElementById('student-register-form').classList.add('hidden');
    document.getElementById('student-login-tab').classList.add('active');
    document.getElementById('student-register-tab').classList.remove('active');
}

function showStudentRegister() {
    document.getElementById('student-login-form').classList.add('hidden');
    document.getElementById('student-register-form').classList.remove('hidden');
    document.getElementById('student-login-tab').classList.remove('active');
    document.getElementById('student-register-tab').classList.add('active');
}

function showTeacherLogin() {
    document.querySelector('.role-selection').classList.add('hidden');
    document.getElementById('teacher-section').classList.remove('hidden');
    document.getElementById('student-section').classList.add('hidden');
    
    // Reset forms and tabs
    document.getElementById('teacher-login-form').classList.remove('hidden');
    document.getElementById('teacher-register-form').classList.add('hidden');
    document.getElementById('teacher-login-tab').classList.add('active');
    document.getElementById('teacher-register-tab').classList.remove('active');
}

function showTeacherRegister() {
    document.getElementById('teacher-login-form').classList.add('hidden');
    document.getElementById('teacher-register-form').classList.remove('hidden');
    document.getElementById('teacher-login-tab').classList.remove('active');
    document.getElementById('teacher-register-tab').classList.add('active');
}

function showRoleSelection() {
    document.querySelector('.role-selection').classList.remove('hidden');
    document.getElementById('student-section').classList.add('hidden');
    document.getElementById('teacher-section').classList.add('hidden');
    document.getElementById('student-dashboard').classList.add('hidden');
    document.getElementById('teacher-dashboard').classList.add('hidden');
}

// Authentication Functions
function handleStudentLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('student-username').value;
    const password = document.getElementById('student-password').value;
    
    const student = students.find(s => s.username === username && s.password === password);
    
    if (student) {
        currentUser = { type: 'student', data: student };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        showStudentDashboard();
    } else {
        showCustomAlert('Սխալ օգտատիրոջ անուն կամ գաղտնաբառ', 'error', 'Մուտքի սխալ');
    }
}

function handleStudentRegister(event) {
    event.preventDefault();
    
    const name = document.getElementById('reg-student-name').value;
    const username = document.getElementById('reg-student-username').value;
    const password = document.getElementById('reg-student-password').value;
    const grade = document.getElementById('reg-student-grade').value;
    const classroom = document.getElementById('reg-student-classroom').value;
    
    // Validate all fields
    if (!name || !username || !password || !grade || !classroom) {
        showCustomAlert('Խնդրում ենք լրացնել բոլոր դաշտերը', 'warning', 'Անհրաժեշտ տվյալներ');
        return;
    }
    
    // Check if username already exists
    if (students.find(s => s.username === username)) {
        showCustomAlert('Այս օգտատիրոջ անունն արդեն գոյություն ունի', 'warning', 'Գրանցման սխալ');
        return;
    }
    
    // Create new student
    const newStudent = {
        id: Date.now(),
        name,
        username,
        password,
        grade,
        classroom
    };
    
    students.push(newStudent);
    localStorage.setItem('students', JSON.stringify(students));
    
    showCustomAlert('Գրանցումը հաջող էր: Խնդրում ենք մուտք գործել', 'success', 'Հաջողություն');
    showStudentLogin();
}

function handleTeacherLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('teacher-username').value;
    const password = document.getElementById('teacher-password').value;
    
    const teacher = teachers.find(t => t.username === username && t.password === password);
    
    if (teacher) {
        currentUser = { type: 'teacher', data: teacher };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        showTeacherDashboard();
    } else {
        showCustomAlert('Սխալ օգտատիրոջ անուն կամ գաղտնաբառ', 'error', 'Մուտքի սխալ');
    }
}

function handleTeacherRegister(event) {
    event.preventDefault();
    
    const name = document.getElementById('reg-teacher-name').value;
    const username = document.getElementById('reg-teacher-username').value;
    const password = document.getElementById('reg-teacher-password').value;
    const subject = document.getElementById('reg-teacher-subject').value;
    
    // Validate all fields
    if (!name || !username || !password || !subject) {
        showCustomAlert('Խնդրում ենք լրացնել բոլոր դաշտերը', 'warning', 'Անհրաժեշտ տվյալներ');
        return;
    }
    
    // Check if username already exists
    if (teachers.find(t => t.username === username)) {
        showCustomAlert('Այս օգտատիրոջ անունն արդեն գոյություն ունի', 'warning', 'Գրանցման սխալ');
        return;
    }
    
    // Create new teacher
    const newTeacher = {
        id: Date.now(),
        name,
        username,
        password,
        subject
    };
    
    teachers.push(newTeacher);
    localStorage.setItem('teachers', JSON.stringify(teachers));
    
    showCustomAlert('Գրանցումը հաջող էր: Խնդրում ենք մուտք գործել', 'success', 'Հաջողություն');
    showTeacherLogin();
}

// Dashboard Functions
function showStudentDashboard() {
    hideAllSections();
    document.getElementById('student-dashboard').classList.remove('hidden');
    
    const student = currentUser.data;
    document.getElementById('student-name-display').textContent = student.name;
    document.getElementById('student-grade-display').textContent = student.grade + '-րդ դասարան';
    document.getElementById('student-classroom-display').textContent = student.classroom;
    
    checkTodayAttendance();
    loadStudentHistory();
}

function showTeacherDashboard() {
    hideAllSections();
    document.getElementById('teacher-dashboard').classList.remove('hidden');
    
    const teacher = currentUser.data;
    document.getElementById('teacher-name-display').textContent = teacher.name;
    document.getElementById('teacher-subject-display').textContent = teacher.subject;
    
    updateTeacherClassrooms();
}

function hideAllSections() {
    document.querySelector('.role-selection').classList.add('hidden');
    document.getElementById('student-section').classList.add('hidden');
    document.getElementById('teacher-section').classList.add('hidden');
    document.getElementById('student-dashboard').classList.add('hidden');
    document.getElementById('teacher-dashboard').classList.add('hidden');
}

function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    showRoleSelection();
    
    // Reset forms
    document.querySelectorAll('form').forEach(form => form.reset());
}

// Attendance Functions
function markAttendance(status) {
    if (!currentUser || currentUser.type !== 'student') return;
    
    const today = new Date().toDateString();
    const student = currentUser.data;
    
    // Check if already marked today
    const existingAttendance = attendance.find(a => 
        a.studentId === student.id && 
        a.date === today
    );
    
    if (existingAttendance) {
        showCustomAlert('Այսօր արդեն ներկայություն եք նշել', 'warning', 'Ներկայություն');
        return;
    }
    
    // Add attendance record
    const attendanceRecord = {
        studentId: student.id,
        studentName: student.name,
        grade: student.grade,
        classroom: student.classroom,
        date: today,
        status: status,
        timestamp: new Date().toISOString()
    };
    
    attendance.push(attendanceRecord);
    localStorage.setItem('attendance', JSON.stringify(attendance));
    
    checkTodayAttendance();
    loadStudentHistory();
    
    const statusText = status === 'present' ? 'ներկա' : 'բացակա';
    showCustomAlert(`Դուք նշվել եք որպես ${statusText}`, 'success', 'Ներկայություն նշված է');
}

function checkTodayAttendance() {
    if (!currentUser || currentUser.type !== 'student') return;
    
    const today = new Date().toDateString();
    const student = currentUser.data;
    
    const todayAttendance = attendance.find(a => 
        a.studentId === student.id && 
        a.date === today
    );
    
    const messageElement = document.getElementById('attendance-message');
    const buttonsElement = document.getElementById('attendance-buttons');
    
    if (todayAttendance) {
        const statusText = todayAttendance.status === 'present' ? 'ներկա' : 'բացակա';
        messageElement.textContent = `Այսօր դուք նշված եք որպես ${statusText}`;
        messageElement.className = `attendance-message ${todayAttendance.status}`;
        buttonsElement.style.display = 'none';
    } else {
        messageElement.textContent = 'Այսօր դեռ ներկայություն չեք նշել';
        messageElement.className = 'attendance-message';
        buttonsElement.style.display = 'flex';
    }
}

function loadStudentHistory() {
    if (!currentUser || currentUser.type !== 'student') return;
    
    const student = currentUser.data;
    const studentAttendance = attendance
        .filter(a => a.studentId === student.id)
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    const historyContainer = document.getElementById('student-history');
    
    if (studentAttendance.length === 0) {
        historyContainer.innerHTML = '<p>Դեռ ներկայության գրառումներ չկան</p>';
        return;
    }
    
    historyContainer.innerHTML = studentAttendance.map(record => `
        <div class="history-item">
            <span class="history-date">${formatDate(record.date)}</span>
            <span class="history-status ${record.status}">
                ${record.status === 'present' ? 'Ներկա' : 'Բացակա'}
            </span>
        </div>
    `).join('');
}

// Teacher Functions
function updateTeacherClassrooms() {
    const gradeSelect = document.getElementById('teacher-grade-select');
    const classroomSelect = document.getElementById('teacher-classroom-select');
    
    gradeSelect.addEventListener('change', function() {
        const selectedGrade = this.value;
        classroomSelect.innerHTML = '<option value="">Ընտրեք դասասենյակը</option>';
        
        if (selectedGrade) {
            // Get unique classrooms for selected grade
            const classrooms = [...new Set(
                students
                    .filter(s => s.grade === selectedGrade)
                    .map(s => s.classroom)
            )].sort();
            
            classrooms.forEach(classroom => {
                const option = document.createElement('option');
                option.value = classroom;
                option.textContent = classroom;
                classroomSelect.appendChild(option);
            });
        }
        
        enableLoadButton();
    });
}

function enableLoadButton() {
    const grade = document.getElementById('teacher-grade-select').value;
    const classroom = document.getElementById('teacher-classroom-select').value;
    const loadBtn = document.getElementById('load-attendance-btn');
    
    loadBtn.disabled = !grade || !classroom;
}

function loadClassAttendance() {
    const grade = document.getElementById('teacher-grade-select').value;
    const classroom = document.getElementById('teacher-classroom-select').value;
    
    if (!grade || !classroom) {
        showCustomAlert('Խնդրում ենք ընտրել դասարանը և դասասենյակը', 'warning', 'Ընտրություն');
        return;
    }
    
    const selectedDate = document.getElementById('attendance-date').value || new Date().toISOString().split('T')[0];
    const dateString = new Date(selectedDate).toDateString();
    
    // Get students in the selected class
    const classStudents = students.filter(s => s.grade === grade && s.classroom === classroom);
    
    // Get attendance for selected date
    const dayAttendance = attendance.filter(a => a.date === dateString);
    
    const attendanceDisplay = document.getElementById('class-attendance');
    const studentsList = document.getElementById('students-list');
    
    // Set default date if not set
    if (!document.getElementById('attendance-date').value) {
        document.getElementById('attendance-date').value = selectedDate;
    }
    
    if (classStudents.length === 0) {
        studentsList.innerHTML = '<p>Այս դասարանում աշակերտներ չեն գտնվել</p>';
    } else {
        studentsList.innerHTML = classStudents.map(student => {
            const studentAttendance = dayAttendance.find(a => a.studentId === student.id);
            const status = studentAttendance ? studentAttendance.status : 'not-marked';
            const statusText = status === 'present' ? 'Ներկա' : 
                             status === 'absent' ? 'Բացակա' : 'Չի նշված';
            
            return `
                <div class="student-card">
                    <div class="student-name">${student.name}</div>
                    <div class="student-info">
                        ${student.grade}-րդ դասարան, ${student.classroom} դասասենյակ
                    </div>
                    <div class="attendance-status">
                        Կարգավիճակ: <span class="status-${status}">${statusText}</span>
                    </div>
                </div>
            `;
        }).join('');
    }
    
    attendanceDisplay.classList.remove('hidden');
}

// Utility Functions
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('hy-AM', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is already logged in
    if (currentUser) {
        if (currentUser.type === 'student') {
            showStudentDashboard();
        } else if (currentUser.type === 'teacher') {
            showTeacherDashboard();
        }
    }
    
    // Add event listeners for forms
    document.getElementById('student-login-form').addEventListener('submit', handleStudentLogin);
    document.getElementById('student-register-form').addEventListener('submit', handleStudentRegister);
    document.getElementById('teacher-login-form').addEventListener('submit', handleTeacherLogin);
    document.getElementById('teacher-register-form').addEventListener('submit', handleTeacherRegister);
    
    // Grade selection for teacher dashboard
    document.getElementById('teacher-grade-select').addEventListener('change', updateTeacherClassrooms);
    document.getElementById('teacher-classroom-select').addEventListener('change', enableLoadButton);
    
    // Custom alert close button
    document.getElementById('alert-ok-btn').addEventListener('click', hideCustomAlert);
    
    // Close alert when clicking outside the modal
    document.getElementById('custom-alert').addEventListener('click', function(e) {
        if (e.target === this) {
            hideCustomAlert();
        }
    });
    
    // Close alert with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !document.getElementById('custom-alert').classList.contains('hidden')) {
            hideCustomAlert();
        }
    });
});