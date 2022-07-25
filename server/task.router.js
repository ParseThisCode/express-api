import { Router } from "express";
import { readFile, writeFile } from "fs/promises";
import { join, resolve } from "path";

export const taskRouter = Router();
const file = join(resolve("store"), "tasks.json");

taskRouter
 .get("/", async(request, response) => {
  let raw = await readFile(file);
  let array = await JSON.parse(raw);
  
  response.json(array);
 })
 .post("/", async({body}, response) => {
  let raw = await readFile(file);
  let array = await JSON.parse(raw);
  
  array.push(body);
  
  array = await JSON.stringify(array);
  raw = await writeFile(file, array);
  
  response.json(body);
 })
 .get("/:id", async({params}, response) => {
  let raw = await readFile(file);
  let array = await JSON.parse(raw);
  
  array = array.filter(({id}) => id == params.id);
  
  array.length > 0
   ? response.json(array)
   : response.send(`no task by given id ${params.id}`);
 })
 .patch("/:id", async({params, body}, response) => {
  let raw = await readFile(file);
  let array = await JSON.parse(raw);
  
  let id = array.findIndex(({id}) => id == params.id);
  array[id] = body;
  
  array = await JSON.stringify(array);
  raw = await writeFile(file, array);
  
  id >= 0 
   ? response.json(body)
   : response.send(`no task by given id ${params.id}`);
 })
 .delete("/:id", async({params}, response) => {
  let raw = await readFile(file);
  let array = await JSON.parse(raw);
  
  let id = array.findIndex(({id}) => id == params.id);
  array = array.filter(({id}) => id != params.id);
  
  array = await JSON.stringify(array);
  raw = await writeFile(file, array);
  
  id >= 0
   ? response.json(`task id ${params.id} deleted`)
   : response.send(`no task by given id ${params.id}`);
 })