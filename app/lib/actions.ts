'use server';
import postgres from 'postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { TodoParser, TodoScheme } from './schemes';
import { TodoCardType, TodoForm } from './definitions';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });


export async function createTodo(prevState: TodoForm, formData: FormData): Promise<TodoForm> {

    const validatedFields = TodoParser.safeParse({
        "id": formData.get("id"),
        "title": formData.get("title"),
        "content": formData.get("content"),
        "status": formData.get("status"),
        "expected_date": formData.get("expected_date")
    })

    if (!validatedFields.success) {
        return {
            data: {
                "id": parseInt(formData.get("id") as string, 10),
                "title": formData.get("title") as string,
                "content": formData.get("content") as string,
                "status": formData.get("status") as TodoCardType['status'],
                "expected_date": formData.get("expected_date") as string
            },
            errors: validatedFields.error.flatten().fieldErrors
        }
    }

    const { title, content, status, expected_date } = validatedFields.data

    const date = expected_date.toISOString().split('T')[0];
    try {
        await sql`
        INSERT INTO todos (title, content, status, expected_date)
        VALUES (${title}, ${content}, ${status}, ${date})
        `
    } catch (error) {
        console.error(error);
    }

    revalidatePath("/")
    redirect("/")
}

export async function editTodo(prevState: TodoForm, formData: FormData): Promise<TodoForm> {
    const validatedFields = TodoScheme.safeParse({
        "id": formData.get("id"),
        "title": formData.get("title"),
        "content": formData.get("content"),
        "status": formData.get("status"),
        "expected_date": formData.get("expected_date")
    })

    if (!validatedFields.success) {
        
        return {
            data: {
                "id": parseInt(formData.get("id") as string, 10),
                "title": formData.get("title") as string,
                "content": formData.get("content") as string,
                "status": formData.get("status") as TodoCardType['status'],
                "expected_date": formData.get("expected_date") as string
            },
            errors: validatedFields.error.flatten().fieldErrors
        }
    }

    const { id, title, content, status, expected_date } = validatedFields.data

    const date = expected_date.toISOString().split('T')[0];


    try {
        await sql`
        UPDATE 
            todos 
        SET 
            title = ${title}, 
            content = ${content}, 
            status = ${status},
            expected_date = ${date}
        WHERE id = ${id}
        `
    } catch (error) {
        console.error(error);
    }

    revalidatePath("/")
    redirect("/")
}

export async function actionTodo(prevState: TodoForm, formData: FormData) {
    const id = formData.get('id')
    if (id == '0') {
        return createTodo(prevState, formData)
    }
    else {
        return editTodo(prevState, formData)
    }

}

export async function removeTodo(prev:any, formDate:FormData) {
    const id = formDate.get("id") as string;
    try {
        await sql`
        DELETE FROM todos WHERE id = ${id}
        `
    } catch (error) {
        console.error(error);
    }

    revalidatePath("/")
    redirect("/")
}

