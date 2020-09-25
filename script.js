const screen = document.getElementById('screen');
operatorList = ['-','+','/','*'];
var temp = '';
var x = '';
var y = '';
var o = '';
var tempOp = '';
var c = 0;
storeValue = (temp) => {
  if (x === '' && y === '' && temp === '=') {
    screen.textContent = '';
  } else if (x === '' && y === '') {
    if (screen.textContent === '') {
      screen.textContent = '0';
    };
    x = screen.textContent;
    tempOp = temp;
    c = 1;
  } else if (x !== '' && y === '' && temp !== '=') {
    if (c === 1 && temp !== '=') { 
      tempOp = temp;      
      c = 1;
    } else { 
    y = screen.textContent;
    o = tempOp;
    tempOp = temp;
    x = operate(x,o,y);
    y = '';
    c = 1;
    checkLength();
    screen.textContent = x;
    };
  } else if (x !== '' && y === '' && temp === '=') {
    y = screen.textContent;
    o = tempOp;
    tempOp = temp;
    x = operate(x,o,y);
    c = 1;
    checkLength();
    screen.textContent = x;
  } else if (x !== '' && y !== '' && temp !== '=') {
    y = '';
    x = screen.textContent;
    o = tempOp;
    tempOp = temp;
    c = 1;
  } else if (x !== '' && y !== '' && temp === '=') {
    x = operate(x,o,y);
    checkLength();
    screen.textContent = x;
  };
};
checkLength = () => {
  if (x.toString().length > 11) {
    x = x.toString().substring(0,11);
  };
};
displayValues = (temp) => {
  if (c === 1) {
    screen.textContent = '';
    c = 0;
  };
  if (screen.textContent.length < 10 || 
     (screen.textContent.length < 11 && screen.textContent.includes('.') === true)) {
    screen.textContent = screen.textContent + temp;
  };
};
checkDecimal = (temp) => {
  if (screen.textContent.includes('.') === false) {
    displayValues(temp);
  };
  if (c === 1 && screen.textContent.includes('.') === true) {
    displayValues(temp);
  };
};
operate = (x,o,y) => {
  if (o === '-') {
    if ((Number(x) - Number(y)) < 9999999999.0) {
      return ((Number(x) * 10) - (Number(y) * 10)) / 10;
    } else {
      return 'OVERLOAD';
    };
  };
  if (o === '+') {
    if ((Number(x) + Number(y)) < 9999999999.0) {
      return ((Number(x) * 10) + (Number(y) * 10)) / 10;
    } else {
      return 'OVERLOAD';
    };
  };
  if (o === '*') {
    if ((Number(x) * Number(y)) < 9999999999.0) {
      return (Number(x) * 10) * (Number(y) * 10) / 100;
    } else {
      return 'OVERLOAD';
    };
  };
  if (o === '/' && Number(y) !== 0) {
    if ((Number(x) / Number(y)) < 9999999999.0) {
      return Number(x) / Number(y);
    } else {
      return 'OVERLOAD';
    };
  };
};
percentage = () => {
p = Number(screen.textContent) / 100;
  if (p.toString().length > 11) {
    p = p.toString().substring(0,11);
  };
  screen.textContent = p;
  x = '';
  y = '';
  o = '';
  c = 1;
};
deleteLeft = () => {
  screen.textContent = screen.textContent.substring(0,screen.textContent.length-1);
};
clearAll = () => {
  screen.textContent = '';
  temp = '';	
  x = '';
  y = '';
  o = '';
  c = 0;
  tempOp = '';
};