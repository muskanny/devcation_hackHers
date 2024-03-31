// Function to calculate monthly investment for Scheme 1
function calculateScheme1(amount, time) {
    const interestRate = 0.05; // 5% interest rate for Scheme 1 (can be adjusted)
    const totalMonths = time * 12;
    const monthlyInterest = Math.pow(1 + interestRate, totalMonths);
    return (amount * (interestRate * monthlyInterest)) / (monthlyInterest - 1);
}

// Function to calculate monthly investment for Scheme 2
function calculateScheme2(amount, time) {
    const interestRate = 0.06; // 6% interest rate for Scheme 2 (can be adjusted)
    const totalMonths = time * 12;
    const monthlyInterest = Math.pow(1 + interestRate, totalMonths);
    return (amount * (interestRate * monthlyInterest)) / (monthlyInterest - 1);
}

// Add more functions for additional investment schemes...

// Function to display results on the webpage
function displayResults(amount, time) {
    const resultDiv = document.getElementById('result');
    const scheme1Amount = calculateScheme1(amount, time);
    const scheme2Amount = calculateScheme2(amount, time);
    // Calculate amounts for other schemes as needed

    // Display results for Scheme 1
    resultDiv.innerHTML += `<p>For Scheme 1: Monthly investment needed is ${scheme1Amount.toFixed(2)}</p>`;
    // Display results for Scheme 2
    resultDiv.innerHTML += `<p>For Scheme 2: Monthly investment needed is ${scheme2Amount.toFixed(2)}</p>`;
    // Display results for other schemes as needed
}
