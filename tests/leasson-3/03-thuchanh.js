/*function sayHello (){
    
    console.log("Xin chào");
}
sayHello();
sayHello();
sayHello();
for (let i =1 ; i<10 ; i++){
    console.log(i);
} */

const { count } = require("node:console");

// const { get } = require("http");

// function printNumber (n){
//     for (let i = 1 ; i <= n ; i ++){
//     console.log(i);
// } 
// } 
// printNumber();
// console.log("Xin chao");
// printNumber();
// console.log("Xin chao");
// printNumber();
// console.log("aaaaaaa");
// printNumber(5);
// printNumber(10);
// printNumber(15);

// function getMax(a,b){
//     if(a > b){
//         return (a);
//     } return (b) ;
// }
// const max = getMax(10,15);
// console.log(max);

//trim() cắt bỏ khoảng trắng đầu cuối
// let str = "   Đây là 1 chuỗi có ký tự trống đầu và cuối    ";
// console.log(str.trim());

//toUpperCase() : viết hoa các ký tự 
// let str2 = " Đây là 1 chuỗi có ký tự trống đầu và cuối" ;
// console.log(str2.toUpperCase());

// //toLowerCase() 
// let str3 = " ĐÂY LÀ CHUỖI KÝ TỰ TRỐNG ĐẦU VÀ CUỐI"
// console.log(str3.toLocaleLowerCase());

// include() hàm trả về giá trị đúng , sai thõa mãn 

// let str4 = "ĐÂY LÀ CHUỖI KÝ TỰ CHUỖI TRỐNG ĐẦU VÀ CUỐI" ;
// console.log(str4.includes("ai"));

// replace() GHI ĐÈ 
// console.log(str4.replaceAll("CHUỖI", "ĐOẠN"));

//split () : tách chuỗi 
// console.log(str4.split("CHUỖI"));

//substring() : trả ra chuỗi  
// console.log(str4.substring(0,5));

//indexOf() : trả về vị trí xuất hiện của time số truyền vào
// console.log(str4.indexOf("KÝ"));

//map() : mảng mới để xử lý cho mảng
// let num = [1,2,3,4,5];
// let newnum = num.map(num => num*2);
// console.log(newnum);

//filter : tìm ra phần tử từ mảng ( gồm tất các phần tử )
// const str1 = ["đây là 1","chuỗi và lấy", " ra chuỗi thõa mãn"];
// const newstr1 = str1.filter(str1 => str1.includes("chuỗi"));
// console.log(newstr1);

//find() : lấy ra giá trị đầu tiên thõa mãn của chuỗi 
// let num = [1,,3,4,6];
// let newnum = num.find(num => num%2 === 0);
// console.log(newnum);

//class
class Student {
    constructor(name , city, age ){
        this.name = name;
        this.city = city;
        this.age = age;
    }
    infor(mes){
        if(mes){
             console.log("tôi tên là", this.name) ;
        }
        console.log("nothing");
        
    }
}
let stu1 = new Student("Van","TH", 30);
console.log(stu1);
stu1.infor("m");

