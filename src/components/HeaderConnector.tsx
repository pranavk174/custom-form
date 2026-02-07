"use client";
import { RootState } from "@/redux/store";
import React, { SyntheticEvent, useEffect, useRef, useState } from "react";
import { UseSelector, useDispatch, useSelector } from "react-redux";
import Tooltipmodal from "./metadata/tooltipmodal";
import { editPart, editSection } from "@/redux/Slices/headerconnect";
const HeaderConnector = ({ field }: any) => {
  // const sections = useSelector((state: RootState) => state.metadata);

  const dispatch = useDispatch();
  const [clicked, setClicked] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [newSection, setNewSection] = useState<boolean>(false);
  const [newPart, setNewPart] = useState<boolean>(false);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setClicked(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const data = useSelector((state: RootState) => state.metadata);

  console.log(data, "data....======");
  const handleClik = (d: string) => {
    if (d === "section") {
      setNewSection(true);
      setClicked(false);
    } else if (d === "part") {
      setNewPart(true);
      setNewSection(true);
      setClicked(false);
    }
  };

  return (
    <div className="relative">
      {(field.part === null || "") && (
        <button
          className="bg-red-400 text-[20px]"
          onClick={() => setClicked((e) => !e)}
        >
          +
        </button>
      )}
      {clicked && (
        <div className="absolute">
          <Tooltipmodal handleClick={handleClik} />
        </div>
      )}
      {(field.part !== null || "") && (
        <div ref={modalRef}>
          <div>
            <label
              htmlFor="visitors"
              className="block mb-2.5 text-sm font-medium text-heading"
            >
              New Part
            </label>
            <input
              type="text"
              id="visitors"
              name="part"
              onChange={(e) => {
                dispatch(editPart({ part: e.target.value, id: field.id }));
              }}
              value={field.part}
              className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-2.5 py-2 shadow-xs placeholder:text-body"
              placeholder=""
              required
            />
          </div>
        </div>
      )}
      {(field.section !== null || " ") && (
        <div ref={modalRef}>
          <label
            htmlFor="visitors"
            className="block mb-2.5 text-sm font-medium text-heading"
          >
            New Section
          </label>
          <input
            type="text"
            name="section"
            onChange={(e) => {
              dispatch(editSection({ section: e.target.value, id: field.id }));
            }}
            value={field.section}
            id="visitors"
            className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-2.5 py-2 shadow-xs placeholder:text-body"
            placeholder=""
            required
          />
        </div>
      )}
    </div>
  );
};

export default HeaderConnector;
