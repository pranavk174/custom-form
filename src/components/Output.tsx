"use client";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import React, { useState } from "react";

import GlassTemplate from "./Formtemplates/Glasstemplate";
import GradientTemplate from "./Formtemplates/Gradienttemplate";
import PremiumForm from "./Formtemplates/Output";
import MinimalTemplate from "./Formtemplates/Minimal";
import CardTemplate from "./Formtemplates/Cardtemplate";

export default function Form() {
  const [formData, setFormData] = useState<any>({});
  const [rangeValue, setRangeValue] = useState(5);

  const data = useSelector((state: RootState) => state.metadata);

  const handleChange = (e: any) => {
    const { name, value, type, checked, files } = e.target;

    setFormData((prev: any) => ({
      ...prev,
      [name]:
        type === "checkbox" ? checked : type === "file" ? files[0] : value,
    }));
  };

  const grouped = Object.groupBy(data, (user) => user.part);
  const final = Object.entries(grouped);

  console.log(data, "data....");

  const temp = [
    {
      id: 1,
      name: "GlassTemplate",
      item: <GlassTemplate />,
    },
    {
      id: 2,
      name: "GradientTemplate",
      item: <GradientTemplate />,
    },
    {
      id: 3,
      name: "CardTemplate",
      item: <CardTemplate />,
    },
    {
      id: 4,
      name: "MinimalTemplate",
      item: <MinimalTemplate />,
    },
    {
      id: 5,
      name: "premium form",
      item: <PremiumForm />,
    },
  ];

  const [active, setActive] = useState(1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex justify-center flex-col items-center p-10">
      <select
        className="bg-red-400 max-w-[300px] py-3 w-full mb-1"
        onChange={(e) => setActive(Number(e.target.value))}
      >
        {temp.map((temp, i) => (
          <option key={temp.id} value={temp.id}>
            {temp.name}{" "}
          </option>
        ))}
      </select>

      {temp[active - 1].item}
    </div>
  );
}
