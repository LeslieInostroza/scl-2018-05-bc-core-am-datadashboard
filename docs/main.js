const btnLima = document.getElementsByClassName('cohort');
const dataAlumnas = document.getElementById('studentsName'); // aqui se impirme la tabla
contData.style.display = 'none';

let users = null;
let progress = null;
let courses = null;

// rutas para acceder a los json
const usersJson = '../data/cohorts/lim-2018-03-pre-core-pw/users.json';
const progressJson = '../data/cohorts/lim-2018-03-pre-core-pw/progress.json';
const cohortsJson = '../data/cohorts.json';

Promise.all([
  fetch(usersJson),
  fetch(progressJson),
  fetch(cohortsJson)
]).then(
  (responses) => { // engloba todas las promesas
    return Promise.all(responses.map((response) => {
      return response.json();
    }));
  }
).then((responseJSON) => {
  users = responseJSON[0];
  progress = Object.entries(responseJSON[1]);
  courses = Object.entries(responseJSON[2]);
});

for (let i = 0; i < btnLima.length; i++) {
  btnLima[i].addEventListener('click', () => {
    gifLoad.style.display = 'none';
    contData.style.display = 'block';
    computeUsersStats(users, progress, courses);
    users.forEach((user) => {
      if (user.stats.exercises.length === 0 && user.stats.quizzes.length === 0 && user.stats.reads.length === 0 && user.stats.percentTotal.length === 0) {
        user.stats.percentTotal = 0;
        user.stats.reads = {};
        user.stats.exercises = {};
        user.stats.quizzes = {};
      } else {
        dataAlumnas.innerHTML += `<tr>
      <td> ${user.name.toUpperCase()} </td>
      <td> ${user.stats.percentTotal} </td>  
      <td> ${JSON.stringify(user.stats.reads.total)} </td> 
      <td> ${JSON.stringify(user.stats.reads.percent)} </td> 
      <td> ${JSON.stringify(user.stats.exercises.total)} </td>
      <td> ${JSON.stringify(user.stats.exercises.percent)} </td>  
      <td> ${JSON.stringify(user.stats.quizzes.total)} </td>
      <td> ${JSON.stringify(user.stats.quizzes.percent)} </td>
      </tr>`;
      }
    });
  });
}

function onToggleSortName() {
  const direction = filterName.innerText;
  if (direction === 'ASC') {
    filterName.innerText = 'Alfabetico-DESC';
  } else {
    filterName.innerText = 'Alfabetico-ASC';
  }
  const sortedUsers = window.sortUsers(users, 'name', direction);
  dataAlumnas.innerHTML = '';
  for (let user of sortedUsers) {
    dataAlumnas.innerHTML += `<tr>
    <td> ${user.name.toUpperCase()} </td>
    <td> ${user.stats.percentTotal} </td>
    <td> ${JSON.stringify(user.stats.reads.total)} </td> 
    <td> ${JSON.stringify(user.stats.reads.percent)} </td> 
    <td> ${JSON.stringify(user.stats.exercises.total)} </td>
    <td> ${JSON.stringify(user.stats.exercises.percent)} </td>  
    <td> ${JSON.stringify(user.stats.quizzes.total)} </td>
    <td> ${JSON.stringify(user.stats.quizzes.percent)} </td>
    </tr>`;
  }
}

function onToggleSort() {
  const direction = filterCOmpletitud.innerText;
  if (direction === 'ASC') {
    filterCOmpletitud.innerText = 'Completitud-DESC';
  } else {
    filterCOmpletitud.innerText = 'Completitud-ASC';
  }
  const sortedUsers = window.sortUsers(users, 'percentTotal', direction);
  dataAlumnas.innerHTML = '';
  for (let user of sortedUsers) {
    dataAlumnas.innerHTML += `<tr>
    <td> ${user.name.toUpperCase()} </td>
    <td> ${user.stats.percentTotal} </td>
    <td> ${JSON.stringify(user.stats.reads.total)} </td> 
    <td> ${JSON.stringify(user.stats.reads.percent)} </td> 
    <td> ${JSON.stringify(user.stats.exercises.total)} </td>
    <td> ${JSON.stringify(user.stats.exercises.percent)} </td>  
    <td> ${JSON.stringify(user.stats.quizzes.total)} </td>
    <td> ${JSON.stringify(user.stats.quizzes.percent)} </td>
    </tr> `;
  }
}

function searchStudents() {
  const search = searchAlumnas.value;
  const filteredUsers = window.filterUsers(users, search);
  dataAlumnas.innerHTML = '';
  filteredUsers.forEach(user => {
    dataAlumnas.innerHTML += `<tr>
    <td> ${user.name.toUpperCase()} </td>
    <td> ${user.stats.percentTotal} </td>  
    <td> ${JSON.stringify(user.stats.reads.total)} </td>  
    <td> ${JSON.stringify(user.stats.reads.percent)} </td> 
    <td> ${JSON.stringify(user.stats.exercises.total)} </td>
    <td> ${JSON.stringify(user.stats.exercises.percent)} </td>  
    <td> ${JSON.stringify(user.stats.quizzes.total)} </td>
    <td> ${JSON.stringify(user.stats.quizzes.percent)} </td>
    </tr>`;
  });
}