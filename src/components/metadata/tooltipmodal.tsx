import React from "react";

const tooltipmodal = ({
  handleClick,
}: {
  handleClick: (id: string) => void;
}) => {
  return (
    <div className="flex flex-col text-white bg-black border shadow-lg p-2 w-44">
      <button
        onClick={() => {
          (handleClick("part"), console.log("clicked part...."));
        }}
        className="px-3 py-2 text-sm text-left  hover:border  transition"
      >
        ➕ Add new Part
      </button>

      <button
        onClick={() => handleClick("section")}
        className="px-3 py-2 text-sm text-left  hover:border   transition"
      >
        📑 Add new Section
      </button>
    </div>
  );
};

export default tooltipmodal;
