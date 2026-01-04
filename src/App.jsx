import TodosCardManual from "./components/TodosCardManual";

export default function App() {
  return (
    <div>
      <h2>Experiment 1a — manual (10 components)</h2>

      <div className="cards">
        {Array.from({ length: 10 }).map((_, i) => (
          <TodosCardManual key={i} index={i + 1} />
        ))}
      </div>
    </div>
  );
}
