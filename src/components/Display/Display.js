import React from 'react';
import PropTypes from 'prop-types';
import { getFormulaStart, getFormulaEnd } from '../../helpers';
import './Display.css'

const Display = (props) => {
    const formulaEnd = getFormulaEnd(props.formula);

    // Get string of formulaStart array for rendering
    const formulaStart = getFormulaStart(props.formula).length > 0 ? 
        getFormulaStart(props.formula).join(' ') + ' ' : '';
    
    return (
        <div id={props.id} className="Display">
            <div style={{ minHeight: 20 }}>{props.isAnswer && formulaStart}</div>
            <div id='display' style={{ fontSize: 28 }}>
                {!props.isAnswer && formulaStart}{formulaEnd}
            </div>
        </div>
    );
}

Display.propTypes = {
    isAnswer: PropTypes.bool,
    formula: PropTypes.array
}

export default Display;