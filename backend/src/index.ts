import express from 'express'
import { User } from './model/user/user.entity'
import { createConnection } from "typeorm";
import { Request, Response } from "express"

const app = express();
const port = 8080;

createConnection().then((connection) => {
    const userRepository = connection.getRepository(User);

    // define a route handler for the default home page
    app.get( "/", async ( req, res ) => {
        const users = await userRepository.find();
        res.json(users);
        // res.send( "Hello world!" );
    } );

    // start the Express server
    app.listen( port, () => {
        // tslint:disable-next-line:no-console
        console.log( `server started at http://localhost:${ port }` );
    } );

    app.get("/users/:id", async function(req: Request, res: Response) {
        const results = await userRepository.findOne(req.params.id);
        return res.send(results);
    });

    app.post("/users", async function(req: Request, res: Response) {
        const user = await userRepository.create(req.body);
        const results = await userRepository.save(user);
        return res.send(results);
    });

    app.put("/users/:id", async function(req: Request, res: Response) {
        const user = await userRepository.findOne(req.params.id);
        if (user) {
            userRepository.merge(user, req.body);
            const results = await userRepository.save(user);
            return res.send(results);
        }
    });

    app.delete("/users/:id", async function(req: Request, res: Response) {
        const results = await userRepository.delete(req.params.id);
        return res.send(results);
    });

})
