import express from 'express';

const app = express();
const port = process.env.SERVER_PORT;

app.listen(port, () => console.log(`Server active on port ${port}`));
