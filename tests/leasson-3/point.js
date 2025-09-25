function calculateAverage(scores) {
    const total = scores.reduce((sum, score) => sum + score, 0);
    return total / scores.length;
}console.log(calculateAverage([8,7,9,6,10]));

function findHighestScore(scores) {
    return Math.max(...scores);
}console.log(findHighestScore([8,7,9,6,10]));

function countPassingGrades(scores, passingScore = 5) {

    return scores.filter(score => score >= passingScore).length;
}console.log(countPassingGrades([8, 4, 9, 3, 10], 5)); 

function filterFailingStudents(students, scores) {
    return students.filter((student, index) => scores[index] < 5);
}console.log(filterFailingStudents(["An", "Bình", "Chi"], [8, 4, 6]));

function sortStudentsByScore(students, scores) {
    const combined = students.map((student, index) => [student, scores[index]]);

    return combined.sort((a, b) => b[1] - a[1]); // Sắp xếp theo điểm giảm dần
}console.log(sortStudentsByScore(["An", "Bình", "Chi"], [6, 9, 7]));