import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();

// const initializeExpress = () => {
app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
// app.get('/', (req, res) => {
//   res.status(200).json({
//     message: 'hello world',
//   });
// });

app.listen(3001, () => console.log('Server Up at 3000'));


