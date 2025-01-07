import express from "express";
import cors from "cors"
import {PORT} from "./config.js"

import indexRouter from './routes/index.routes.js'
import tasksRouter from './routes/tasks.routes.js'

const app = express();

app.use(cors());
app.use(express.json());
app.use(indexRouter);
app.use(tasksRouter);

app.listen(PORT);
console.log('server en puerto', PORT);