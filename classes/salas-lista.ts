import { Sala } from './sala';
import { Socket } from 'socket.io';


export class SalasLista {
    private lista: Sala[] = [];
    private usuariosEnSala: { sala: string, usuario: string }[] = [];

    public agregar(sala: Sala) {
        this.lista.push(sala);
        console.log(`🟣 Sala ${sala.id} de juego generada`)
        return sala;
    }

    public getLista() {
        return this.lista;
    }

    public getSala(id: string) {
        return this.lista.find(sala => {
            return sala.id == id
        });
    }

    public getCreator(id: string) {
        return this.lista.find(sala => sala.creator == id);
    }

    public cerrarSala(id: string) {
        const tempSala = this.getSala(id);
        this.lista = this.lista.filter(sala => sala.id != id);
        this.usuariosEnSala = this.usuariosEnSala.filter(sala => sala.sala != id);
        return tempSala;
    }

    public agregarASala(sala: string, usuario: string) {
        this.usuariosEnSala.push({
            sala: sala,
            usuario: usuario,
        });
    }

    public comprobarExistencia(sala: string) {
        for (let i of this.lista) {
            if (i.id === sala) {
                return true;
            }
        }

        return false;
    }

    public verUsuariosEnUnaSala(sala: string) {
        return this.usuariosEnSala.filter((e) => e.sala == sala);
    }

    public reeconectarASala(cliente: Socket) {
        const conexionesPasadas = this.usuariosEnSala.filter((e) => cliente.id == e.usuario);
        //Cerrando conexiones
        this.usuariosEnSala = this.usuariosEnSala.filter((e) => cliente.id != e.usuario);
        conexionesPasadas.forEach((e) => {
            this.agregarASala(e.sala, cliente.id);
            cliente.join(e.sala.toString());
            console.log(e.usuario + " reconectado exitosamente a " + e.sala);
        });

        // console.log(this.usuariosEnSala);
    }



}