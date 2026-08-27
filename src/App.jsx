// import { Routes, Route, NavLink, Navigate } from "react-router-dom";
// import TodosPage from "./pages/TodosPage.jsx";
// import AboutPage from "./pages/AboutPage.jsx";

// export default function App() {
//   return (
//     <div className="page">
//       <h2>Experiment 1b — manual</h2>
//       {/* NavLink выполняет навигацию и изменяет URL, тогда как маршрутизатор интерпретирует текущий путь и определяет, какой компонент должен быть отрисован. */}
//       <nav className="nav">
//         <NavLink to="/">/todos</NavLink>
//         <NavLink to="/about">/about</NavLink>
//       </nav>

//       {/* Компонент (TodosPage) — это описание / функция компонента, а не отрисованный элемент.

// JSX-элемент (<TodosPage />) — это конкретный экземпляр компонента, который React может смонтировать.при совпадении маршрута должен быть создан и отрисован конкретный экземпляр компонента */}
//       <Routes>
//         <Route path="/" element={<TodosPage />} />
//         <Route path="/about" element={<AboutPage />} />
//       </Routes>
//     </div>
//   );
// }

import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";

// ===================== EXP2 =====================
import Exp2 from "./experiments/exp2-synchronizacja/index-sync.jsx";

import Exp2RaceIndex from "./experiments/exp2-synchronizacja/race/index-race.jsx";
import Exp2Race from "./experiments/exp2-synchronizacja/race/exp2-race";
import Exp2RaceFixed from "./experiments/exp2-synchronizacja/race/exp2-race-fixed";

import Exp2BackIndex from "./experiments/exp2-synchronizacja/background/index-back.jsx";
import Exp2Back from "./experiments/exp2-synchronizacja/background/exp2-background.jsx";
import Exp2BackVisibility from "./experiments/exp2-synchronizacja/background/exp2-background-visibility.jsx";
import Exp2BackVisibilityDelayed from "./experiments/exp2-synchronizacja/background/exp2-background-visibility-delayed.jsx";
import Exp2BackVisibilityDelayedProblem from "./experiments/exp2-synchronizacja/background/exp2-background-visibility-delayed-problem.jsx";
import Exp2BackVisibilityDelayedPredictability from "./experiments/exp2-synchronizacja/background/exp2-background-visibility-delayed-predictability.jsx";

import Exp2ErrorsIndex from "./experiments/exp2-synchronizacja/errors/index-errors.jsx";
import Exp2Errors from "./experiments/exp2-synchronizacja/errors/exp2-errors";
import Exp2ErrorsFixed from "./experiments/exp2-synchronizacja/errors/exp2-errors-fixed";
import Exp2ErrorsLoading from "./experiments/exp2-synchronizacja/errors/exp2-errors-loading";

// ===================== EXP3 =====================
import Exp3 from "./experiments/exp3-aktualnosc/index-exp3.jsx";
import Exp3Baseline from "./experiments/exp3-aktualnosc/baseline.jsx";
import Exp3StaleTime from "./experiments/exp3-aktualnosc/3b-page-return.jsx";
import Exp3ReturnAfterBreak from "./experiments/exp3-aktualnosc/3c-tab-return.jsx";

// ===================== EXP4 =====================
import Exp4 from "./experiments/exp4-mutacje/index-exp4.jsx";

import Exp4AddIndex from "./experiments/exp4-mutacje/add/index-add.jsx";
import Exp4AddRefetch from "./experiments/exp4-mutacje/add/add-refetch.jsx";
import Exp4AddSetstate from "./experiments/exp4-mutacje/add/add-setstate.jsx";

import Exp4DeleteIndex from "./experiments/exp4-mutacje/delete/index-delete.jsx";
import Exp4DeleteRefetch from "./experiments/exp4-mutacje/delete/delete-refetch.jsx";
import Exp4DeleteSetstate from "./experiments/exp4-mutacje/delete/delete-setstate.jsx";

import Exp4SyncManual from "./experiments/exp4-mutacje/sync/sync-manual.jsx";

// ===================== EXP5 =====================

import Exp5Parametry from "./experiments/exp5-parametry/index-exp5";
import Exp5ParamChange from "./experiments/exp5-parametry/param-change";
import Exp5ParamFastChange from "./experiments/exp5-parametry/param-fast-change";
import Exp5ParamCache from "./experiments/exp5-parametry/param-cache";

// ===================== EXP6 =====================
import Exp6Koordynacja from "./experiments/exp6-koordynacja/index-exp6.jsx";
import Exp6RepresentationsIndex from "./experiments/exp6-koordynacja/representations/index-representations.jsx";
import Exp6WspoldzielenieIndex from "./experiments/exp6-koordynacja/shared/index-shared.jsx";
import Exp6AktualizacjaIndex from "./experiments/exp6-koordynacja/update/index-update.jsx";
import Exp6SharedProps from "./experiments/exp6-koordynacja/shared/shared-props.jsx";
import Exp6SharedContext from "./experiments/exp6-koordynacja/shared/shared-context.jsx";
import Exp6RepresentationsProps from "./experiments/exp6-koordynacja/representations/representations-props.jsx";
import Exp6RepresentationsContext from "./experiments/exp6-koordynacja/representations/representations-context.jsx";
import Exp6UpdateProps from "./experiments/exp6-koordynacja/update/update-props.jsx";
import Exp6UpdateContext from "./experiments/exp6-koordynacja/update/update-context.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      {/* ===== EXP2 ===== */}
      <Route path="/exp2" element={<Exp2 />} />

      <Route path="/exp2/race" element={<Exp2RaceIndex />} />
      <Route path="/exp2/race/base" element={<Exp2Race />} />
      <Route path="/exp2/race/fixed" element={<Exp2RaceFixed />} />

      <Route path="/exp2/background" element={<Exp2BackIndex />} />
      <Route path="/exp2/background/base" element={<Exp2Back />} />
      <Route
        path="/exp2/background/visibility"
        element={<Exp2BackVisibility />}
      />
      <Route
        path="/exp2/background/visibility-delayed"
        element={<Exp2BackVisibilityDelayed />}
      />
      <Route
        path="/exp2/background/visibility-delayed-problem"
        element={<Exp2BackVisibilityDelayedProblem />}
      />
      <Route
        path="/exp2/background/visibility-delayed-predictability"
        element={<Exp2BackVisibilityDelayedPredictability />}
      />

      <Route path="/exp2/errors" element={<Exp2ErrorsIndex />} />
      <Route path="/exp2/errors/base" element={<Exp2Errors />} />
      <Route path="/exp2/errors/fixed" element={<Exp2ErrorsFixed />} />
      <Route path="/exp2/errors/loading" element={<Exp2ErrorsLoading />} />

      {/* ===== EXP3 ===== */}
      <Route path="/exp3" element={<Exp3 />} />

      {/* 3a */}
      <Route path="/exp3/baseline" element={<Exp3Baseline />} />

      {/* 3b */}
      <Route path="/exp3/page-return" element={<Exp3StaleTime />} />

      {/* 3c */}
      <Route
        path="/exp3/tab-return"
        element={<Exp3ReturnAfterBreak />}
      />

      {/* ===== EXP4 ===== */}
      <Route path="/exp4" element={<Exp4 />} />

      <Route path="/exp4/add" element={<Exp4AddIndex />} />
      <Route path="/exp4/add/refetch" element={<Exp4AddRefetch />} />
      <Route path="/exp4/add/setstate" element={<Exp4AddSetstate />} />

      <Route path="/exp4/delete" element={<Exp4DeleteIndex />} />
      <Route path="/exp4/delete/refetch" element={<Exp4DeleteRefetch />} />
      <Route path="/exp4/delete/setstate" element={<Exp4DeleteSetstate />} />

      <Route path="/exp4/sync" element={<Exp4SyncManual />} />

      
      {/* ===== EXP5 ===== */}

      <Route path="/exp5" element={<Exp5Parametry />} />
      <Route path="/exp5/param-change" element={<Exp5ParamChange />} />
      <Route path="/exp5/param-fast-change" element={<Exp5ParamFastChange />} />
      <Route path="/exp5/param-cache" element={<Exp5ParamCache />} />


    
      {/* ===== EXP6 ===== */}
      <Route path="/exp6" element={<Exp6Koordynacja />}/>

      <Route path="/exp6/shared" element={<Exp6WspoldzielenieIndex />}/>
      <Route path="/exp6/shared/shared-props" element={<Exp6SharedProps />}/>
      <Route path="/exp6/shared/shared-context" element={<Exp6SharedContext />}/>

      <Route path="/exp6/representations" element={<Exp6RepresentationsIndex />}/>
      <Route path="/exp6/representations/representations-props" element={<Exp6RepresentationsProps />}/>
      <Route path="/exp6/representations/representations-context" element={<Exp6RepresentationsContext />}/>

      <Route path="/exp6/update" element={<Exp6AktualizacjaIndex />}/>
      <Route path="/exp6/update/update-props" element={<Exp6UpdateProps />}/>
      <Route path="/exp6/update/update-context" element={<Exp6UpdateContext />}/>



      {/* placeholders */}

      <Route
        path="/exp1"
        element={<div className="exp-btn">Exp1 — позже</div>}
      />



      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
