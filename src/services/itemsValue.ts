import * as lo from 'lodash';

import { ExternalDataService } from './externalData';
import { DbService } from './db';

export class ItemsValueService {
    private db;
    private externalData;

    constructor () {
        this.db = new DbService;
        this.externalData = new ExternalDataService;
    }

    public getTotalPriceOfItems() {
        const zombieItems = this.db.getAllZombieItemsIds();
        let totalPrice = 0;

        return new Promise((resolve, reject) => {
            this.externalData.getItems().then(itemsList => {
                zombieItems.forEach(itemId => {
                    const item = itemsList[lo.findIndex(itemsList, (o: any) => {
                        return o.id === itemId;
                    })];
                    totalPrice = totalPrice + item.price;
                });

                resolve(totalPrice);
            }).catch((e) => {
                reject(e);
            });
        });
    }

    public currencyCalculate(cur: string) {
        return new Promise((resolve, reject) => {
            this.externalData.getCurrency().then((currencyData: any) => {
                this.getTotalPriceOfItems().then((totalPrice: number) => {
                    const currencyInfo = currencyData[lo.findIndex(currencyData, (o: any) => {
                        return o.code === cur;
                    })];
                    
                    let finalPrice = cur === 'PLN' ? totalPrice : totalPrice * currencyInfo.ask;
                    resolve(finalPrice);
                }).catch(e => {
                    reject(e);
                });
            }).catch((e) => {
                reject(e);
            });
        });
    }
}