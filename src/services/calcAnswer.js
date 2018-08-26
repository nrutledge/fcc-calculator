import { checkOperator, getFormulaStart, getFormulaEnd, isNumber } from '../helpers';

export const calcAnswer = (formula, isAnswer) => {
    // Do not perform repeat calculations or all calculations on empty string
    if (isAnswer || !getFormulaEnd(formula)) { return };

    // Get clean formula without trailing operator, if one exists
    let lastElem = getFormulaEnd(formula);
    let secondLastElem = getFormulaStart(formula).slice(-1)[0];
    let cleanedFormula = [];

    if (isNumber(lastElem)) {
        // Keep entire formula
        cleanedFormula = formula;
    } else if (isNumber(secondLastElem)) {
        // Discard last element if not a number
        cleanedFormula = getFormulaStart(formula);
    } else {
        // Discard last two elements if not numbers.
        // Necessary for case where last element is empty
        // string and second last is operator
        cleanedFormula = getFormulaStart(formula).slice(0, -1);
    }

    // Convert to numbers for math calculations
    let numFormula = cleanedFormula.map((elem) => {
        return isNumber(elem) ? parseFloat(elem, 10) : elem;
    });

    // Multiplication/division before addition/subtraction
    const operations = [
        { 
            '*': (a, b) => a * b,
            '/': (a, b) => a / b
        }, {
            '+': (a, b) => a + b,
            '-': (a, b) => a - b
        }
    ];

    // Reduce formula array to single number element containing answer
    for (let ops of operations) {
        for (let i = 1; i < numFormula.length - 1; ) {
            const operator = checkOperator(numFormula[i]);
            
            if (ops[operator]) {
                const a = numFormula[i - 1];
                const b = numFormula[i + 1];

                numFormula = [
                    ...numFormula.slice(0, i - 1), 
                    ops[operator](a, b), 
                    ...numFormula.slice(i + 2)
                ];
            } else {
                i++;
            }
        }
    }

    // Limit decimal places and round away those floating point precision errors
    const precisionMultiplier = 10000000000;
    const answerString = (Math.round(numFormula[0] * precisionMultiplier) / precisionMultiplier).toString();

    return { 
        formula: [...formula, '=', answerString],
        isAnswer: true
    };
}