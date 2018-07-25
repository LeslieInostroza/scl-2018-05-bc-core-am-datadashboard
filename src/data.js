window.computeUsersStats = (users, progress, courses) => {
  users.forEach((alumnas) => {
    const alumnasProgress = progress.find(advance => advance[0] === alumnas.id)[1];

    let totalPercent = 0;
    let lectures = 0;
    let lecturesCompleted = 0;
    let percentLectures = 0;
    let quizzes = 0;
    let quizzesCompleted = 0;
    let percentQuizzes = 0;
    let exercises = 0;
    let exercisesCompleted = 0;
    let percentExercises = 0;

    let i;
    for (i in alumnasProgress) {
      let element = alumnasProgress[i];
      let unit;

      for (unit of Object.values(element.units)) {
        for (let part of Object.values(unit.parts)) {
          // sacar lectures
          if (part.type === 'read') {
            lectures++;
          }
          if (part.length === 0) {
            lectures = 0;
            totalPercent = 0;
          }
          if (part.type === 'read' && part.completed === 1) {
            lecturesCompleted++;
          }
          percentLectures = Math.round((lecturesCompleted * 100) / lectures);
            
          // sacar quizzes
          if (part.type === 'quiz') {
            quizzes++;
          }
          if (part.length === 0) {
            quizzes = 0;
            totalPercent = 0;
          }
          if (part.type === 'quiz' && part.completed === 1) {
            quizzesCompleted ++;
          }
          percentQuizzes = Math.round((quizzesCompleted * 100) / quizzes);

          // sacar exercises
          if (part.type === 'practice') {
            exercises++;
          }
          if (part.length === 0) {
            exercises = 0;
            totalPercent = 0;
          }
          if (part.type === 'practice' && part.completed === 1) {
            exercisesCompleted++;
          }
          percentExercises = Math.round((exercisesCompleted + 100) / exercises);
          totalPercent = Math.round((percentLectures + percentQuizzes + percentExercises) / 3);
        }
      }
    }

    alumnas.stats = {
      percentTotal: totalPercent,
      reads: {
        total: lectures,
        completitudLecturas: lecturesCompleted,
        percent: percentLectures
      },
      quizzes: {
        total: quizzes,
        completed: quizzesCompleted,
        percent: percentQuizzes
      },
      exercises: {
        total: exercises,
        completed: exercisesCompleted,
        percent: percentExercises
      },
    };
    console.log(alumnas);
    return users;
  });
};


window.sortUsers = (users, orderBy, orderDirection) => {
  if (orderBy === 'name') {
    return users.sort(function(a, b) {
      if (orderDirection == 'ASC') {
        return a.name.localeCompare(b.name);
      } else {
        return a.name.localeCompare(b.name) * -1;
      }
    });
  }
  if (orderBy === 'percentTotal') {
    return users.sort(function(a, b) {
      if (orderDirection == 'ASC') {
        return a.stats.percentTotal - b.stats.percentTotal;
      } else {
        return (a.stats.percentTotal - b.stats.percentTotal) * -1;
      }
    });
  }
};

window.filterUsers = (users, search) => {
  if (search) {
    if (users) {
      search = search.toLowerCase();
      return users.filter(user => user && user.name && user.name.toLowerCase().indexOf(search) >= 0);
    }
  }
  return users;
};

window.processCohortData = (options) => {

};