import { config } from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import routes from './routes';

config();
const app = express();
const port = process.env.PORT;

// configuraciones para recibir peticiones http en formato json
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// middlewares
app.use(morgan('dev'));
app.use(cors());

app.use('/', routes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
