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

function calculateCompoundInterest(principal, rate, time, compound = 1) {
    const amount = principal * Math.pow(1 + rate / compound, compound * time);
    return parseFloat(amount.toFixed(2)); // Làm tròn đến 2 chữ số thập phân
}console.log(calculateCompoundInterest(1000, 0.05, 2, 12));

function formatCurrency(amount, currency = "VND") {
    return amount.toLocaleString('en-US') + ' ' + currency;
} console.log(formatCurrency(1234567, "VND"));