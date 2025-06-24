import React from 'react';

const Tooltip = ({ iconClass, tooltipText }) => {
  return (
    <div className="">
      <i className={iconClass}></i>
      <span className="tooltip-text text-wrap ">{tooltipText}</span>
    </div>
  );
}

export default Tooltip;