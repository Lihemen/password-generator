//DOM Elements
const resultEl = document.getElementById("result");
const lengthEl = document.getElementById("passwordLength");
const uppercaseEl = document.getElementById("uppercase");
const lowercaseEl = document.getElementById("lowercase");
const numbersEl = document.getElementById("numbers");
const symbolsEl = document.getElementById("symbols");
const generateEl = document.getElementById("generate");
const clipboardEl = document.getElementById("clipboard");

const randomFunction = {
	lower: getRandomLower,
	upper: getRandomUpper,
	number: getRandomNumber,
	symbol: getRandomSymbol
};

generateEl.addEventListener("click", () => {
	const length = +lengthEl.value;
	const hasLower = lowercaseEl.checked;
	const hasUpper = uppercaseEl.checked;
	const hasNumbers = numbersEl.checked;
	const hasSymbols = symbolsEl.checked;

	resultEl.innerText = generatePassword(
		hasLower,
		hasUpper,
		hasNumbers,
		hasSymbols,
		length
	);
});

// generate password
function generatePassword(lower, upper, number, symbol, length) {
	let generatedPassword = "";

	const typesCount = lower + upper + number + symbol;

	const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(
		item => Object.values(item)[0]
	);

	if (typesCount == 0) {
		return "";
	}

	for (let i = 0; i < length; i += typesCount) {
		typesArr.forEach(type => {
			const functionName = Object.keys(type)[0];

			generatedPassword += randomFunction[functionName]();
		});
	}
	const finalPassword = generatedPassword.slice(0, length);

	return finalPassword;
}

// copy to clipboard
clipboardEl.addEventListener("click", () => {
	const textarea = document.createElement("textarea");
	const password = resultEl.innerText;

	if (!password) {
		return;
	}

	textarea.value = password;
	document.body.appendChild(textarea);
	textarea.select();
	document.execCommand("copy");
	textarea.remove();
	alert("Password copied to clipboard");
});

// Generator functions from charset
function getRandomLower() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}
function getRandomUpper() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}
function getRandomNumber() {
	return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}
function getRandomSymbol() {
	const symbol = "!@#$%^&*()-/=[],.";
	return symbol[Math.floor(Math.random() * symbol.length)];
}
