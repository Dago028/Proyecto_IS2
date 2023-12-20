
export interface ToDo {
    id: string;
    titulo: string;
}

export interface Columnas {
    id_estado: number;
    titulo: string;
    todos: ToDo [];
}
