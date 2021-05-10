import express, { Request, Response, Router } from 'express';
import { Repository } from 'typeorm';

export function createRouter<T>(repository: Repository<T>): Router {
   const router = express.Router();

   router.get( "/", async ( req, res ) => {
      const items = await repository.find();
      res.json(items);
   });

   router.get("/:id", async function(req: Request, res: Response) {
      const item = await repository.findOne(req.params.id);
      return res.send(item);
   });
   
   router.post('/', function(req, res){
      res.send('POST route on things.');
   });
   
   router.post("/many", async function(req: Request, res: Response) {
      const item = await repository.create(req.body);
      const results = await repository.save(item);
      return res.send(results);
   });
   
   router.put("/:id", async function(req: Request, res: Response) {
      const item = await repository.findOne(req.params.id);
      if (item) {
         repository.merge(item, req.body);
          const results = await repository.save(item);
          return res.send(results);
      }
   });
   
   router.delete("/:id", async function(req: Request, res: Response) {
      const results = await repository.delete(req.params.id);
      return res.send(results);
   });

   return router;
}