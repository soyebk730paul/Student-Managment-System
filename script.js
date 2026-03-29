let students = JSON.parse(localStorage.getItem("students")) || [];
let editIndex = null;

const form = document.getElementById("studentForm");
const studentList = document.getElementById("studentList");

form.addEventListener("submit", function(e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const course = document.getElementById("course").value;

  const student = { name, email, course };

  if (editIndex === null) {
    students.push(student);
  } else {
    students[editIndex] = student;
    editIndex = null;
  }

  localStorage.setItem("students", JSON.stringify(students));
  form.reset();
  displayStudents();
});

function displayStudents() {
  studentList.innerHTML = "";

  students.forEach((student, index) => {
    studentList.innerHTML += `
      <tr>
        <td>${student.name}</td>
        <td>${student.email}</td>
        <td>${student.course}</td>
        <td>
          <button onclick="editStudent(${index})">Edit</button>
          <button onclick="deleteStudent(${index})">Delete</button>
        </td>
      </tr>
    `;
  });
}

function deleteStudent(index) {
  students.splice(index, 1);
  localStorage.setItem("students", JSON.stringify(students));
  displayStudents();
}

function editStudent(index) {
  const student = students[index];
  document.getElementById("name").value = student.name;
  document.getElementById("email").value = student.email;
  document.getElementById("course").value = student.course;

  editIndex = index;
}

function searchStudent() {
  const search = document.getElementById("search").value.toLowerCase();

  const filtered = students.filter(s =>
    s.name.toLowerCase().includes(search) ||
    s.email.toLowerCase().includes(search) ||
    s.course.toLowerCase().includes(search)
  );

  studentList.innerHTML = "";

  filtered.forEach((student, index) => {
    studentList.innerHTML += `
      <tr>
        <td>${student.name}</td>
        <td>${student.email}</td>
        <td>${student.course}</td>
        <td>
          <button onclick="editStudent(${index})">Edit</button>
          <button onclick="deleteStudent(${index})">Delete</button>
        </td>
      </tr>
    `;
  });
}

displayStudents();