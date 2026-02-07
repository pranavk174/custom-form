import React from "react";

const FieldPreview = ({ field }: any) => {
  switch (field.type) {
    case "text":
      return (
        <input
          disabled
          placeholder="Text field"
          className="border p-2 w-full"
        />
      );

    case "email":
      return (
        <input
          type="email"
          disabled
          placeholder="Email"
          className="border p-2 w-full"
        />
      );

    case "checkbox":
      return (
        <label className="flex gap-2">
          <input disabled type="checkbox" />
          Checkbox
        </label>
      );

    default:
      return null;
  }
};

export default FieldPreview;


