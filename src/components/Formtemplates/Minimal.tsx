import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

export default function MinimalTemplate() {
  const data = useSelector((state: RootState) => state.metadata);
  const grouped = Object.groupBy(data, (user) => user.part);
  const final = Object.entries(grouped);

  return (
    <div className="max-w-3xl mx-auto mt-2">
      <h1 className="text-blue-500 font-bold text-3xl">Minimal Template </h1>
      {final.map((p: any) => {
        const sorted = Object.groupBy(p[1], (u: any) => u.section);
        const sections = Object.entries(sorted);

        return (
          <div key={p[0]} className="mb-10">
            <h2 className="text-2xl font-semibold border-b pb-2 mb-4">
              Part {p[0]}
            </h2>

            {sections.map((s: any) => (
              <div key={s[0]} className="mb-6">
                <h3 className="text-lg font-medium mb-4">Section {s[0]}</h3>

                {s[1].map((input: any) => (
                  <div key={input.id} className="mb-4">
                    <label className="block mb-1 text-sm">
                      {input.question}
                    </label>

                    <input
                      type={input.type}
                      className="w-full border p-2 rounded"
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}
