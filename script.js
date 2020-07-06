// DOM Elements: grab elements we want to manipulate.

const hourElement = document.querySelector('.hour');
const minuteElement = document.querySelector('.minute');
const displayElement = document.querySelector('.display');

const acElement = document.querySelector('.ac');
const pmElement = document.querySelector('.pm');
const percentElement = document.querySelector('.percent');

const additionElement = document.querySelector('.addition');
const multiplicationElement = document.querySelector('.multiplication');
const subtractionElement = document.querySelector('.subtraction');
const divisionElement = document.querySelector('.division');
const equalElement = document.querySelector('.equal');

const decimalElement = document.querySelector('.decimal');
const number0Element = document.querySelector('.number-0');
const number1Element = document.querySelector('.number-1');
const number2Element = document.querySelector('.number-2'); 
const number3Element = document.querySelector('.number-3');
const number4Element = document.querySelector('.number-4');
const number5Element = document.querySelector('.number-5');
const number6Element = document.querySelector('.number-6');
const number7Element = document.querySelector('.number-7');
const number8Element = document.querySelector('.number-8');
const number9Element = document.querySelector('.number-9');

const numberElementArray = [
  number0Element, number1Element, number2Element, number3Element, number4Element,
  number5Element, number6Element, number7Element, number8Element, number9Element
];
// put in an array because we are going to be using all numbers in a loop later on.

//Variables: created these variables so we can later use them to create chained operations.
let valueStringInMemory = null;
let operatorInMemory = null;



//functions:
const getValueAsString = () => {
    const currentDisplayString = displayElement.textContent;
    return currentDisplayString.split(',').join('');
}
/* 1) this function creates an array, everytime there is a commam it gets rid of the comma and split that up into different elements of the array.
   2) then it "joins" the elements of the array together and spits them all out in string form.
   3) could shorten it by writing:
   
   onst getValueAsString = () => displayElement.textContent.split(',').join(''); */

const getValueAsNumber = () => {
    return parseFloat(getValueAsString());
}
// this function changes a string into a number.

const setStringAsDisplay = (valueString) => {
    if(valueString[valueString.length - 1] === '.') {
      displayElement.textContent += '.';
      return;  
    }
const [wholeNumberString, decimalString] = valueString.split('.');

if (decimalString) {
    displayElement.textContent = parseFloat(wholeNumberString).toLocaleString() + '.' + decimalString;
} else {
    displayElement.textContent = parseFloat(wholeNumberString).toLocaleString();
}
displayElement.textContent = parseFloat(valueString).toLocaleString();
};


const handleNumberClick = (numString) => {
    const currentDisplayString = getValueAsString();
    if (currentDisplayString === '0') {
       setStringAsDisplay(numString);
    } else {
        setStringAsDisplay(currentDisplayString + numString);
    }
    
};

/* 1) when number clicked: IF the display is 0, replace it with the numString clicked. ELSE (if not 0), keep adding other clicked numbers to it AS A STRING (so they display one after the other 473t494, rather than being added mathematically) 
   2) we use parseFloat to change string into a number.
   3) we use toLocaleString method to put commas after every 1000th*/

   const getResultOfOperationAsString = () => {
    const currentDisplayNumber = getValueAsNumber();
    const valueNumberInMemory = parseFloat(valueStringInMemory);
    let newDisplayNumber;
    if (operatorInMemory === 'addition') {
        newDisplayNumber = valueNumberInMemory + currentDisplayNumber;
    } else if (operatorInMemory === 'subtraction') {
     newDisplayNumber = valueNumberInMemory - currentDisplayNumber;
    } else if (operatorInMemory === 'multiplication') {
     newDisplayNumber = valueNumberInMemory * currentDisplayNumber;
    } else if (operatorInMemory === 'division') {
     newDisplayNumber = valueNumberInMemory / currentDisplayNumber;
    }
 return newDisplayNumber.toString();
};
// this function calculates the result of the operations.
   

   const handleOperatorClick = (operation) => {
       const currentDisplayString = getValueAsString();
       if (!valueStringInMemory) {
           valueStringInMemory = currentDisplayString;
           operatorInMemory = operation;
           setStringAsDisplay('0');
           return;
       } 
       //first case is when we have nothing stored in the memory, hence the (!).
      
    valueStringInMemory = getResultOfOperationAsString();
    operatorInMemory = operation;
    setStringAsDisplay('0');
   };

//add Event Listeners to functions.

acElement.addEventListener('click', () => {
  setStringAsDisplay('0');
  valueStringInMemory = null;
  operatorInMemory = null;

});

// setting the value and operations back to RESET them.

pmElement.addEventListener('click', () => {
const currentDisplayNumber = getValueAsNumber();
const currentDisplayString = getValueAsString();

if (currentDisplayString === '-0') {
    setStringAsDisplay('0');
    return;
}
// if current display is -0, set display to 0.

if (currentDisplayNumber >= 0) {
    setStringAsDisplay('-' + currentDisplayString); 
} else {
    setStringAsDisplay(currentDisplayString.substring(1));
}
});

/* if currentDisplayNumber is smaller than 0, 
substring(1) gets rid of the first character in the string (which is the negative -). */

percentElement.addEventListener('click', () => {
  const currentDisplayNumber = getValueAsNumber();
  const newDisplayNumber = currentDisplayNumber / 100;
  setStringAsDisplay(newDisplayNumber.toString());
 });

// add Event Listeners to operators.

additionElement.addEventListener('click', () => {
  handleOperatorClick('addition');
});

subtractionElement.addEventListener('click', () => {
    handleOperatorClick('subtraction');
  });

  multiplicationElement.addEventListener('click', () => {
    handleOperatorClick('multiplication');
  });

  divisionElement.addEventListener('click', () => {
    handleOperatorClick('division');
  });

  equalElement.addEventListener('click', () => {
      if (valueStringInMemory){
        setStringAsDisplay(getResultOfOperationAsString());
        valueStringInMemory = null;
        operatorInMemory = null;

      }

  });
  //since all operators (except equal) do the same thing, we created a separate function for them which takes a parameter of 'operation'.

// Add Event Listeners to numbers and decimal

for (let i=0; i < numberElementArray.length; i++) {
    const numberElement = numberElementArray[i];
    numberElement.addEventListener('click', () => {
handleNumberClick(i.toString());
    });
}
// we add Event Listener, when a number is CLICKED, it is turned into a string.

decimalElement.addEventListener('click', () => {
    const currentDisplayString = getValueAsString();

    if (!currentDisplayString.includes('.')) {
        setStringAsDisplay(currentDisplayString + '.');
    }
});

// this functions tells oour program: if currentDisplayString doesn't already include (!) a decimal, then include one.

// Set up the time
const updateTime = () => {
    const currentTime = new Date();

    let currentHour = currentTime.getHours();
    // we used let, in case we want to change currentHour to 12 hr frame
    const currentMinute = currentTime.getMinutes();
    
    // if (currentHour > 12){
    //     currentHour -= 12;
    // }
    // // this if statement is optional, used when we want to show hours withing 12 hr frame than 24 hr.

    hourElement.textContent = currentHour.toString();
    minuteElement.textContent = currentMinute.toString().padStart(2, '0');
    }
setInterval(updateTime, 1000);
updateTime();

/* 1) we write a function to update the time.
   2) using the new Date() object assigned to currentTime to get current local time.
   3) using getHours() and getMinutes() methods to get current hour and minute respectively.
   4) Using textContent property to update our hour and minute every second (1000ms).
   5) using set interval for this function to run once every second (or 1000 ms).
   6) we also call the function at the beginning so that there isn't an empty screen in the 1s (1000 ms) interval.
   7) we use the method padStart(2, '0') to ensure the length of minutes is always 2, if not we pad it at the START with a 0. this is why we needed to change currentHour and currentMinute to a string.
   */








   /* IN FUTURE: 1) figure out how to make numbers reset after equal is pressed. 
So that if someone pressed 2 + 2 = 4, and the pressed another number, the display would clear and log that new number. 
                 2) figure out how to get font to reduce after 6 digits to fit a maximum of 9.
                 3) figure out how to make operators change colour and stay that colour until another number is pressed.*/