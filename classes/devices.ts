export class Devices {

    public token: string;
    public user: string;
    public lat: number;
    public lon: number;

    constructor(token: string, user: string, lat: number, lon: number) {
        this.token = token;
        this.user = user;
        this.lat = lat;
        this.lon = lon;
    }
}