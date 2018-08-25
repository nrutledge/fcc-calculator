import React, { Component } from 'react';
import './Calculator.css';
import Display from '../Display/Display';
import Button from '../Button/Button';

const symbols = {
    times: '\u00D7',
    divide: '\u00F7',
    plus: '+',
    minus: '-'
}

const checkOperator = (char) => {
    if (typeof char !== 'string') { char = char.toString() }
    const charCode = char.charCodeAt(0);

    if (char === symbols.times || charCode === 215) {  return '*'; }
    if (char === symbols.divide || charCode === 247) { return '/'; }
    if (char === symbols.plus) { return '+'; }
    if (char === symbols.minus) { return '-'; }

    return '';
};

const isNumber = (value) => {
    return !isNaN(value) && value !== ' ';
};


export default class Calculator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formula: ['0'],
            isAnswer: false
        }

        this.getFormulaStart = this.getFormulaStart.bind(this);
        this.getFormulaEnd = this.getFormulaEnd.bind(this);
        this.clear = this.clear.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleBackSpace = this.handleBackSpace.bind(this);
        this.addNumber = this.addNumber.bind(this);
        this.addDecimal = this.addDecimal.bind(this);
        this.addOperator = this.addOperator.bind(this);
        this.calcAnswer = this.calcAnswer.bind(this);
        this.reverseNumber = this.reverseNumber.bind(this);
    }

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown);
    }

    handleKeyDown(event) {
        const key = event.key;
        if (key === 'Enter' || key === '=') { this.calcAnswer(); } 

        if (isNumber(key)) { return this.addNumber(key); } 
        
        if (key === '.') { return this.addDecimal(); } 
        
        if (key === '*') { return this.addOperator(symbols.times); } 
 
        if (key === '/') { return this.addOperator(symbols.divide); } 

        if (key === '+') { return this.addOperator(symbols.plus); } 

        if (key === '-') { return this.addOperator(symbols.minus); } 

        if (key === 'Backspace') { return this.handleBackSpace(); } 
    
        if (key === 'Escape') { return this.clear(); }
    }

    // Returns array of start to second last position of formula
    getFormulaStart() {
        return this.state.formula.slice(0, -1);
    }

    // Returns string of last position in array
    getFormulaEnd() {
        return this.state.formula.slice(-1)[0];
    }

    addNumber(number) {
        const formulaStart = this.state.isAnswer ? [] : this.getFormulaStart();
        const formulaEnd = this.state.isAnswer ? '' : this.getFormulaEnd();
        let newFormula = [];

        if (typeof number !== 'string') { number = number.toString(); }

        if (formulaEnd === '0') {
            newFormula = [...formulaStart, number];
        } else if (checkOperator(formulaEnd)) {
            newFormula = [...formulaStart, formulaEnd, number];
        } else {
            newFormula = [...formulaStart, formulaEnd.concat(number)];
        }

        this.setState({ 
            formula: newFormula,
            isAnswer: false
        });       
    }

    addDecimal() {
        const formulaStart = this.state.isAnswer ? [] : this.getFormulaStart();
        const formulaEnd = this.state.isAnswer ? '0' 
            : this.getFormulaEnd().length > 0 ? this.getFormulaEnd() : '0'; 
        let newFormula = [];

        if (formulaEnd.indexOf('.') >= 0) { return; }

        if (checkOperator(formulaEnd)) {
            newFormula = [...formulaStart, formulaEnd, '0.'];
        } else {
            newFormula = [...formulaStart, formulaEnd.concat('.')]
        }

        this.setState({ 
            formula: newFormula,
            isAnswer: false
        });     
    }

    addOperator(operator) {
        const formulaStart = this.state.isAnswer ? [] : this.getFormulaStart();
        const formulaEnd = this.getFormulaEnd();
        let newFormula = [];

        if (checkOperator(formulaEnd)) {
            newFormula = [...formulaStart, operator];
        } else {
            newFormula = [...formulaStart, formulaEnd, operator];
        }

        this.setState({ 
            formula: newFormula,
            isAnswer: false
        });    
    }

    reverseNumber() {
        let formulaStart = this.state.isAnswer ? [] : this.getFormulaStart();
        let formulaEnd = this.getFormulaEnd();

        if (isNaN(formulaEnd)) { return; }

        this.setState({ 
            formula: [...formulaStart, (parseFloat(formulaEnd) * -1).toString()],
            isAnswer: false
        });          
    }

    handleBackSpace() {
        if (this.state.isAnswer) { return this.clear(); }

        const formulaEnd = this.getFormulaEnd();
        const numFormulaEnd = formulaEnd.length > 1 
            ? formulaEnd.substring(0, formulaEnd.length -1) 
            : this.getFormulaStart().length > 0 ? '' : '0';
        this.setState({ formula: [...this.getFormulaStart(), numFormulaEnd] });
    }

    calcAnswer() {
        // Do not perform repeat calculations or all calculations on empty string
        if (this.state.isAnswer || !this.getFormulaEnd()) { return };

        // Get clean formula without trailing operator, if one exists
        let lastElem = this.getFormulaEnd();
        let secondLastElem = this.getFormulaStart().slice(-1)[0];
        let formula = [];

        if (isNumber(lastElem)) {
            // Keep entire formula
            formula = this.state.formula;
        } else if (isNumber(secondLastElem)) {
            // Discard last element if not a number
            formula = this.getFormulaStart();
        } else {
            // Discard last two elements if not numbers.
            // Necessary for case where last element is empty
            // string and second last is operator
            formula = this.getFormulaStart().slice(0, -1);
        }

        let numFormula = formula.map((elem) => {
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
        const precisionMultiplier = 1000000000000;
        const answerString = (Math.round(numFormula[0] * precisionMultiplier) / precisionMultiplier).toString();

        this.setState({ 
            formula: [...formula, '=', answerString],
            isAnswer: true
        });
    }

    clear() {
        this.setState({ 
            formula: ['0'],
            isAnswer: false
        });
    }

    render() {
        const formulaStart = this.getFormulaStart();
        const formulaEnd = this.getFormulaEnd();

        return (
            <div className='Calculator'>
                <Display isAnswer={this.state.isAnswer} formulaStart={formulaStart} formulaEnd={formulaEnd}/>
                <div style={{ width: '100%', display: 'flex'}}>
                    <Button id='clear' value='AC' type='wide blue' action={this.clear} />              
                    <Button id='divide' value='&divide;' type='standard blue' action={this.addOperator} />
                    <Button id='multiply' value='&times;' type='standard blue' action={this.addOperator} />
                </div>
                <div style={{ width: '100%', display: 'flex' }}>
                    <Button id='one' value={1} type='standard' action={this.addNumber} />
                    <Button id='two' value={2} type='standard' action={this.addNumber} />
                    <Button id='three' value={3} type='standard' action={this.addNumber} />
                    <Button id='subtract' value='-' type='standard blue' action={this.addOperator} />
                </div>
                <div style={{ width: '100%', display: 'flex' }}>
                    <Button id='four' value={4} type='standard' action={this.addNumber} />
                    <Button id='five' value={5} type='standard' action={this.addNumber} />
                    <Button id='six' value={6} type='standard' action={this.addNumber} />
                    <Button id='add' value='+' type='standard blue' action={this.addOperator} />
                </div>
                <div style={{ width: '75%', display: 'flex', flexWrap: 'wrap' }}>
                    <Button id='seven' value={7} type='standard' action={this.addNumber} />
                    <Button id='eight' value={8} type='standard' action={this.addNumber} />
                    <Button id='nine' value={9} type='standard' action={this.addNumber} />
                    <Button id='reverse' value='&plusmn;' type='standard' action={this.reverseNumber} />  
                    <Button id='zero' value={0} type='standard' action={this.addNumber} />
                    <Button id='decimal' value={'.'} type='standard' action={this.addDecimal} />
                </div>
                <div style={{ width: '25%', display: 'flex' }}>
                    <Button id='equals' value='=' type='tall blue' action={this.calcAnswer} />               
                </div>
             </div>
        );
    }
}
