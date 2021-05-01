

export class Usuario {

    public id: string;
    public username: string | null;
    public database: number | null;

    constructor(id: string) {
        this.id = id;
        this.username = null;
        this.database = null;
    }

}