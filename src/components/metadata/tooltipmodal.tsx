import React from "react";

const tooltipmodal = ({
  handleClick,
}: {
  handleClick: (id: string) => void;
}) => {
  return (
    <div>
      <button onClick={() => handleClick("part")}>Add new Part</button>
      <button onClick={() => handleClick("section")}>Add new Section</button>
    </div>
  );
};

export default tooltipmodal;
