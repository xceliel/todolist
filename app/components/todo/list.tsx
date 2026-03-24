'use client';
import { useState, useEffect } from "react";
import { TodoCardType, ActionState } from "../../lib/definitions";
import TodoCard from "./card";
import TodoEdit from "./form";
import RemoveTodo from "./confirm";
import { Search } from "lucide-react";
import { searchTodos } from "@/app/lib/data";

const emptyTodo: TodoCardType = {
    "id": 0,
    "title": "",
    "content": "",
    "expected_date": new Date().toISOString(),
    "status": "P"
}

export default function TodoList({ allList }: { allList: TodoCardType[] }) {
    const [action, setAction] = useState<ActionState | null>(null);
    const [list, setList] = useState<TodoCardType[]>(allList);
    const [search, setSearch] = useState<string>("");

    useEffect(() => {
        if (!search.trim()) {
            setList(allList);
            return;
        }

        const timer = setTimeout(async () => {
            const result = await searchTodos(search);
            setList(result);
        }, 400);

        return () => clearTimeout(timer);
    }, [search, allList]);

    return (
        <>
            <div className="w-full flex justify-end">
                <button
                    className="btn btn-success"
                    onClick={() => setAction({ "type": "create" })}
                >Criar Item</button>
                {
                    action?.type == "create" || action?.type == "edit" ?
                        <TodoEdit todo={action?.type == "edit" ? action.todo : emptyTodo} close={() => setAction(null)} />
                        : null
                }
                {
                    action?.type == "remove" &&
                    <RemoveTodo todo={action.todo} close={() => setAction(null)} />
                }
            </div>
            <label className="input w-full">
                <Search />
                <input
                    type="text"
                    className="grow"
                    placeholder="Procurar por tarefa"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </label>
            <div className="w-full">
                {list.map((card) =>
                    <TodoCard
                        key={card.id}
                        card={card}
                        edit={() => setAction({ "type": "edit", "todo": card })}
                        remove={() => setAction({ "type": "remove", "todo": card })}
                    />
                )}
            </div>
        </>
    )
}