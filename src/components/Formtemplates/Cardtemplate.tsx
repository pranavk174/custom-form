import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

export default function CardTemplate() {
  const data = useSelector((state: RootState) => state.metadata);
  const grouped = Object.groupBy(data, (user) => user.part);
  const final = Object.entries(grouped);

  return (
    <div>
      {" "}
      <h1 className="text-blue-500 font-bold text-3xl"> Card Template </h1>
      <div className="grid md:grid-cols-2 gap-6 p-10">
        {final.map((p: any) => {
          const sorted = Object.groupBy(p[1], (u: any) => u.section);
          const sections = Object.entries(sorted);

          return (
            <div key={p[0]} className="bg-white shadow rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4">Part {p[0]}</h2>

              {sections.map((s: any) => (
                <div key={s[0]}>
                  <h3 className="font-semibold mb-3">Section {s[0]}</h3>

                  {s[1].map((input: any) => (
                    <input
                      key={input.id}
                      type={input.type}
                      placeholder={input.question}
                      className="border w-full mb-3 p-2 rounded"
                    />
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
