import React from 'react';

const Action = (props) => (
   <div>
      <button
        className="big-button"
         onClick={props.handleDecision}
         disabled={props.hasOptions}
      >
         What should I do?
        </button>
      {props.decision && <p>You should do: {props.decision}</p>}
   </div>
)

export default Action;