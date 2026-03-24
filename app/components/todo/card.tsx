"use client";
import { SquarePen, Trash2 } from "lucide-react";
import { TodoCardType, ActionState } from "../../lib/definitions";
import { Dispatch, SetStateAction } from "react";


export default function TodoCard(
    {
        card,
        edit,
        remove
    }: {
        card: TodoCardType,
        edit: ()=>void,
        remove: ()=>void,
    }) {

    const statuses = {
        "P": {
            "title": "Pendente",
            "class": "badge-warning"
        },
        "D": {
            "title": "Em andamento",
            "class": "badge-info"
        },
        "F": {
            "title": "Completado",
            "class": "badge-success"
        },
        "C": {
            "title": "Cancelado",
            "class": "badge-neutral"
        }
    }

    return (
        <div className="card bg-base-100 card-md shadow-xl m-1">
            <div className="card-body">
                <div className="card-title justify-between">
                    <h2>{card['title']}</h2>
                    <div>
                        <button className="p-2" onClick={edit}>
                            <SquarePen />
                        </button>
                        <button className="p-2" onClick={remove}>

                            <Trash2 />
                        </button>

                    </div>
                </div>
                <p>{card['content']}</p>
                <div className="divider"></div>
                <div className="justify-between card-actions">

                    <span>Data prevista: {new Date(card['expected_date']).toLocaleDateString() ??'Imprevisto'}</span>
                    <span>Status:<div className={`badge badge-soft ${statuses[card['status']].class}`}>{statuses[card['status']].title}</div></span>
                </div>
            </div >
        </div >
    )
}
