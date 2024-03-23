

document.addEventListener("DOMContentLoaded", function () {  
    const dateElement = document.getElementById("lotteryDate");  
    const currentDate = new Date();  
    const formattedDate = currentDate.toISOString().split('T')[0]; // 获取日期部分，格式为 "YYYY-MM-DD"  
    dateElement.textContent = "日期: " + formattedDate;  
  
    const seed = getSeedFromDate(currentDate);  
    const lottoNumbers = generateLottoNumbers(seed);  
    const numbersElement = document.getElementById("lotteryNumbers");  
    numbersElement.textContent = "幸运号码：" + lottoNumbers.front.join(", ") + " | " + lottoNumbers.back.join(", ");  
});  
  
function getSeedFromDate(date) {  
    const year = date.getFullYear();  
    const month = date.getMonth() + 1; // getMonth() 是零基索引  
    const day = date.getDate();  
    return year * 10000 + month * 100 + day; // 将年月日组合成种子数  
}  
  

function generateLottoNumbers(seed) {  
    // Simple pseudo-random number generator (LCG) initialization  
    let a = 16807; // LCG modulus  
    let m = 2147483647; // LCG modulus  
    let current = seed % m; // Initialize the seed value  
  
    // Function to generate the next pseudo-random number  
    function nextRandom() {  
        current = (a * current) % m;  
        return current / m; // Convert to [0, 1) range  
    }  
  
    // Generate front numbers (1-35)  
    let front = [];  
    while (front.length < 5) {  
        let num = Math.floor(nextRandom() * 35) + 1;  
        if (!front.includes(num)) { // Ensure uniqueness  
            front.push(num);  
        }  
    }  
    front.sort((a, b) => a - b); // Sort in ascending order  
  
    // Generate back numbers (1-12)  
    let back = [];  
    while (back.length < 2) {  
        let num = Math.floor(nextRandom() * 12) + 1;  
        if (!back.includes(num)) { // Ensure uniqueness  
            back.push(num);  
        }  
    }  
    back.sort((a, b) => a - b); // Sort in ascending order  
  
    return { front, back }; // Return an object with front and back numbers  
}







