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

    const regex = /(and i am )(\d+)( y\.o\.)/g;
    const newDescription = `and i am ${age} y.o.`;
    
    if (data.includes(newDescription)) {
        console.log("Age is already correct. No changes needed.");
        return;
    }

    const updatedContent = data.replace(regex, newDescription);

    fs.writeFile(readmePath, updatedContent, 'utf8', (err) => {
        if (err) return console.error("Error writing README file:", err);
        console.log(`Age successfully updated to ${age} in README.md`);
    });
});
