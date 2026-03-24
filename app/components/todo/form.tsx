"use client";
import { useCallback, useState, useActionState, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import { TodoCardType, TodoForm } from "../../lib/definitions";
import { actionTodo } from "@/app/lib/actions";
import { CircleAlert } from "lucide-react";

export default function TodoEdit({ todo, close }: { todo: TodoCardType, close: () => void }) {

    const statuses = {
        "P": "select-warning",
        "D": "select-info",
        "F": "select-success",
        "C": "select-neutral"
    }


    const [form, setForm] = useState<TodoForm>({
        data: todo
    });


    const [state, formAction] = useActionState(actionTodo, form);
    const [date,setDate] = useState<Date | undefined>(new Date(todo.expected_date as string));

    const updateField = useCallback(
        <K extends keyof TodoCardType>(field: K, value: TodoCardType[K]) => {
            setForm((prev) => ({
                ...prev,
                data: {
                    ...prev.data,
                    [field]: value
                }
            }))
        }
        , [])


    return (
        <>
            <dialog className="modal" open>
                <div className="modal-box">
                    <div className="flex justify-between">
                        <h3 className="font-bold text-lg">
                            Editar item
                        </h3>
                        <button className="btn btn-sm btn-circle btn-ghost" onClick={close}>✕</button>
                    </div>

                    <form action={formAction} id="todo">
                    <input type="hidden" name="id" defaultValue={todo['id']}/>

                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Titulo</legend>
                        <input
                            name="title"
                            type="text"
                            placeholder="Titulo da tarefa"
                            className="input w-full"
                            value={form.data['title']}
                            onChange={
                                (e) => updateField('title', e.target.value)
                            }
                        />
                        <div className="label text-error">Obrigatório</div>
                    </fieldset>
                    {
                        state?.errors?.title?.map((error, index)=>
                        <div key={index} role="alert" className="alert alert-error">
                            <CircleAlert />
                            <span>{error}</span>
                        </div>
                        )
                    }



                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Descrição da tarefa</legend>
                        <textarea
                            className="textarea h-40 w-full resize-none"
                            placeholder="Descrição"
                            name="content"
                            value={form.data['content']}
                            onChange={
                                (e) => updateField('content', e.target.value)
                            }
                        ></textarea>
                        <div className="label">Opcional</div>
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Status</legend>
                        <select
                            name="status"
                            className={`select ${statuses[form.data['status']]
                                }`}
                            defaultValue={form.data['status']}
                            value={form.data['status']}
                            onChange={
                                (e) => updateField('status', e.target.value as TodoCardType['status'])
                            }
                        >
                            <option value="P">Pendente</option>
                            <option value="D">Em andamento</option>
                            <option value="F">Completado</option>
                            <option value="C">Cancelado</option>
                        </select>
                        <span className="label">Opcional</span>
                    </fieldset>

                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">Data Prevista</legend>
                        <button type="button" popoverTarget="rdp-popover" className="input input-border" style={{ anchorName: "--rdp" } as React.CSSProperties}>
                            {date ? date.toLocaleDateString() : "Selecione a Data prevista"}
                        </button>
                        <div popover="auto" id="rdp-popover" className="dropdown" style={{ positionAnchor: "--rdp" } as React.CSSProperties}>
                            <DayPicker
                                className="react-day-picker"
                                mode="single"
                                selected={date}
                                onSelect={
                                    (dd) => setDate(dd)
                                }
                            />
                        </div>
                        <input type="hidden" name="expected_date" value={date?.toISOString() || ""} />
                        <div className="label text-error">Obrigatório</div>

                    </fieldset>
                    {
                        state?.errors?.expected_date?.map((error, index)=>
                        <div key={index} role="alert" className="alert alert-error">
                            <CircleAlert />
                            <span>{error}</span>
                        </div>
                        )
                    }
                    </form>

                    <div className="flex gap-2 justify-end">
                        <button className="btn btn-error" onClick={close}>Cancelar</button>
                        <button className="btn btn-success" form="todo">Salvar</button>
                    </div>

                </div>
            </dialog>
        </>
    )
}