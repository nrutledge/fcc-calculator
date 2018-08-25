import React from 'react';
import './Display.css'

const Display = (props) => {
    const formulaStart = props.formulaStart.length > 0 ? props.formulaStart.join(' ') + ' ' : '';
    const formulaEnd = props.formulaEnd;

    return (
        <div id={props.id} className="Display">
            <div style={{ minHeight: 20 }}>{props.isAnswer && formulaStart}</div>
            <div id='display' style={{ fontSize: 28 }}>
                {!props.isAnswer && formulaStart}{formulaEnd}
            </div>
        </div>
    );
}

export default Display;