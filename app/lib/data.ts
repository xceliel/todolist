'use server';
import postgres from 'postgres';
import { TodoCardType } from './definitions';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

interface DbTodoCardType extends Omit<TodoCardType, 'expected_date'> {
    expected_date: Date;
}

export async function listTodos() {

    try {
        const data =  await sql<DbTodoCardType[]>`
        SELECT * FROM todos
        `

        return data.map(todo =>({
            ...todo,
            'expected_date': todo.expected_date.toISOString()
        }))
    } catch(error){
        console.error(error);
        return [];
    }
}

export async function searchTodos(query:string) {

    try {
        const data = await sql<DbTodoCardType[]>`
        SELECT * FROM todos WHERE content like ${'%' + query + '%'}  or title like ${'%' + query + '%'} 
        `
        return data.map(todo =>({
            ...todo,
            'expected_date': todo.expected_date.toISOString()
        }))
    } catch(error){
        console.error(error);
        return [];

    }
}