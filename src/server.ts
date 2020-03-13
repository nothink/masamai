import app from './app';
import './env';

const port = Number(process.env.NODE_KOA_LISTEN_PORT) || 3000;

app.listen(port);
// TODO: console出力周り(Docker前提)をどう配慮するか要検討
// console.log(`start koa server listening to ${port}`);
