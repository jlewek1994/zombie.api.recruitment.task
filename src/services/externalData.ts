import * as request from "request-promise-native";
import * as lo from "lodash";
import config from "../config/config";

export class ExternalDataService {
    private zombieApi: string;
    private nbpApi: string;

    constructor () {
        this.zombieApi = config.zombies_api_url;
        this.nbpApi = config.nbp_api_url;
    }

    public async getItems (): Promise<any> {
        return new Promise((resolve, reject) => {
            request.get({
                uri: this.zombieApi 
            }).then(d => resolve(JSON.parse(d).items)).catch(e => reject(e));
        });
    }

    public async getCurrency (): Promise<any> {
        return new Promise((resolve, reject) => {
            request.get({
                uri: this.nbpApi 
            }).then(d => {
                d = JSON.parse(d);

                let rates = lo.filter(d[0].rates, o => 
                    o.code === 'PLN' ||
                    o.code === 'EUR' ||
                    o.code === 'USD'
                );

                resolve(rates)
            }).catch(e => reject(e));
        });
    }
}