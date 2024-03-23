document.addEventListener("DOMContentLoaded", function () {  
    const seed = getSeedFromDate();  
    const lottoNumbers = generateLottoNumbers(seed);  
    document.getElementById("lotteryNumbers").textContent = "前区号码: " + lottoNumbers.front.join(", ") + " | 后区号码: " + lottoNumbers.back.join(", ");  
});  
  
function getSeedFromDate() {  
    const date = new Date();  
    const year = date.getFullYear();  
    const month = date.getMonth() + 1; // getMonth() is zero-based  
    const day = date.getDate();  
    return year * 10000 + month * 100 + day; // Simple way to combine year, month, and day into a seed number  
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