const INITIAL_TODOS = [
  { id: 1, todoName: "PB4 — Zadanie 1" },
  { id: 2, todoName: "PB4 — Zadanie 2" },
  { id: 3, todoName: "PB4 — Zadanie 3" },
];

let todosDb = [...INITIAL_TODOS];
let requestCounter = 0;

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function resetFakeTodos() {
  todosDb = [...INITIAL_TODOS];
  requestCounter = 0;
  console.log("[PB4] fake DB reset");
}

export async function fakeFetchTodos({ delay = 600 } = {}) {
  const requestId = ++requestCounter;
  const startedAt = Date.now();

  console.log(`[PB4][GET] request #${requestId} START (delay=${delay}ms)`);

  await wait(delay);

  const fetchedAt = new Date().toISOString();
  const tookMs = Date.now() - startedAt;

  console.log(
    `[PB4][GET] request #${requestId} END (+${tookMs}ms) fetchedAt=${fetchedAt}`
  );

  return {
    requestId,
    fetchedAt,
    todos: [...todosDb],
  };
}

export async function fakeAddTodo(todoName, { delay = 600 } = {}) {
  const requestId = ++requestCounter;
  const startedAt = Date.now();

  console.log(`[PB4][POST] request #${requestId} START (delay=${delay}ms)`);

  await wait(delay);

  const newTodo = {
    id: Date.now(),
    todoName,
  };

  todosDb = [...todosDb, newTodo];

  const tookMs = Date.now() - startedAt;

  console.log(
    `[PB4][POST] request #${requestId} END (+${tookMs}ms) added id=${newTodo.id}`
  );

  return {
    requestId,
    todo: newTodo,
  };
}

export async function fakeDeleteTodo(id, { delay = 600 } = {}) {
  const requestId = ++requestCounter;
  const startedAt = Date.now();

  console.log(`[PB4][DELETE] request #${requestId} START (delay=${delay}ms)`);

  await wait(delay);

  todosDb = todosDb.filter((todo) => todo.id !== id);

  const tookMs = Date.now() - startedAt;

  console.log(
    `[PB4][DELETE] request #${requestId} END (+${tookMs}ms) deleted id=${id}`
  );

  return {
    requestId,
    deletedId: id,
  };
}