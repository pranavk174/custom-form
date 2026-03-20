import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

export default function GradientTemplate() {
  const data = useSelector((state: RootState) => state.metadata);
  const grouped = Object.groupBy(data, (user) => user.part);
  const final = Object.entries(grouped);

  const renderInput = (input: any) => {
    console.log(input, "input data...");
    const baseStyle =
      "w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-400 focus:outline-none transition bg-white/70 backdrop-blur-md shadow-sm";

    const labelStyle = "block text-sm font-medium text-gray-600 mb-2";

    switch (input.type) {
      case "textarea":
        return (
          <div key={input.id} className="col-span-2">
            <label className={labelStyle}>{input.question}</label>
            <textarea
              placeholder="Type here..."
              className={`${baseStyle} min-h-[120px] resize-none`}
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
          <div className="flex flex-col gap-2">
            <label>{input.question}</label>
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
              {input.options?.map((opt: string, i: number) => (
                <label
                  key={i}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border bg-white/70 backdrop-blur hover:bg-purple-50 cursor-pointer"
                >
                  <input type="radio" name={input.id} />
                  {opt}
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
              {input.options?.map((opt: string, i: number) => (
                <label
                  key={i}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border bg-white/70 backdrop-blur hover:bg-pink-50 cursor-pointer"
                >
                  <input type="checkbox" />
                  {opt}
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
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-pink-200 to-blue-200 p-10">
      <h1 className="text-blue-500 font-bold text-3xl">Gradient Template </h1>
      <div className="max-w-5xl mx-auto">
        {final.map((p: any) => {
          const sorted = Object.groupBy(p[1], (u: any) => u.section);
          const sections = Object.entries(sorted);

          return (
            <div key={p[0]} className="mb-12">
              <h2 className="text-3xl font-bold text-purple-700 mb-6">
                Part {p[0]}
              </h2>

              {sections.map((s: any) => (
                <div
                  key={s[0]}
                  className="bg-white rounded-2xl shadow-lg p-8 mb-6"
                >
                  <h3 className="text-xl font-semibold mb-6">Section {s[0]}</h3>

                  <div className="grid md:grid-cols-2 gap-6">
                    {s[1].map((input: any) => (
                      <div key={input.id} className="flex flex-col gap-2">
                        {renderInput(input)}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
