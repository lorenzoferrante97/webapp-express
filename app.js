import express from 'express';
import cors from 'cors';

const app = express();
const port = process.env.SERVER_PORT;

import router from './routers/movieRouter.js';
import imgPathMw from './middlewares/imagePath.js';

// cors
app.use(cors({ origin: process.env.FRONTEND_APP }));

//middlewares
app.use(express.static('public'));
app.use(express.json());
app.use(imgPathMw);

app.use('/movies', router);

app.listen(port, () => console.log(`Server active on port ${port}`));
