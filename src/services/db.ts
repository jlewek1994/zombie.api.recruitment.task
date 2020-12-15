import * as lowDb from 'lowdb';
import * as FileAsync from 'lowdb/adapters/FileAsync';
import * as path from 'path';
import * as lo from 'lodash';
import item from '../interfaces/item';
import { ExternalDataService } from  './externalData';

export class DbService {
    db: lowDb.LowdbAsync<any>;

    private externalData;

    constructor () {
      this.initDatabase();
    }

    public async initDatabase () {
        const adapter = new FileAsync(path.resolve('data', 'db.json'));
        this.db = await lowDb(adapter);

        await this.db.defaults({zombies:[], counter: 1}).write();

        this.externalData = new ExternalDataService();
    }

    public getCounter() {
        const counter = parseInt(this.db.get('counter').value());
        this.db.set('counter', counter + 1).write();
        return this.db.get('counter').value();
    }

    public addZombie(zombieName: string) {
        const zombies = this.db.get('zombies').value();
        zombies.push({
          id: this.getCounter(),
          name: zombieName,
          items: new Array(),
          creationDate: new Date()
        });

        return this.db.update('zombies', zombies).write();
    }

    public getZombiesList() {
      const zombies = this.db.get('zombies').value();
      const zombiesList = lo.map(zombies, o =>  lo.omit(o, ['items', 'creationDate']));
      return zombiesList;
    }

    public getZombie(id: number) {
        let zombie = lo.filter(this.db.get('zombies').value(), o => o.id === id)[0];

        return new Promise((resolve, reject) => {
          this.externalData.getItems().then(itemsList => {
            zombie.items = lo.map(zombie.items, (o, i) => {
              o.id = i;
              o.price = lo.filter(itemsList, ilo => ilo.id === o.itemId);
              return o;
            });
            
            resolve(zombie);
          }).catch(e => reject(e));
        });
    }
    
    public deleteZombie(id: number): any {
        const zombies = this.db.get('zombies').value();
        const updater = zombies.splice(zombies.findIndex(o => o.id === id), 1)

        return this.db.update('zombies', updater).write();
    } 

    public updateZombie(id: number, zombieName: string) {
      const zombies = this.db.get('zombies').value();
      const updatingZombieIndex = zombies.findIndex(o => o.id === id);
      const updatingZombie = zombies[updatingZombieIndex];

      zombies[updatingZombieIndex] = {
          id: updatingZombie.id, 
          name: zombieName,
          items: updatingZombie.items,
          date: new Date()
      };

      return this.db.update('zombies', zombies).write();
    }

    public addItem(zombieId: number, itemId: number) {
      const zombies = this.db.get('zombies').value();
      const updatingZombieIndex = zombies.findIndex(o => o.id === zombieId);
      const updatingZombie = zombies[updatingZombieIndex];

      return new Promise((resolve, reject) => {
        this.externalData.getItems().then((itemList: Array<item>) => {
          const neededItemIndex = itemList.findIndex(o => o.id === itemId);
          let neededItem = itemList[neededItemIndex];

          neededItem.itemId = neededItem.id;
          delete neededItem.id;
          delete neededItem.price;

          if (updatingZombie.items.length < 5) {
            if(neededItem) {
              zombies[updatingZombieIndex].items.push(neededItem);
              this.db.update('zombies', zombies).write().
                then(d => resolve(d)).
                catch(e => reject(e));
            } else {
              reject('ITEM_NOT_EXIST');
            }
          } else {
            reject('MAX_ITEMS')
          }
        }).catch((e) => {
          reject(e);
        });
      });
    }
    
    public deleteItem(zombieId: number, itemId: number,) {
      const zombies = this.db.get('zombies').value();
      const zombieIndex = zombies.findIndex(o => o.id === zombieId);
      const updater = zombies[zombieIndex].items.splice(itemId, 1)

      return this.db.update('zombies', updater).write();
    }

    public getAllZombieItemsIds() {
      const zombies = this.db.get('zombies').value();
      const itemsIds = new Array();
      
      zombies.forEach(zombie => {
        zombie.items.forEach(item => {
          itemsIds.push(item.itemId);
        })
      });

      return itemsIds;
    }
}