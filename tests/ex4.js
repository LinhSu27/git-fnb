// khai báo chiều cao 
const heighCm = 150 ;

// Tính số lẻ chiều cao 
const a = heighCm % 100 ;   

// Cân nặng lý tưởng 
const idealWeight = (a * 9 ) / 10 ; 

// Cân nặng tối đa 
const maxWeight = a ; 

// Cân nặng tối thiểu 
const minWeigh = (a * 8) / 10 ;

console.log("Cân nặng lý tưởng ", idealWeight,"Cân nặng tối đa", maxWeight, "Cân nặng tối thiểu", minWeigh );