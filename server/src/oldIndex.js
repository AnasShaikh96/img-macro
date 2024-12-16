const express = require('express');
const app = express();
const docx = require('docx');
const fs = require('fs');
const cors = require('cors');
const uploadMiddleware = require('./main');
const path = require('path');
const request = require('request');
const { generateTableCells } = require('./utils/generateTableCells');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const {
  Document,
  HorizontalPositionAlign,
  HorizontalPositionRelativeFrom,
  ImageRun,
  Media,
  Packer,
  Paragraph,
  VerticalPositionAlign,
  VerticalPositionRelativeFrom,
  Table,
  TableRow,
  TableCell,
  convertInchesToTwip,
  WidthType,
  BorderStyle,
  AlignmentType,
  VerticalAlign,
} = docx;

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

// const ImageCallback = () => {
//   const folderName = './tmp/uploads/';
//   let tempArr = [];

//   if (fs.existsSync(folderName)) {
//     fs.readdirSync(folderName).forEach((file) => {
//       const path = folderName + file;
//       console.log(path);

//       // const para = new Paragraph({
//       //   children: [
//       //     new ImageRun({
//       //       data: fs.readFileSync(path),
//       //       transformation: {
//       //         width: 200,
//       //         height: 200,
//       //       },
//       //       floating: {
//       //         horizontalPosition: {
//       //           offset: 1014400,
//       //         },
//       //         verticalPosition: {
//       //           offset: 1014400,
//       //         },
//       //       },
//       //     }),
//       //   ],
//       // });

//       const para = new ImageRun({
//         data: fs.readFileSync(path),
//         transformation: {
//           width: 400,
//           height: 400,
//         },
//       });

//       tempArr.push(para);
//     });
//   }


//   return tempArr;
// };

app.get('/download', async (req, res) => {

  const session = req.query.session;

  if (!session) {
    res.status(500).json({
      message: 'Cannot find session'
    });
  }

  const filePath = `./tmp/uploads/${session}`;

  try {
    // console.log('hii');

    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph('Hello World'),
            // new Paragraph({
            //   children: ImageCallback()
            // }),
            new Table({
              rows: generateTableCells(filePath),
              //  [
              //   new TableRow({
              //     children:
              //       [
              //         // new TableCell({
              //         //   children: [
              //         //     // new ImageRun({
              //         //     //   data: './tmp/uploads/cat.jpg',
              //         //     //   transformation: {
              //         //     //     width: 300,
              //         //     //     height: 300,
              //         //     //   },
              //         //     // }),

              //         //     new Paragraph('hello'),
              //         //   ],
              //         //   verticalAlign: VerticalAlign.CENTER,
              //         //   margins: {
              //         //     top: convertInchesToTwip(0.69),
              //         //     bottom: convertInchesToTwip(0.69),
              //         //     left: convertInchesToTwip(0.69),
              //         //     right: convertInchesToTwip(0.69),
              //         //   },
              //         //   borders: {
              //         //     top: {
              //         //       style: BorderStyle.SINGLE,
              //         //       size: 1,
              //         //       color: "000000",
              //         //     },
              //         //     bottom: {
              //         //       style: BorderStyle.SINGLE,
              //         //       size: 5,
              //         //       color: "000000",
              //         //     },
              //         //   }
              //         // }),
              //         new TableCell({
              //           children: [
              //             new Paragraph({
              //               children: [
              //                 new ImageRun({
              //                   data: fs.readFileSync('./cat.jpg'),
              //                   transformation: {
              //                     width: 100,
              //                     height: 100,
              //                   },
              //                 }),
              //               ],
              //             }),
              //             // new ImageRun({
              //             //   data: './tmp/uploads/cat.jpg',
              //             //   transformation: {
              //             //     width: 300,
              //             //     height: 300,
              //             //   },
              //             // }),

              //             new Paragraph('hello'),
              //           ],
              //           verticalAlign: VerticalAlign.CENTER,
              //           margins: {
              //             top: convertInchesToTwip(0.69),
              //             bottom: convertInchesToTwip(0.69),
              //             left: convertInchesToTwip(0.69),
              //             right: convertInchesToTwip(0.69),
              //           },
              //           borders: {
              //             top: {
              //               style: BorderStyle.SINGLE,
              //               size: 1,
              //               color: "000000",
              //             },
              //             bottom: {
              //               style: BorderStyle.SINGLE,
              //               size: 5,
              //               color: "000000",
              //             },
              //           },
              //           width: {
              //             size: 50,
              //             type: WidthType.PERCENTAGE
              //           }
              //         }),
              //         new TableCell({
              //           children: [
              //             new Paragraph({
              //               children: [
              //                 new ImageRun({
              //                   data: fs.readFileSync('./cat.jpg'),
              //                   transformation: {
              //                     width: 100,
              //                     height: 100,
              //                   },
              //                 }),
              //               ],
              //             }),
              //             new Paragraph('hello'),
              //           ],
              //           verticalAlign: VerticalAlign.CENTER,
              //           margins: {
              //             top: convertInchesToTwip(0.69),
              //             bottom: convertInchesToTwip(0.69),
              //             left: convertInchesToTwip(0.69),
              //             right: convertInchesToTwip(0.69),
              //           },
              //           borders: {
              //             top: {
              //               style: BorderStyle.SINGLE,
              //               size: 1,
              //               color: "000000",
              //             },
              //             bottom: {
              //               style: BorderStyle.SINGLE,
              //               size: 5,
              //               color: "000000",
              //             },
              //           },
              //           width: {
              //             size: 50,
              //             type: WidthType.PERCENTAGE
              //           }
              //         }),
              //       ],
              //   }),
              // ],
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

// https://stackoverflow.com/questions/12740659/downloading-images-with-node-js
// const download = (uri, filename, callback) => {
//   request.head(uri, (err, res, body) => {
//     request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
//   });
// };

// const URL =
//   'https://raw.githubusercontent.com/dolanmiu/docx/ccd655ef8be3828f2c4b1feb3517a905f98409d9/demo/images/cat.jpg';

// app.get('/', (req, res) => {
//   download(URL, 'cat.jpg', async () => {
//     const doc = new Document({
//       sections: [
//         {
//           children: [
//             new Paragraph('Hello World'),
//             new Paragraph({
//               children: [
//                 new ImageRun({
//                   data: fs.readFileSync('./cat.jpg'),
//                   transformation: {
//                     width: 100,
//                     height: 100,
//                   },
//                 }),
//               ],
//             }),
//             new Paragraph({
//               children: [
//                 new ImageRun({
//                   data: fs.readFileSync('./cat.jpg'),
//                   transformation: {
//                     width: 200,
//                     height: 200,
//                   },
//                   floating: {
//                     horizontalPosition: {
//                       offset: 1014400,
//                     },
//                     verticalPosition: {
//                       offset: 1014400,
//                     },
//                   },
//                 }),
//               ],
//             }),
//             new Paragraph({
//               children: [
//                 new ImageRun({
//                   data: fs.readFileSync('./cat.jpg'),
//                   transformation: {
//                     width: 200,
//                     height: 200,
//                   },
//                   floating: {
//                     horizontalPosition: {
//                       relative: HorizontalPositionRelativeFrom.PAGE,
//                       align: HorizontalPositionAlign.RIGHT,
//                     },
//                     verticalPosition: {
//                       relative: VerticalPositionRelativeFrom.PAGE,
//                       align: VerticalPositionAlign.BOTTOM,
//                     },
//                   },
//                 }),
//               ],
//             }),
//           ],
//         },
//       ],
//     });

//     const b64string = await Packer.toBase64String(doc);

//     res.setHeader('Content-Disposition', 'attachment; filename=My Document.docx');
//     res.send(Buffer.from(b64string, 'base64'));
//   });
// });

app.listen(3001, () => console.log('Server up at 3001'));
