"use client";
import { useActionState } from "react";
import { TodoCardType } from "../../lib/definitions";
import { removeTodo } from "@/app/lib/actions";

export default function RemoveTodo(
    {
        todo,
        close
    }: {
        todo: TodoCardType,
        close: () => void,
    })
    {
    const [, formAction] = useActionState(removeTodo, null);
        
    return (
        <>
            <dialog className="modal" open>
                <div className="modal-box">
                    <div className="flex justify-between">
                        <h3 className="font-bold text-lg">
                            Remover item
                        </h3>
                        <button className="btn btn-sm btn-circle btn-ghost" onClick={close}>✕</button>
                    </div>

                    <p>Realmente deseja remover tarefa "{todo['title']}" ?</p>
                    <p className="text-error">Essa ação não poderá ser desfeita</p>


                    <div className="flex gap-2 justify-end">
                        <button className="btn btn-error" onClick={close}>Cancelar</button>
                        <form action={formAction}>
                            <input type="hidden" name="id" defaultValue={todo['id']} />
                            <button className="btn btn-success" type="submit">Remover</button>
                        </form>
                        
                    </div>

                </div>
            </dialog>
        </>
    )
}