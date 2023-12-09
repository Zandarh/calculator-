const btn = document.querySelectorAll("button");
const operateDiv = document.querySelector(".firstPart");
const higherDisplay = document.querySelector(".upperDisplay");
higherDisplay.value = '0';

const lowerDisplay = document.querySelector(".lowerDisplay");


// calculator object
const calculator = {
    displayValue: '', //string to display everything on the user screen
    displayArray: [], // keeps track of the user inputs before and after each operator use
    result: null,
    displayString: ''
}


//Getting all buttons
btn.forEach((button) => {
    button.addEventListener("click", getValues);        
});

function getValues(e){
    const theValue = e.target.value;
    const targetName = e.target.name;

    //filtering the buttons by their saved names. Numbers for the digits
    if(targetName == "number"){
        if(theValue == '0' && calculator.displayValue == '')
            return;
        updateDisplayValue(theValue);
        calculator.displayArray = convertStringToArray(calculator.displayString);
        handleOperator(calculator.displayArray);
        displayToScreen();
    }

    // the operators
    else if(theValue == "x" || theValue == "+" || theValue == "-" || theValue =="/"){

        clearLowerScreen();
        updateScreenDisplayValue(theValue);

        calculator.displayString = calculator.displayValue;

        displayToScreen();
        
    }
    //delete button
    else if(targetName == 'delete'){
        deleteInput();
    }
    // reset button
    else if(targetName == 'reset'){
        resetCalculator();
    }
    else if(targetName == 'decimal'){
        inputDecimal(theValue)
    }
    else{
            equates();
    }
}

//Seperates the various numbers from the operators
function convertStringToArray(str){
    const arr = [];
    for(let i = 0; i <= str.length - 1; i++){
        if(str[i] == 'x' || str[i] == '-' || str[i] == '+' || str[i] == '/'){
            let temp = (str.slice(0, i));
            arr.push(temp);
            str = str.replace(temp, '');
            let operator = (str.slice(0, 1));
            arr.push(operator);
            str = str.replace(operator, '');
            i = 0;
        }
    }

    for (let i = 0; i <= str.length - 1; i++) {
        if(str[i] != 'x' || str[i] != '-' || str[i] != '+' || str[i] != '/'){
            arr.push(str.slice());
            break;
        }
    }
    return arr;
}


function add(firstVariable, secondVariable){
   return firstVariable + secondVariable;
}

function substract(firstVariable, secondVariable){
    return firstVariable - secondVariable;
}
function divide(firstVariable, secondVariable){
    return firstVariable / secondVariable;
}

function multiply(firstVariable, secondVariable){
    return firstVariable * secondVariable;
}

// Calculates using Bodmas

function bodmas(array){
    let result = '';
    for(let i = 1; i < array.length - 1; i++){
        if(array[i] == '/' || array[i] == 'x'){
            const operator = array[i];
            const firstOperand = parseFloat(array[i- 1]);
            const secondOperand = parseFloat(array[i + 1]);
            result = String(calculate(firstOperand, secondOperand, operator));
            array.splice(i-1, 3, result);
            i--;
        }
    }
    for(let i = 1; i < array.length - 1; i++) {
        
        if (array[i] == '+' || array[i] == '-'){
            const operator = array[i];
            const firstOperand = parseFloat(array[i- 1]);
            const secondOperand = parseFloat(array[i + 1]);
            result = String(calculate(firstOperand, secondOperand, operator));
            array.splice(i-1, 3, result);
            i--;
        }
    }
    return array;
}

// handles the use of the operators
function handleOperator(displayArray){
    let result = [];

    // Handles the calculation
    if(displayArray.length > 2){
        result = bodmas(displayArray);
        calculator.displayArray = result;
        result.join('');
        calculator.result = result;
        displayToLowerScreen();
    }

}

// Does the actual calculation
function calculate(firstOperand, secondOperand, operator){
     if(operator == "+"){

        answer = add(firstOperand, secondOperand);
        return answer;
    }
    else if(operator == "-"){
        answer = substract(firstOperand, secondOperand);
        return answer;
    }
    else if(operator == "x"){
        answer = multiply(firstOperand, secondOperand);
        return answer;
    }
    else{
        answer = divide(firstOperand, secondOperand);
        return answer;
    }
}

//Displays the users input the the screen
function displayToScreen(){
    higherDisplay.value = calculator.displayValue;
}
function addComma(string, dot){

    if(string.includes(dot))
        return string;
    let str;
    if(string.length === 4){
        str = string.slice(0, 1)
        str += ",";
        let newStr = string.slice(1);
        str += newStr;
        return str;
    }
    else if(string.length === 5){
        str = string.slice(0, 2)
        str += ",";
        let newStr = string.slice(2);
        str += newStr;
        return str;
    }
    else if(string.length === 6){
        str = string.slice(0, 3)
        str += ",";
        let newStr = string.slice(3);
        str += newStr;
        return str;
    }
    else if(string.length === 7){
        str = string.slice(0, 1)
        str += ",";
        let newStr = string.slice(1, 4);
        str += newStr;
        str += ",";
        newStr = string.slice(4);
        str += newStr;
        return str;
    }
    else if(string.length === 8){
        str = string.slice(0, 2)
        str += ",";
        let newStr = string.slice(1, 5);
        str += newStr;
        str += ",";
        newStr = string.slice(5);
        str += newStr;
        return str;
    }
    else if(string.length === 9){
        str = string.slice(0, 3)
        str += ",";
        let newStr = string.slice(1, 6);
        str += newStr;
        str += ",";
        newStr = string.slice(6);
        str += newStr;
        return str;
    }
    else if(string.length === 10){
        str = string.slice(0, 1)
        str += ",";
        let newStr = string.slice(1, 4);
        str += newStr;
        str += ",";
        newStr = string.slice(4, 7);
        str += newStr;
        str += ",";
        newStr = string.slice(7);
        str += newStr;
        return str;
    }
    else if(string.length === 11){
        str = string.slice(0, 2)
        str += ",";
        let newStr = string.slice(2, 5);
        str += newStr;
        str += ",";
        newStr = string.slice(5, 8);
        str += newStr;
        str += ",";
        newStr = string.slice(8);
        str += newStr;
        return str;
    }
    else{
        return string;
    }
}
function errorFunction(){
    const error = document.querySelector('.error');
    error.remove();
}

// Displas the calculation result on the lower screen
function displayToLowerScreen(){
    let commeredResult = addComma(calculator.result.join(), '.')
    if(commeredResult === 'In,nfin,ity'){
        const container = document.querySelector('.container');
        const div = document.createElement('div');
        div.textContent = "Impossible calculation";
        div.setAttribute("class", "error");
        container.insertBefore(div, container.lastElementChild);
        resetCalculator();
        setTimeout(errorFunction, 3000);

    }
    else if (!Number.isInteger(commeredResult)){
        let temp = parseFloat(commeredResult);
        temp = temp.toFixed(9);
        commeredResult = String(temp);
        calculator.displayArray = commeredResult;
        lowerDisplay.value = commeredResult;
    }
    else{
        lowerDisplay.value = commeredResult
    }
    
}

// updates the user entry as it comes in
function updateDisplayValue(theValue){
        calculator.displayValue = calculator.displayValue + theValue;
        calculator.displayString = calculator.displayValue;

}

// Makes sure the operators are also displayed
function updateScreenDisplayValue(theValue){
    if(calculator.displayValue == ''){
        return;
    }else if(calculator.displayValue.length > 1){
        calculator.displayValue = calculator.displayValue + theValue;
        


        let array = calculator.displayValue.split('');

        if((isNaN(parseFloat(array[array.length-1]))) && (isNaN(parseFloat(array[array.length-2])))){
            array.splice(-2, 1);
            calculator.displayValue = array.join('');
        }
        calculator.operatorChecker = true;

    }
    else{
        calculator.displayValue = calculator.displayValue + theValue;
        calculator.operatorChecker = true;
    }
}

//resets the calculator
function resetCalculator(){
    calculator.displayValue = '';
    calculator.displayArray = [];
    calculator.operatorPresent = false;
    calculator.result = null;
    higherDisplay.value = '0';
    lowerDisplay.value = '';
}
// clears the lower screen
function clearLowerScreen(){
    lowerDisplay.value = '';
}

function equates(){

    if(!calculator.result){
        displayToScreen();
        return;
    }
    calculator.displayValue= String(calculator.displayArray);
    clearLowerScreen();
    displayToScreen();
}

// deletes the last inputed digit. from both the input and the saved calculator object
function deleteInput(){

    //checking the string length
    if(calculator.displayValue == ''){
        higherDisplay.value = '0';
        return;
    }
    
    let array = calculator.displayValue.split('');
    let popped = array.pop();//removing the last character
    
    //is the character a number?
    if(!(isNaN(parseFloat(popped)))){
        calculator.displayArray.pop();
        console.log(calculator);
        
    }
    calculator.displayValue = array.join('');
    calculator.displayString = calculator.displayValue;
    calculator.displayArray = convertStringToArray(calculator.displayString);
    handleOperator(calculator.displayArray);
    displayToScreen();
    let theArray = calculator.displayArray;
    console.log(calculator);
    
    if((theArray[theArray.length- 1] == 'x') || (theArray[theArray.length- 1] == '-') || (theArray[theArray.length- 1] == '+') ||(theArray[theArray.length- 1] == '/')){
        clearLowerScreen();
    }


}
function inputDecimal(dot){
    
    if(!calculator.displayValue.includes(dot)){
        calculator.displayValue += dot;
        calculator.displayString = calculator.displayValue;
        displayToScreen();
        console.log(calculator);
    }
    else if((calculator.displayArray.length <= 2) && !calculator.displayValue.includes(dot)){
        calculator.displayValue += dot;
        calculator.displayString = calculator.displayValue;
        displayToScreen();
        console.log(calculator);
    }
}