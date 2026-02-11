import React from "react";

const FieldPreview = ({ field }: any) => {
  const baseInputClass =
    "w-full border border-gray-300 rounded-lg px-4 py-3 bg-white text-gray-600 outline-none";

  switch (field.type) {
    case "text":
      return (
        <input disabled placeholder="Text field" className={baseInputClass} />
      );

    case "email":
      return (
        <input
          type="email"
          disabled
          placeholder="Email"
          className={baseInputClass}
        />
      );

    case "password":
      return (
        <input
          type="password"
          disabled
          placeholder="Password"
          className={baseInputClass}
        />
      );

    case "number":
      return (
        <input
          type="number"
          disabled
          placeholder="Number"
          className={baseInputClass}
        />
      );

    case "tel":
      return (
        <input
          type="tel"
          disabled
          placeholder="Phone number"
          className={baseInputClass}
        />
      );

    case "url":
      return (
        <input
          type="url"
          disabled
          placeholder="Website URL"
          className={baseInputClass}
        />
      );

    case "date":
      return <input type="date" disabled className={baseInputClass} />;

    case "file":
      return <input type="file" disabled className={baseInputClass} />;

    case "range":
      return <input type="range" disabled className="w-full" />;

    case "textarea":
      return (
        <textarea
          disabled
          placeholder="Textarea"
          className={`${baseInputClass} h-24 resize-none`}
        />
      );

    case "select":
      return (
        <select disabled className={baseInputClass}>
          <option>Select option</option>
          <option>Option 1</option>
          <option>Option 2</option>
        </select>
      );

    case "radio":
      return (
        <div className="flex flex-col gap-2">
          <label className="flex gap-2">
            <input disabled type="radio" name="radio" />
            Option 1
          </label>
          <label className="flex gap-2">
            <input disabled type="radio" name="radio" />
            Option 2
          </label>
        </div>
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
