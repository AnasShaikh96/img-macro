import express from "express"
import mongoose from "mongoose"
import cookieParser from "cookie-parser"
import dotenv from 'dotenv'
import cors from "cors"
dotenv.config({
  path: './.env'
})

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors())

app.listen(process.env.PORT, () => console.log('Server is up at ' + process.env.PORT))

async function connectDb() {
  await mongoose.connect("mongodb://localhost:27017/img-macro")
    .then(() => console.log('DB is Connected')).catch((err) => console.log(err))
}

connectDb();


// ROUTES

import CompanyRoutes from "./routes/company.routes.js";
import { uploadMiddleware } from "./middlewares/multer.middleware.js"
import { generateTableCells } from "./utils/generateTableCells.js"
import { Document, Packer, Paragraph, Table, WidthType } from "docx"
import * as fs from "fs"
app.use('/api/v1', CompanyRoutes)


app.post('/upload', uploadMiddleware, (req, res) => {
  try {
    const files = req.files;
    const filenames = files.map((file) => file.originalname);

    res.status(200).json({
      message: 'added files successfully',
      data: filenames,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

app.get('/download', async (req, res) => {

  const session = req.query.session;

  if (!session) {
    res.status(500).json({
      message: 'Cannot find session'
    });
  }

  const filePath = `./src/tmp/uploads/${session}`;

  try {
    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph('Hello World'),
            new Table({
              rows: generateTableCells(filePath),
              width: {
                size: 5000,
                type: WidthType.DXA,
              },
            }),
          ],
        },
      ],
    });
    const b64string = await Packer.toBase64String(doc);

    res.send(Buffer.from(b64string, 'base64'));
  } catch (error) {
    console.log('yaha se error aara hai', error);
    res.status(500).json(error);
  }
});