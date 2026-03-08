"use client";
import { RootState } from "@/redux/store";
import React from "react";
import { useSelector } from "react-redux";

const Output = () => {
  const data = useSelector((state: RootState) => state.metadata);

  console.log(data, "data...................");
  return <div>pages</div>;
};

export default Output;
