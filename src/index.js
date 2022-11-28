const MORSE_TABLE = {
    '.-':     'a',
    '-...':   'b',
    '-.-.':   'c',
    '-..':    'd',
    '.':      'e',
    '..-.':   'f',
    '--.':    'g',
    '....':   'h',
    '..':     'i',
    '.---':   'j',
    '-.-':    'k',
    '.-..':   'l',
    '--':     'm',
    '-.':     'n',
    '---':    'o',
    '.--.':   'p',
    '--.-':   'q',
    '.-.':    'r',
    '...':    's',
    '-':      't',
    '..-':    'u',
    '...-':   'v',
    '.--':    'w',
    '-..-':   'x',
    '-.--':   'y',
    '--..':   'z',
    '.----':  '1',
    '..---':  '2',
    '...--':  '3',
    '....-':  '4',
    '.....':  '5',
    '-....':  '6',
    '--...':  '7',
    '---..':  '8',
    '----.':  '9',
    '-----':  '0',
};

function decode(expr) {
let separatedInputArr = [];

for (let i = 0; i < expr.length; i = i + 10) {
  while (expr.length != 0) {
    separatedInputArr.push(expr.slice(i, 10));
    expr = expr.replace(expr.slice(0, 10), '');
  };
};

const digitsArr = separatedInputArr.reduce((acc, element) => {
let sum = '';

for (let i = 0; i < element.length; i++) {
  sum += element[i];
};

if (isFinite(sum)) {
  acc.push(parseInt(sum));
} else {
        acc.push(sum);
};
return acc;
}, []);

let separatedDigitsArr = digitsArr.reduce((acc, element) => {
let elementToString = element.toString();
if (elementToString.length > 2) {
  while(elementToString.length != 0) {
    acc.push(elementToString.substring(0, 2));
    elementToString = elementToString.slice(2);
}
  acc.push('SBL'); //spaceBetweenLetters
} else {
    acc.push(elementToString);
    acc.push('SBL'); //spaceBetweenLetters
}
  return acc;
}, []);

let dotsDashesArr = separatedDigitsArr.reduce((acc, element) => {
switch (element) {
  case ('10'): acc.push('.');
  break;
  case ('11'): acc.push('-');
  break;
  case ('SBL'): acc.push(' ');
  break;
  case ('**'): acc.push('**');
  break;
};
  return acc;
}, []);

let dotsDashesStr = dotsDashesArr.join('').split(' ');
let outputInArr = dotsDashesStr.reduce((acc, element) => {
  if (element === '**********') {
  acc.push(' ');
} else {
        for (let key in MORSE_TABLE) {
          if (element === key) {
            acc.push(MORSE_TABLE[key]);
    };
  };
};
  return acc;
}, []);
  return outputInArr.join('');
}

module.exports = {
    decode
}
