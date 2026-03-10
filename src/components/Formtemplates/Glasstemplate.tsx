import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

export default function GlassTemplate() {
  const data = useSelector((state: RootState) => state.metadata);
  const grouped = Object.groupBy(data, (user) => user.part);
  const final = Object.entries(grouped);

  return (
    <div className="max-w-4xl mx-auto bg-white/70 backdrop-blur-lg rounded-3xl p-10 shadow-xl">
      <h1 className="text-blue-500 font-bold text-3xl"> Glass Template </h1>
      {final.map((p: any) => {
        const sorted = Object.groupBy(p[1], (u: any) => u.section);
        const sections = Object.entries(sorted);

        return (
          <div key={p[0]} className="mb-10">
            <h2 className="text-3xl font-bold text-blue-600 mb-6">
              Part {p[0]}
            </h2>

            {sections.map((s: any) => (
              <div key={s[0]} className="bg-white rounded-xl shadow p-6 mb-6">
                <h3 className="text-xl font-semibold mb-4">Section {s[0]}</h3>

                <div className="grid md:grid-cols-2 gap-6">
                  {s[1].map((input: any) => (
                    <input
                      key={input.id}
                      type={input.type}
                      placeholder={input.question}
                      className="border p-3 rounded-lg"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}
