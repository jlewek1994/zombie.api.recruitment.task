import { Request, Response, NextFunction, Router } from "express";

import { DbService } from "../services/db";
import { ItemsValueService } from "../services/itemsValue";

import e = require("express");
const router = Router();

const db = new DbService();
const itemsValue = new ItemsValueService();

router.post("/add/:zombieName", (req: Request, res: Response, next: NextFunction) => {
        if (!req.params.zombieName) {
            console.log('ERROR', e);
            res.status(300).json({msg: 'ERROR'});
        } else next();
}, 
(req: Request, res: Response) => {
        db.addZombie(req.params.zombieName).then(() => {
            res.status(200).json({msg: 'OK'});
        }).catch(e => {
            console.log('ERROR', e);
            res.status(300).json({msg: 'ERROR'});
        });
});

router.get("/list", (req: Request, res: Response) => {
    try {
        res.status(200).json(db.getZombiesList());
    } catch (e) {
        console.log('ERROR', e);
        res.status(300).json('ERROR');
    };
});

router.get("/details/:id", (req: Request, res: Response, next: NextFunction) => {
        if (!req.params.id) {
            console.log('ERROR', e);
            res.status(300).json({msg: 'ERROR'});
        } else next();
    }, (req: Request, res: Response) => {
        db.getZombie(parseInt(req.params.id)).then(data => {
            res.status(200).json(data);
        }).catch(e => {
            console.log('ERROR', e);
            res.status(300).json({msg: 'ERROR'});
        });
});

router.put('/update/:id', (req: Request, res: Response, next: NextFunction) => {
    if (!req.params.id || typeof req.body.name !== 'string') {
        console.log('ERROR', e);
        res.status(300).json({msg: 'ERROR'});
    } else next();
}, (req: Request, res: Response) => {
    db.updateZombie(parseInt(req.params.id), req.body.name).then(() => {
        res.status(200).json({msg: 'OK'});
    }).catch(e => {
        console.log('ERROR', e);
        res.status(300).json({msg: 'ERROR'});
    });
});

router.post('/addItem/:zombieId', (req: Request, res: Response, next: NextFunction) => {
    if (!req.params.zombieId || typeof req.body.itemId !== 'number') {
        console.log('ERROR', e);
        res.status(300).json({msg: 'ERROR'});
    } else next();
}, (req: Request, res: Response) => {
    db.addItem(parseInt(req.params.zombieId), req.body.itemId).then(() => {
        res.status(200).json({msg: 'OK'});
    }).catch((e) => {
        console.log('ERROR', e);
        res.status(300).json({msg: 'ERROR'});
    })
});

router.put('/deleteItem/:zombieId', (req: Request, res: Response, next: NextFunction) => {
    if (!req.params.zombieId || typeof req.body.id !== 'number') {
        console.log('ERROR', e);
        res.status(300).json({msg: 'ERROR'});
    } else next();
}, (req: Request, res: Response) => {
    db.deleteItem(parseInt(req.params.zombieId), req.body.id).then(() => {
        res.status(200).json({msg: 'OK'});
    }).catch((e) => {
        console.log('ERROR', e);
        res.status(300).json({msg: 'ERROR'});
    });
});

router.get('/totalPrice/:cur', (req: Request, res: Response, next: NextFunction) => {
    if (!req.params.cur) {
        console.log('ERROR', e);
        res.status(300).json({msg: 'ERROR'});
    } else next();
}, (req: Request, res: Response) => {
    itemsValue.currencyCalculate(req.params.cur).then(data => {
        res.status(200).json({total_price: data});
    }).catch((e) => {
        console.log('ERROR', e);
        res.status(300).json({msg: 'ERROR'});
    });
});


export { router };
