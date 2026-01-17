const fs = require('fs');
const path = require('path');

function calculateAge(birthDate) {
    const today = new Date();
    const dob = new Date(birthDate);
    let age = today.getFullYear() - dob.getFullYear();
    const monthDifference = today.getMonth() - dob.getMonth();
    
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < dob.getDate())) {
        age--;
    }
    return age;
}

const BIRTH_DATE = '2006-02-13';
const age = calculateAge(BIRTH_DATE);

const readmePath = path.join(__dirname, '../../README.md');

fs.readFile(readmePath, 'utf8', (err, data) => {
    if (err) {
        console.error("Error reading README file:", err);
        return;
    }

    // Update encoded URL in cardivo link
    const oldAgePattern = /(and%20i%20am%20)(\d+)(%20y\.o\.)/;
    const newCardUrl = `and%20i%20am%20${age}%20y.o.`;
    
    // Check current age in README
    const currentMatch = data.match(oldAgePattern);
    if (currentMatch && parseInt(currentMatch[2]) === age) {
        console.log(`Age is already ${age}. No update needed.`);
        return;
    }

    // Replace the age in cardivo URL
    const updatedContent = data.replace(oldAgePattern, newCardUrl);

    fs.writeFile(readmePath, updatedContent, 'utf8', (err) => {
        if (err) {
            console.error("Error writing README file:", err);
            return;
        }
        console.log(`✅ Successfully updated age to ${age} in README.md`);
    });
});
