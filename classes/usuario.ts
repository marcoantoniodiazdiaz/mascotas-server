

export class Usuario {

    public id: string;
    public username: string | null;

    constructor(id: string) {
        this.id = id;
        this.username = null;
    }

}