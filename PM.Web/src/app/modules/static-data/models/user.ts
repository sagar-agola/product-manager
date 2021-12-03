export class User {
    id?: number;
    name?: string;
    role?: string;
    technology?: string;

    constructor(id: number, name: string, role: string, technology: string) {
        this.id = id;
        this.name = name;
        this.role = role;
        this.technology = technology;
    }
}
