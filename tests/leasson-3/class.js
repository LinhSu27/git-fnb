class ClassRoom {
    constructor(className, teacher) {
        this.className = className;
        this.teacher = teacher;
        this.students = [];
        this.subjects = ["Toán", "Lý", "Hóa", "Văn", "Anh"];
    }
    // thêm học sinh vào lớp và tìm học sinh trùng mã
    addStudent(student) {
    // Kiểm tra xem học sinh có mã trùng không
    const isDuplicate = this.students.some(s => s.studentId === student.studentId);

    if (isDuplicate) {
        console.log(`❌ Học sinh với mã "${student.studentId}" đã tồn tại trong lớp.`);
        return false;
    }

    this.students.push(student);
    console.log(`✅ Đã thêm học sinh: ${student.name} (${student.studentId}) vào lớp ${this.className}`);
    return true;
}
// xóa học sinh khỏi lớp 
removeStudent(studentId) {
    const index = this.students.findIndex(s => s.studentId === studentId);

    if (index === -1) {
        console.log(`❌ Không tìm thấy học sinh với mã "${studentId}" trong lớp.`);
        return false;
    }

    const removed = this.students.splice(index, 1)[0];
    console.log(`✅ Đã xoá học sinh: ${removed.name} (${removed.studentId}) khỏi lớp.`);
    return true;
}
//Tìm học sinh theo mã 
   findStudent(keyword) {
    const lowerKeyword = keyword.toLowerCase();

    const results = this.students.filter(student => {
        return (
            student.name.toLowerCase().includes(lowerKeyword) ||
            student.studentId.toLowerCase().includes(lowerKeyword)
        );
    });

    if (results.length === 0) {
        console.log(`❌ Không tìm thấy học sinh nào khớp với từ khoá: "${keyword}"`);
    } else {
        console.log(`🔍 Kết quả tìm kiếm với từ khoá "${keyword}":`);
        results.forEach(student => {
            console.log(`- ${student.name} (${student.studentId})`);
        });
    }

    return results;
} // thống kê vào báo cáo
getClassAverage() {
    if (this.students.length === 0) {
        console.log("⚠️ Lớp chưa có học sinh.");
        return 0;
    }

    // Lấy điểm trung bình của từng học sinh
    const totalAverage = this.students.reduce((sum, student) => {
        if (typeof student.getAverageScore === 'function') {
            return sum + student.getAverageScore();
        }
        return sum;
    }, 0);

    const classAverage = totalAverage / this.students.length;
    return parseFloat(classAverage.toFixed(2));
} //Lấy học sinh giỏi nhất
getTopStudents(count = 3) {
    if (this.students.length === 0) {
        console.log("⚠️ Lớp chưa có học sinh.");
        return [];
    }

    // Lọc học sinh có hàm getAverageScore và tính điểm
    const sortedStudents = this.students
        .filter(student => typeof student.getAverageScore === 'function')
        .sort((a, b) => b.getAverageScore() - a.getAverageScore());

    const topStudents = sortedStudents.slice(0, count);

    console.log(`🏆 Top ${topStudents.length} học sinh điểm cao nhất:`);
    topStudents.forEach((student, index) => {
        console.log(
            `${index + 1}. ${student.name} (${student.studentId}) - Điểm TB: ${student.getAverageScore().toFixed(2)}`
        );
    });

    return topStudents; 
} 
// thống kê điểm môn học ( điểm cao nhất , thấp nhất , xết loại 
getSubjectStatistics(subject) {
    if (this.students.length === 0) {
        console.log("⚠️ Lớp chưa có học sinh.");
        return;
    }

    // Lấy danh sách điểm môn học của học sinh (nếu có)
    const subjectScores = this.students
        .map(student => {
            const record = student.scores.find(s => s.subject.toLowerCase() === subject.toLowerCase());
            return record ? record.score : null;
        })
        .filter(score => score !== null);

    if (subjectScores.length === 0) {
        console.log(`⚠️ Không có điểm nào cho môn "${subject}".`);
        return;
    }

    // Tính toán thống kê
    const max = Math.max(...subjectScores);
    const min = Math.min(...subjectScores);
    const avg = subjectScores.reduce((a, b) => a + b, 0) / subjectScores.length;

    // Phân loại học sinh
    const types = {
        Gioi: 0,
        Kha: 0,
        TrungBinh: 0,
        Yeu: 0
    };

    subjectScores.forEach(score => {
        if (score >= 8.5) types.Gioi++;
        else if (score >= 7) types.Kha++;
        else if (score >= 5) types.TrungBinh++;
        else types.Yeu++;
    });

    // Hiển thị kết quả
    console.log(`📊 Thống kê môn "${subject}":`);
    console.log(`- Số học sinh có điểm: ${subjectScores.length}`);
    console.log(`- Điểm cao nhất: ${max}`);
    console.log(`- Điểm thấp nhất: ${min}`);
    console.log(`- Điểm trung bình: ${avg.toFixed(2)}`);
    console.log(`- Xếp loại:`);
    console.log(`  ▸ Giỏi: ${types.Gioi}`);
    console.log(`  ▸ Khá: ${types.Kha}`);
    console.log(`  ▸ Trung bình: ${types.TrungBinh}`);
    console.log(`  ▸ Yếu: ${types.Yeu}`);
}
generateReport() {
    console.log("📝 ===== BÁO CÁO TỔNG HỢP LỚP =====");

    // 1. Thông tin lớp học
    console.log(`📚 Tên lớp: ${this.className}`);
    console.log(`👩‍🏫 Giáo viên chủ nhiệm: ${this.teacher}`);
    console.log(`👥 Sĩ số: ${this.students.length}`);
    console.log("\n👨‍🎓 Danh sách học sinh:");

    if (this.students.length === 0) {
        console.log("⚠️ Lớp chưa có học sinh.");
        return;
    }

    // 2. In danh sách học sinh với điểm TB và xếp loại
    this.students.forEach((student, index) => {
        const avg = typeof student.getAverageScore === "function"
            ? student.getAverageScore().toFixed(2)
            : "N/A";
        const grade = typeof student.getGrade === "function"
            ? student.getGrade()
            : "N/A";
        console.log(`${index + 1}. ${student.name} (${student.studentId}) - TB: ${avg} - Xếp loại: ${grade}`);
    });

    // 3. Thống kê theo xếp loại
    const stats = {
        Gioi: 0,
        Kha: 0,
        TrungBinh: 0,
        Yeu: 0
    };

    this.students.forEach(student => {
        if (typeof student.getGrade === "function") {
            const grade = student.getGrade();
            if (grade === "Giỏi") stats.Gioi++;
            else if (grade === "Khá") stats.Kha++;
            else if (grade === "Trung bình") stats.TrungBinh++;
            else if (grade === "Yếu") stats.Yeu++;
        }
    });

    // 4. Điểm TB lớp
    const classAvg = typeof this.getClassAverage === "function"
        ? this.getClassAverage()
        : 0;

    console.log("\n📊 Thống kê lớp học:");
    console.log(`- Điểm trung bình lớp: ${classAvg.toFixed(2)}`);
    console.log(`- Số học sinh Giỏi: ${stats.Gioi}`);
    console.log(`- Số học sinh Khá: ${stats.Kha}`);
    console.log(`- Số học sinh Trung bình: ${stats.TrungBinh}`);
    console.log(`- Số học sinh Yếu: ${stats.Yeu}`);
    console.log("📝 ================================\n");
}
// Xuất file danh sách học sinh 
exportStudentList(format = "simple") {
    if (this.students.length === 0) {
        console.log("⚠️ Lớp chưa có học sinh để export.");
        return;
    }

    console.log(`📄 Danh sách học sinh - Format: ${format.toUpperCase()}`);

    this.students.forEach((student, index) => {
        switch (format) {
            case "simple":
                console.log(`${index + 1}. ${student.name} (${student.studentId})`);
                break;

            case "detailed":
                console.log(`${index + 1}. ${student.name} (${student.studentId}) - Tuổi: ${student.age}`);
                if (student.scores.length === 0) {
                    console.log("   ⚠️ Chưa có điểm.");
                } else {
                    student.scores.forEach(score => {
                        console.log(`   ▸ ${score.subject}: ${score.score}`);
                    });
                }
                break;

            case "grades":
                const avg = typeof student.getAverageScore === "function"
                    ? student.getAverageScore().toFixed(2)
                    : "N/A";
                const grade = typeof student.getGrade === "function"
                    ? student.getGrade()
                    : "N/A";
                console.log(`${index + 1}. ${student.name} (${student.studentId}) - TB: ${avg} - Xếp loại: ${grade}`);
                break;

            default:
                console.log(`❌ Format không hợp lệ: "${format}". Vui lòng chọn "simple", "detailed", hoặc "grades".`);
                return;
        }
    });

    console.log("✅ Xuất danh sách hoàn tất.\n");
}
// import file 
importScoresFromString(dataString) {
    if (!dataString || typeof dataString !== "string") {
        console.log("❌ Dữ liệu đầu vào không hợp lệ.");
        return;
    }

    const lines = dataString.trim().split("\n");

    lines.forEach((line, index) => {
        const [studentId, subject, scoreStr] = line.split(",");

        if (!studentId || !subject || !scoreStr) {
            console.log(`⚠️ Dòng ${index + 1} không hợp lệ: ${line}`);
            return;
        }

        const score = parseFloat(scoreStr);

        if (isNaN(score) || score < 0 || score > 10) {
            console.log(`⚠️ Điểm không hợp lệ ở dòng ${index + 1}: ${scoreStr}`);
            return;
        }

        // Tìm học sinh
        const student = this.students.find(s => s.studentId === studentId.trim());

        if (!student) {
            console.log(`⚠️ Không tìm thấy học sinh với mã: ${studentId}`);
            return;
        }

        // Thêm hoặc cập nhật điểm
        const existing = student.scores.find(s => s.subject.toLowerCase() === subject.trim().toLowerCase());

        if (existing) {
            existing.score = score; // Cập nhật điểm nếu đã tồn tại môn
        } else {
            student.scores.push({ subject: subject.trim(), score });
        }

        console.log(`✅ Nhập điểm thành công: ${student.name} - ${subject.trim()} = ${score}`);
    });
} // kiểm tra tính hợp lệ của dữ liệu 
validateAllData() {
    const errors = [];
    const studentIds = new Set();

    this.students.forEach((student, index) => {
        const prefix = `🔍 Học sinh ${index + 1} (${student.name || "Chưa rõ"})`;

        // Kiểm tra thông tin cơ bản
        if (!student.name || !student.age || !student.studentId) {
            errors.push(`${prefix}: Thiếu thông tin (name, age hoặc studentId).`);
        }

        // Kiểm tra trùng mã SV
        if (studentIds.has(student.studentId)) {
            errors.push(`${prefix}: Trùng mã sinh viên (${student.studentId}).`);
        } else {
            studentIds.add(student.studentId);
        }

        // Kiểm tra điểm
        if (Array.isArray(student.scores)) {
            student.scores.forEach((scoreObj, i) => {
                const sPrefix = `${prefix} - Môn ${i + 1}`;
                if (!scoreObj.subject) {
                    errors.push(`${sPrefix}: Thiếu tên môn học.`);
                }
                if (
                    typeof scoreObj.score !== "number" ||
                    scoreObj.score < 0 ||
                    scoreObj.score > 10
                ) {
                    errors.push(`${sPrefix}: Điểm không hợp lệ (${scoreObj.score}).`);
                }
            });
        } else {
            errors.push(`${prefix}: scores không phải là mảng.`);
        }
    });

    // In kết quả
    if (errors.length === 0) {
        console.log("✅ Dữ liệu hợp lệ hoàn toàn.");
        return true;
    } else {
        console.log("❌ Dữ liệu không hợp lệ:");
        errors.forEach(err => console.log(" - " + err));
        return false;
    }
}
   
}
class Student {
    constructor(name, age, studentId) {
        this.name = name;
        this.age = age;
        this.studentId = studentId;
        this.scores = [];
    } // tính điểm trung bình của học sinh 
    getAverageScore() {
    if (this.scores.length === 0) return 0;
    const total = this.scores.reduce((sum, s) => sum + s.score, 0);
    return total / this.scores.length;
}
getGrade() {
    const avg = this.getAverageScore();
    if (avg >= 8.5) return "Giỏi";
    if (avg >= 7) return "Khá";
    if (avg >= 5) return "Trung bình";
    return "Yếu";
}
}
class DataProcessor {
    static formatStudentData(students) {
        if (!Array.isArray(students)) {
            throw new Error("Tham số đầu vào phải là một mảng học sinh.");
        }

        return students.map(student => {
            const averageScore = typeof student.getAverageScore === "function"
                ? student.getAverageScore().toFixed(2)
                : "N/A";

            const grade = typeof student.getGrade === "function"
                ? student.getGrade()
                : "N/A";

            return {
                studentId: student.studentId || "N/A",
                name: student.name || "Chưa có tên",
                averageScore,
                grade
            };
        });
    } // Tính phân bố điểm: bao nhiêu % Giỏi, Khá, TB, Yếu
  static calculateGradeDistribution(students) {
        if (!Array.isArray(students) || students.length === 0) {
            return {
                Gioi: 0,
                Kha: 0,
                TrungBinh: 0,
                Yeu: 0
            };
        }

        const total = students.length;
        const counts = {
            Gioi: 0,
            Kha: 0,
            TrungBinh: 0,
            Yeu: 0
        };

        students.forEach(student => {
            const grade = typeof student.getGrade === "function"
                ? student.getGrade()
                : null;

            switch (grade) {
                case "Giỏi":
                    counts.Gioi++;
                    break;
                case "Khá":
                    counts.Kha++;
                    break;
                case "Trung bình":
                    counts.TrungBinh++;
                    break;
                case "Yếu":
                    counts.Yeu++;
                    break;
                default:
                    // Bỏ qua nếu không xác định được xếp loại
                    break;
            }
        });

        // Chuyển sang % và làm tròn 2 chữ số
        return {
            Gioi: parseFloat(((counts.Gioi / total) * 100).toFixed(2)),
            Kha: parseFloat(((counts.Kha / total) * 100).toFixed(2)),
            TrungBinh: parseFloat(((counts.TrungBinh / total) * 100).toFixed(2)),
            Yeu: parseFloat(((counts.Yeu / total) * 100).toFixed(2))
        };
    }  
   // Tự động tạo mã học sinh từ tên

    static generateStudentId(name, existingIds = []) {
        if (typeof name !== "string" || name.trim() === "") {
            throw new Error("Tên học sinh không hợp lệ.");
        }

        const normalized = name
            .trim()
            .toLowerCase()
            .split(/\s+/)              // Tách theo khoảng trắng
            .map(word => word[0])     // Lấy chữ cái đầu mỗi từ
            .join("");                // Ghép lại thành mã gốc

        let count = 1;
        let studentId = "";

        // Lặp đến khi tìm được mã chưa trùng
        do {
            const suffix = count.toString().padStart(3, "0"); // 001, 002, ...
            studentId = `${normalized}${suffix}`;
            count++;
        } while (existingIds.includes(studentId));

        return studentId;
    }
    // Parse dữ liệu CSV thành array objects

    static parseCSVData(csvString) {
        if (typeof csvString !== 'string' || !csvString.trim()) {
            throw new Error("CSV đầu vào không hợp lệ.");
        }

        const lines = csvString.trim().split('\n');
        const headers = lines[0].split(',').map(h => h.trim());

        const data = [];

        for (let i = 1; i < lines.length; i++) {
            const values = lines[i].split(',').map(v => v.trim());
            if (values.length !== headers.length) {
                console.warn(`⚠️ Dòng ${i + 1} bị sai định dạng, bỏ qua.`);
                continue;
            }

            const obj = {};
            headers.forEach((header, index) => {
                obj[header] = values[index];
            });

            data.push(obj);
        }

        return data;
    }
} 


const classA = new ClassRoom("10A1", "Cô Hạnh");

const sv1 = new Student("Nguyễn Văn An", 16, "SV001");
const sv2 = new Student("Trần Thị Bình", 17, "SV002");
const sv3 = new Student("Nguyễn Văn An", 16, "SV001"); // Trùng mã
const sv4 = new Student("Lê Thị Diệp", 16, "SV003")
sv1.scores = [{ subject: "Toán", score: 9 }, { subject: "Văn", score: 7 },{ subject: "Lý", score: 8 },{ subject: "Hóa", score: 7 },{subject: "Anh", score: 10}  ];
sv2.scores = [{ subject: "Toán", score: 8 }, { subject: "Văn", score: 5 }, { subject: "Lý", score: 8 },{ subject: "Hóa", score: 7 },{subject: "Anh", score: 8} ];
sv4.scores = [{ subject: "Toán", score: 10 }, { subject: "Văn", score: 8 }, { subject: "Lý", score: 8 },{ subject: "Hóa", score: 7 },{subject: "Anh", score: 8} ];
const csvData = `
SV001,Toán,9
SV002,Lý,7.5
SV003,Văn,8
SV999,Hóa,10  // không tồn tại
SV001,,10     // thiếu môn
SV002,Anh,abc // sai điểm
`;
const students = [sv1, sv2];
const formatted = DataProcessor.formatStudentData(students);
const stats = DataProcessor.calculateGradeDistribution([sv1, sv2, sv3, sv4]);
const existing = ["nva001", "nva002", "nva003"];
const name = "Nguyễn Văn An";

const newId = DataProcessor.generateStudentId(name, existing);
const csv = `
studentId,name,age
SV001,Nguyễn Văn An,16
SV002,Lê Thị Bích,17
SV003,Lê,Thừa,18     // dòng sai định dạng
`;

const result = DataProcessor.parseCSVData(csv);




classA.addStudent(sv1); // ✅ Thêm thành công
classA.addStudent(sv2); // ✅ Thêm thành công
classA.addStudent(sv3); // ❌ Trùng mã
classA.addStudent(sv4);
classA.removeStudent("SV001");
classA.findStudent("Bình");     // Tìm theo tên
classA.findStudent("sv002");  // Tìm theo mã
classA.findStudent("xyz");    // Không tìm thấy
console.log("🎯 Điểm trung bình cả lớp:", classA.getClassAverage()); // điểm trung bình của cả lớp 
classA.getTopStudents(1); // học sinh điểm cao nhất
classA.getSubjectStatistics("Văn");
classA.generateReport();
classA.exportStudentList("simple"); // export dữ liệu 
classA.exportStudentList("detailed"); 
classA.exportStudentList("grades");
classA.importScoresFromString(csvData); // import dữ liệu
classA.validateAllData(); // kiểm tra dữ liệu hợp lệ
console.table(formatted); // fomat danh sách học sinh 
console.log(stats); // phân bổ % bao nhiêu giỏi , khác , TB , yếu
console.log(newId); // tự động tạo tên mã
console.log(result); //Parse dữ liệu CSV thành array objects
