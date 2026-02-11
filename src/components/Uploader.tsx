import { InputEventHandler, useEffect, useRef, useState } from "react";
import Image from "next/image";
import React from "react";

type UploaderProps = {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  preview: string | null;
};

const Uploader = ({ handleChange, preview }: UploaderProps) => {
  const imageRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    if (imageRef.current !== null) {
      imageRef.current.click();
    }
  };

  return (
    <div>
      <div className="flex gap-2">
        <div className="  items-center flex text-center">
          <div onClick={handleClick} className="w-full bg-red-400">
            Section Image
            {preview && (
              <Image
                src={preview}
                alt="image"
                height={200}
                width={200}
                unoptimized
              />
            )}
          </div>

          <input
            type="file"
            ref={imageRef}
            name="section"
            onChange={handleChange}
            className={` hidden text-sm rounded-lg bg-neutral-secondary-medium focus:ring-2 focus:ring-brand focus:outline-none transition`}
          />
        </div>
      </div>
    </div>
  );
};

export default Uploader;
