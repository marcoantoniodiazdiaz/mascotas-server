import { Devices } from './devices';
export class DevicesLista {

    private lista: Devices[] = [];

    constructor() { }

    recibiLocalizacion(token: string, lat: number, lon: number, user: string) {
        const device = this.lista.find((e) => e.token === token);

        if (!device) {
            console.log("El dispositivo no existe en la lista");
            const nuevoDevice = new Devices(token, user, lat, lon);
            this.lista.push(nuevoDevice);
        } else {
            device.lat = lat;
            device.lon = lon;
        }


    }


}