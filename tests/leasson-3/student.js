const { getActiveResourcesInfo } = require("process");

class Student{
    constructor (name , age , studentId){
        // khởi tạo thông tin học sinh 
        this.name = name;
        this.age = age;
        this.studentId= studentId;
        this.scores = [];
        this.subjects = [];
    }
     addScore(subject, score) {
        this.scores.push({ subject, score });
    }
    // tính điểm trung bình của tất cả các môn 
     getAverageScore() { 
        if (this.scores.length === 0) return 0;
        const total = this.scores.reduce((sum, entry) => sum + entry.score, 0);
        return parseFloat((total / this.scores.length).toFixed(2));
    }
    //Xếp loại 
    getGrade() {
        const avg = this.getAverageScore();
        if (avg >=8.5) return "Giỏi"; 
        else if (avg >=7) return "Khá";
        else if (avg >=5) return "Trung bình";
        else if ( avg < 5) return "Yếu";
    }
    // đếm số môn học đã có điểm 
     getSubjectCount() {
        return this.scores.length;
    }
    // Hiển thị thông tin đầy đủ của học sinh 
    displayInfo(){
        console.log(`🔹 Học sinh: ${this.name}`);
        console.log(`🔹 Tuổi: ${this.age}`);
        console.log(`🔹 Mã sinh viên: ${this.studentId}`);
        console.log(`🔹 Số môn học: ${this.getSubjectCount()}`);
        console.log(`🔹 Điểm trung bình: ${this.getAverageScore()}`);
        console.log(`🔹 Xếp loại: ${this.getGrade()}`);
        console.log(`🔹 Danh sách điểm:`);
        this.scores.forEach(item => {
            console.log(`   - ${item.subject}: ${item.score}`);
    });

    }
    // kiểm tra dủ điều kiện học bỗng
    isEligibleForScholarship(minAverage = 8.0) {
        return this.getAverageScore() >= minAverage;
    }
     
    
}const student1 = new Student("Nguyễn Văn An", 20, "SV001");
student1.addScore("Toán", 8.5);
student1.addScore("Lý", 7.5);
student1.addScore("Hóa", 9.0);
console.log(student1.getAverageScore());
console.log(student1.getGrade());
console.log(student1.getSubjectCount());
console.log(student1.displayInfo());
console.log(student1.isEligibleForScholarship());
