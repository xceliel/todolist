'use client';
import { Search } from "lucide-react";
// import TodoList from "./list";

export default function TodoListWrapper() {
    return (
        <label className="input">
            <Search />
            <input type="text" className="grow" placeholder="index.php" />
        </label>
    )
}