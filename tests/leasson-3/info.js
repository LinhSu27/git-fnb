
function formatName(fullName){
  return fullName.trim().toLowerCase().split(/\s+/).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '); // Ghép các từ lại với khoảng trắng
     
}console.log(formatName(" nguyễn văn   an")); 
  
function validateEmail(email) {
    return email.includes('@') && email.includes('.com');
}console.log(validateEmail("test@gmail.com"));

function extractDomain(email) {
    const parts = email.split('@');
    return parts.length === 2 ? parts[1] : null;
} console.log(extractDomain("user@gmail.com"));

function createUsername(fullName) {
    function removeVietnameseTones(str) {
        return str
            .normalize("NFD") // Tách chữ và dấu
            .replace(/[\u0300-\u036f]/g, "") // Xoá dấu
            .replace(/đ/g, "d")
            .replace(/Đ/g, "d");
    }return removeVietnameseTones(fullName).trim().toLowerCase().split(/\s+/).join('_');
}console.log(createUsername("Nguyễn Văn An"));