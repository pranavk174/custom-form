"use client";
import { RootState } from "@/redux/store";
import React, { SyntheticEvent, useEffect, useRef, useState } from "react";
import { UseSelector, useDispatch, useSelector } from "react-redux";
import Tooltipmodal from "./metadata/tooltipmodal";
import { editPart, editSection } from "@/redux/Slices/headerconnect";
import {
  deletePart,
  deleteSection,
  handleSetPart,
  handleSetSection,
} from "@/helpers/function";
const HeaderConnector = ({ field, index }: any) => {
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
    <div className="relative rounded-xl p-4 bg-neutral-secondary-soft shadow-sm space-y-4">
      {/* Add button */}
      {index !== 0 && (
        <button
          onClick={() => setClicked((e) => !e)}
          className="w-9 h-9 flex mx-auto items-center justify-center rounded-lg bg-brand text-white text-xl hover:scale-105 transition"
        >
          +
        </button>
      )}

      {/* Tooltip */}
      {clicked && (
        <div className="absolute top-12 left-0 z-10">
          <Tooltipmodal handleClick={handleClik} />
        </div>
      )}

      {/* Part input */}
      <div className="flex flex-col justify-center items-center gap-2">
        {(index === 0 || newPart) && (
          <div className="flex gap-2">
            <div ref={modalRef} className="space-y-1 text-center">
              <label className="text-sm font-medium text-heading">
                New Part
              </label>
              <input
                type="text"
                name="part"
                value={field.part}
                onChange={(e) =>
                  handleSetPart(data, field, dispatch, editPart, e.target.value)
                }
                className={`w-full px-3 py-2 text-sm ${newPart ? "border border-default-medium text-start" : " text-center "} rounded-lg bg-neutral-secondary-medium focus:ring-2 focus:ring-brand focus:outline-none transition`}
              />
            </div>
            <button
              onClick={() => {
                (deletePart(data, field, dispatch, editPart),
                  setNewPart(false));
              }}
              className="text-red-600 pt-[20px]"
            >
              X
            </button>
          </div>
        )}

        {/* Section input */}
        {(index === 0 || newSection || newPart) && (
          <div className="flex gap-2">
            <div ref={modalRef} className="space-y-1 text-center">
              <label className="text-sm font-medium text-heading">
                New Section
              </label>
              <input
                type="text"
                name="section"
                value={field.section}
                onChange={(e) =>
                  handleSetSection(
                    data,
                    field,
                    dispatch,
                    editSection,
                    e.target.value,
                  )
                }
                className={`w-full px-3 py-2 text-sm ${newSection ? "border border-default-medium text-start" : "text-center "} rounded-lg bg-neutral-secondary-medium focus:ring-2 focus:ring-brand focus:outline-none transition`}
              />
            </div>
            <button
              onClick={() => {
                (deleteSection(data, field, dispatch, editSection),
                  setNewSection(false));
              }}
              className="text-red-600 pt-[20px]"
            >
              X
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeaderConnector;
