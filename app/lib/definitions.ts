export interface TodoCardType {
    id: number;
    title: string;
    content: string;
    status: "P" | "D" | "F" | "C";
    expected_date: string;
}

export interface TodoForm {
    data: TodoCardType,
    errors?: Partial<Record<keyof TodoCardType, string[]>>
}

export type ActionState =
  | { type: "edit"; todo: TodoCardType }
  | { type: "create" }
  | { type: "remove"; todo: TodoCardType }
  | null;