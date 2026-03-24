import { listTodos } from "./lib/data";
import TodoList from "./components/todo/list";
export default async function Home() {
  const list = await listTodos();

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center py-32 px-16 bg-white dark:bg-black sm:items-start">
        <h1 className="text-2xl font-bold">Todo List</h1>
        { list != undefined ?
          <TodoList allList={list} />
          : 
          <p>Não há tarefas para listar</p>
        }

      </main>
    </div>
  );
}
