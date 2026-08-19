import { logger } from "@/lib/utils";
import { RootState } from "@/redux/store";
import { questionType } from "@/types/formtypes";
import { useSelector } from "react-redux";

export default function CardTemplate() {
  const data = useSelector((state: RootState) => state.metadata);
  const grouped = Object.groupBy(data, (user) => user.part);
  const final = Object.entries(grouped);

  const renderInput = (input: questionType) => {
    console.log(input, "input data...");
    const baseStyle =
      "w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-400 focus:outline-none transition bg-white/70 backdrop-blur-md shadow-sm";

    const labelStyle = "block text-sm font-medium text-gray-600 mt-2";

    switch (input.type) {
      case "textarea":
        return (
          <div key={input.id} className="col-span-2 w-full">
            <label className={labelStyle}>{input.question}</label>
            <textarea
              placeholder="Type here..."
              className={`${baseStyle} min-h-[120px] w-full resize-none`}
            />
          </div>
        );

      case "select":
        return (
          <div key={input.id}>
            <label className={labelStyle}>{input.question}</label>
            <select className={baseStyle}>
              <option value="">Select option</option>
              {input.options?.map((opt, i) => (
                <option key={opt?.id} value={opt.option}>
                  {opt.option}
                </option>
              ))}
            </select>
          </div>
        );

      case "range":
        return (
          <div className="flex flex-col gap-4">
            <label className={labelStyle}>{input.question}</label>
            <input
              type="range"
              min={0}
              max={100}
              className="w-full mt-4 accent-purple-500"
            />
          </div>
        );

      case "radio":
        return (
          <div key={input.id} className="col-span-2">
            <label className={labelStyle}>{input.question}</label>
            <div className="flex flex-wrap gap-4">
              {input.options?.map((opt) => (
                <label
                  key={opt.id}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border bg-white/70 backdrop-blur hover:bg-purple-50 cursor-pointer"
                >
                  <input type="radio" name={input.id} />
                  {opt.option}
                </label>
              ))}
            </div>
          </div>
        );

      case "checkbox":
        return (
          <div key={input.id} className="col-span-2">
            <label className={labelStyle}>{input.question}</label>
            <div className="flex flex-wrap gap-4">
              {input.options?.map((opt) => (
                <label
                  key={opt.id}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border bg-white/70 backdrop-blur hover:bg-pink-50 cursor-pointer"
                >
                  <input type="checkbox" />
                  {opt.option}
                </label>
              ))}
            </div>
          </div>
        );

      case "date":
        return (
          <div key={input.id}>
            <label className={labelStyle}>{input.question}</label>
            <input type="date" className={baseStyle} />
          </div>
        );

      default:
        return (
          <div key={input.id}>
            <label className={labelStyle}>{input.question}</label>
            <input
              type={input.type}
              placeholder="Enter here..."
              className={baseStyle}
            />
          </div>
        );
    }
  };
  return (
    <div className=" w-full bg-red-400">
      {" "}
      <h1 className="text-blue-500  font-bold text-3xl"> Card Template </h1>
      <div className="grid md:grid-cols-2 w-full  gap-6">
        {final.map((p) => {
          if (!p[1]) return
          const sorted = Object.groupBy(p[1], (u) => u.section);
          const sections = Object.entries(sorted);
          logger.log(sorted, "sorted dataaaaaaa", p)
          return (
            <div key={p[0]} className="bg-white w-full shadow rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4">Part {p[0]}</h2>

              {sections.map((s) => (
                <div key={s[0]} className="w-full">
                  <h3 className="font-semibold mb-3">Section {s[0]}</h3>

                  {s[1] && s[1].map((input) => (
                    <div
                      key={input.id}
                      className="flex w-full  flex-col space-y-4"
                    >
                      {renderInput(input)}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
