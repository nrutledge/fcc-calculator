import React from 'react';

const styleOuter = {
    width: 340,
    height: 70,
    backgroundColor: '#555',
    color: '#FFF',
    textAlign: 'right',
    margin: 5,
    padding: 10
}

const Display = (props) => {
    const formulaStart = props.formulaStart.length > 0 ? props.formulaStart.join(' ') + ' ' : '';
    const formulaEnd = props.formulaEnd;
    const totalLength = formulaStart.length + formulaEnd.length;

    return (
        <div id={props.id} style={styleOuter}>
            <div style={{ minHeight: 20 }}>{props.isAnswer && formulaStart}</div>
            <div id='display' style={{ fontSize: 28 }}>
                {!props.isAnswer && formulaStart}{formulaEnd}
            </div>
        </div>
    );
}

export default Display;