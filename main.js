const uppercaseEl = document.getElementById("uppercase");
const lowercaseEl = document.getElementById("lowercase");
const numbersEl = document.getElementById("numbers");
const symbolsEl = document.getElementById("symbols");
const generateEl = document.getElementById("generate");
const clipboardEl = document.getElementById("clipboard");
const lengthEl = document.getElementById("length");
const resultEl = document.getElementById("result");

const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
};

//Generate EventListener 
generateEl.addEventListener("click", () => {
    const length = +lengthEl.value;
    const hasLower = lowercaseEl.checked;
    const hasUpper = uppercaseEl.checked;
    const hasNumber = numbersEl.checked;
    const hasSymbol = symbolsEl.checked;

    resultEl.innerText = generatePassword(
        hasLower,
        hasUpper,
        hasNumber,
        hasSymbol,
        length
    );
});
// Copy Password to clipboard

clipboardEl.addEventListener('click', () => {
    const textarea = document.createElement('textarea');
    const password = resultEl.innerText;

    if(!password) {
        return;
    }else{
    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
   document.execCommand('copy');
   textarea.remove();
   alert('Password copied to clipboard!')
}

});



//GeneratePassword function
// 1.Init pw var
// 2.Filter out unckecked types
// 3.loop over lenght call generate function for each type
// 4.Add final pw to the var and return

function generatePassword(lower, upper, number, symbol, length) {
    let generatedPassword = '';
    const typesCount = lower + upper + number + symbol;

    //console.log('typeofCount:',typesCount );
    // 2.Filter out unckecked types
    const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter
        (
            item => Object.values(item)[0]
        );

    //console.log('typeof :',typesArr);

    if (!typesCount === 0) {
        return "";
    }
    // 3.loop over lenght call generate function for each type

    for (let i = 0; i < length; i += typesCount) {
        typesArr.forEach((type) => {
            const funcName = Object.keys(type)[0];

            //console.log('funcName:',funcName );

            generatedPassword += randomFunc[funcName]();

        });
    }

    //console.log(generatedPassword);
    // 4.Add final pw to the var and return
    const finalPassword = generatedPassword.slice(0, length);
    return finalPassword;
}


//Generate function= http://www.net.-comber.com/charset.html
function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
}
function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
}
function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48)
}
function getRandomSymbol() {
    const symbols = "~!@#$%^*"
    return symbols[Math.floor(Math.random() * symbols.length)]
}
