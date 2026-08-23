import { TODOS } from "./db";


export function simulateFetchTodos({ isFailure, delay = 800 } = {}) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (isFailure) {
        reject(new Error("Błąd połączenia w symulacji"));
        return;
      }
      resolve(TODOS);
    }, delay);
  });
}


// exp2-Race
export function fakeFetchTodosRace(filter) {
  const delay = Math.random() * 2000 + 300; // 300–2300 ms

  let items = TODOS;
  if (filter === "active") {
    items = items.filter((item) => !item.completed);
  }

  if (filter === "completed") {
    items = items.filter((item) => item.completed);
  }

  // В научной логике ты сейчас делаешь:
  // Controlled experiment
  // (контролируемая среда вместо реального мира)
  // Ты исследуешь механизм синхронизации, а не качество API.
  // Формулировка (запомни, потом вставим в текст):
  // В эксперименте 2 используется симулированный асинхронный источник данных, позволяющий детерминированно управлять задержками и порядком ответов, что необходимо для анализа проблем синхронизации server-state.

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        filter,
        items,
        delay: Math.round(delay),
      });
    }, delay);
  });
}


//Exp3-aktualnosc;

let counter = 0;

/**
 * - counter: чтобы считать реальное число запросов/refetch
 * - fetchedAt: чтобы видеть "свежесть" данных
 * - delay: чтобы поведение было повторяемым
 */
export function fakeFetchNoFresh({ delay = 600 } = {}) {
  const requestId = ++counter;
  const startedAt = Date.now();

  console.log(`[PB3] request #${requestId} START (delay=${delay}ms)`);

  return new Promise((resolve) => {
    setTimeout(() => {
      const fetchedAt = new Date().toISOString();
      const tookMs = Date.now() - startedAt;

      console.log(`[PB3] request #${requestId} END (+${tookMs}ms) fetchedAt=${fetchedAt}`);

      resolve({
        requestId,
        fetchedAt,
        todos: TODOS,
      });
    }, delay);
  });
}


//Exp3-aktualnoscB-stale);

let counter1 = 0;

/**
 * PB3 fake fetch:
 * - counter1: чтобы считать реальное число запросов/refetch
 * - fetchedAt: чтобы видеть "свежесть" данных
 * - delay: чтобы поведение было повторяемым
 */
export function fakeFetchStale({ delay = 600 } = {}) {
  const requestId = ++counter1;
  const startedAt = Date.now();

  console.log(`[PB3] request #${requestId} START (delay=${delay}ms)`);

  return new Promise((resolve) => {
    setTimeout(() => {
      const fetchedAt = new Date().toISOString();
      const tookMs = Date.now() - startedAt;

      console.log(`[PB3] request #${requestId} END (+${tookMs}ms) fetchedAt=${fetchedAt}`);

      resolve({
        requestId,
        fetchedAt,
        todos: TODOS,
      });
    }, delay);
  });
}