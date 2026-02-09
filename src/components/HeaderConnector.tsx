"use client";
import { RootState } from "@/redux/store";
import React, {
  SyntheticEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { UseSelector, useDispatch, useSelector } from "react-redux";
import Tooltipmodal from "./metadata/tooltipmodal";
import { editPart, editSection } from "@/redux/Slices/headerconnect";
import {
  deletePart,
  deleteSection,
  handleSetPart,
  handleSetSection,
} from "@/helpers/function";
const HeaderConnector = ({ field, index, previous }: any) => {
  const dispatch = useDispatch();
  const [clicked, setClicked] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [newSection, setNewSection] = useState<boolean>(false);
  const [newPart, setNewPart] = useState<boolean>(false);
  const data = useSelector((state: RootState) => state.metadata);

  const [metaData, setMetaData] = useState({
    section: field.section ?? data[index].section,
    part: field.part ?? data[index].part,
  });

  useEffect(() => {
    if (data[index]) {
      setMetaData({
        section: field.section ?? data[index].section,
        part: field.part ?? data[index].part,
      });
    }
  }, [
    data[index],
    data[index].part,
    data[index].section,
    field.section,
    field.part,
    index,
  ]);

  // Sync local state with Redux state

  console.log(
    metaData,
    "meta data",
    previous,
    "previous....",
    field,
    "field",
    data,
    "data==",
    data[index].part,
    "part",
    data[index].section,
    "section",
  );
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setClicked(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClik = (d: string) => {
    if (d === "part") {
      setNewPart(true);
      setNewSection(true); // Always set newSection true when adding new
      setClicked(false);
    } else if (d === "section") {
      setNewSection(true);
      setClicked(false);
    }
  };

  return (
    <div className="relative rounded-xl p-4 bg-neutral-secondary-soft shadow-sm space-y-4">
      {/* Add button */}
      {(index !== 0 || newSection || newPart) && (
        <button
          ref={buttonRef}
          onClick={() => setClicked((e) => !e)}
          className="w-9 h-9 flex mx-auto items-center justify-center rounded-lg bg-brand text-white text-xl hover:scale-105 transition"
        >
          +
        </button>
      )}

      {/* Tooltip */}
      {clicked && (
        <div
          ref={modalRef}
          className="absolute top-12 flex justify-center  w-full z-30"
        >
          <Tooltipmodal handleClick={handleClik} />
        </div>
      )}

      {/* Part input */}
      <div className="flex flex-col justify-center items-center gap-2">
        {(index === 0 || newPart) && (
          <div className="flex justify-center gap-2 w-full">
            <div className="  items-center flex text-center">
              <label className="text-sm w-full font-medium text-heading">
                {newPart ? " New Part" : "Part"}
              </label>
              <input
                type="text"
                onBlur={() => {
                  handleSetPart(data, field, dispatch, editPart, metaData.part);
                  setNewPart(false);
                  setNewSection(false);
                }}
                name="part"
                value={metaData.part}
                onChange={(e) =>
                  setMetaData((d) => ({ ...d, part: e.target.value }))
                }
                className={`w-full px-3 py-2 text-sm ${newPart ? "border border-default-medium text-start" : " text-center "} rounded-lg bg-neutral-secondary-medium focus:ring-2 focus:ring-brand focus:outline-none transition`}
              />
            </div>
            <button
              onClick={() => {
                (deletePart(data, field, dispatch, editPart),
                  setNewPart(false),
                  setNewSection(true));
              }}
              className="text-red-600"
            >
              X
            </button>
          </div>
        )}

        {/* Section input */}
        {(index === 0 ||
          newSection ||
          newPart ||
          (field.part === metaData.part &&
            previous.section !== metaData.section)) && (
          <div className="flex gap-2">
            <div className="  items-center flex text-center">
              <label className="text-sm w-full font-medium text-heading">
                {newSection ? "  New Section" : "Section "}
              </label>
              <input
                type="text"
                name="section"
                value={metaData.section}
                onChange={(e) =>
                  setMetaData((d) => ({ ...d, section: e.target.value }))
                }
                onBlur={() => {
                  console.log("on blur triggered.....");
                  handleSetSection(
                    data,
                    field,
                    dispatch,
                    editSection,
                    metaData.section,
                  );
                  setNewSection(false);
                }}
                className={`w-full px-3 py-2 text-sm ${newSection ? "border border-default-medium text-start" : "text-center "} rounded-lg bg-neutral-secondary-medium focus:ring-2 focus:ring-brand focus:outline-none transition`}
              />
            </div>
            <button
              onClick={() => {
                (deleteSection(data, field, dispatch, editSection),
                  setNewSection(false));
              }}
              className="text-red-600 "
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
