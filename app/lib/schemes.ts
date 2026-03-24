import z from "zod";

export const TodoScheme = z.object({
    id: z.coerce.number(),
    title: z.string().min(1,"Por favor, informe um titulo"),
    content: z.string(),
    status: z.string(),
    expected_date: z.coerce.date("Por favor, informe uma data valida"),
})

export const TodoParser = TodoScheme.omit({
    id: true
})