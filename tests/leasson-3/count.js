function basicCalculator(operation, a, b){
    switch(operation){
        case 'add':
            return a + b ;
        case 'multiply':
            return a * b ;
    }
}console.log(basicCalculator('add' , 5 , 3));
console.log(basicCalculator('multiply' , 8 , 3));

function calculateTax(amount, taxRate = 0.1){
   return amount * taxRate;
        
    }console.log(calculateTax('1000', '0.15'));

 function calculateDiscount(originalPrice, discountPercent) {
    const discountAmount = (originalPrice * discountPercent) / 100;
    return originalPrice - discountAmount;
}console.log(calculateDiscount(100,20));