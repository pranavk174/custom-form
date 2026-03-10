import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

export default function GradientTemplate() {
  const data = useSelector((state: RootState) => state.metadata);
  const grouped = Object.groupBy(data, (user) => user.part);
  const final = Object.entries(grouped);

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
    </div>
  );
}
