import { Usuario } from './usuario';


export class UsuariosLista {

    private lista: Usuario[] = [];

    constructor() { }

    // Agregar un usuario
    public agregar(usuario: Usuario) {
        this.lista.push(usuario);
        console.log('🟢  Cliente conectado')
        return usuario
    }

    public actualizarNombre(id: string, username: string, database: number) {
        for (let usuario of this.lista) {
            if (usuario.id === id) {
                usuario.username = username;
                usuario.database = database;
                break;
            }
        }
    }

    // Obtener lista de usuarios
    public getLista() {
        return this.lista.filter(usuario => usuario.username !== null);
    }

    // Obtener un usuario
    public getUsuario(id: string) {
        return this.lista.find(usuario => usuario.id == id);
    }

    // Borrar Usuario
    public borrarUsuario(id: string) {
        const tempUsuario = this.getUsuario(id);
        this.lista = this.lista.filter(usuario => usuario.id !== id);
        return tempUsuario;
    }

    public verIdDeSocket(database: number) {
        for (let usuario of this.lista) {
            if (usuario.database === database) {
                return usuario.id
            }
        }
    }
}