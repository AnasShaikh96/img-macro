const express = require('express');
const app = express()
const docx = require('docx')
const request = require('request');
const fs = require('fs');
const cors = require('cors');
const multer = require('multer');
const upload = multer()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
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
  VerticalAlign
} = docx;

app.post('/upload', upload.any(), async (req, res) => {

  const formFiles = req.files;

  if (!formFiles) {
    res.status(404).json({
      message: 'Error Files not present',
    })
  }

  if (formFiles.length === 0) {
    res.status(404).json({
      message: 'Error Files not present',
    })
  }

  const imageTableCell = async (arr) => {

    const tempArr = arr.map((curr, i) => console.log('hello', curr))

  }



  const doc = new Document({
    creator: "Dolan Miu",
    description: "My extremely interesting document",
    title: "My Document",
    compatibility: {
      // doNotBreakWrappedTables:true
    },
    sections: [
      {
        children: [
          new Paragraph({
            text: "Header title",
            // heading: HeadingLevel.TITLE,
            alignment: AlignmentType.CENTER,
            spacing: {
              after: 350
            },
          }),
          new Table({
            rows: [
              new TableRow({
                children: [
                  imageTableCell(formFiles),
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new ImageRun({
                            data: fs.readFileSync("./cat.jpg"),
                            transformation: {
                              width: 250,
                              height: 350
                            }
                          })
                        ]
                        ,
                        alignment: AlignmentType.CENTER
                      }),
                    ],

                    verticalAlign: VerticalAlign.CENTER,
                    margins: {
                      top: convertInchesToTwip(0.2),
                      bottom: convertInchesToTwip(0.2),
                      left: convertInchesToTwip(0.2),
                      right: convertInchesToTwip(0.2),
                    },
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new ImageRun({
                            data: fs.readFileSync("./cat.jpg"),
                            transformation: {
                              width: 250,
                              height: 350
                            }
                          })
                        ]
                        ,
                        alignment: docx.AlignmentType.CENTER
                      }),
                    ],
                    verticalAlign: docx.VerticalAlign.CENTER,
                    margins: {
                      top: convertInchesToTwip(0.2),
                      bottom: convertInchesToTwip(0.2),
                      left: convertInchesToTwip(0.2),
                      right: convertInchesToTwip(0.2),
                    },
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph("Hello")
                    ],
                  }),
                  new TableCell({
                    children: [
                      new Paragraph("Hello")
                    ],
                  }),
                ]
              })

            ],
            width: {
              size: 100,
              type: WidthType.PERCENTAGE,
            }
          })
        ],
        properties: {
          page: {
            margin: {
              top: convertInchesToTwip(0.3),
              bottom: convertInchesToTwip(0.3),
              right: convertInchesToTwip(0.5),
              left: convertInchesToTwip(0.5)
            },
            borders: {
              pageBorderLeft: {
                style: BorderStyle.THICK_THIN_MEDIUM_GAP,
                size: 30,
                color: "#000000",
                space: 500
              }
            }
          }
        }
      }
    ],
  });




  // res.status(200).json({
  //   message: 'API Succesful',
  //   data: formFiles
  // })

  // const b64string = await Packer.toBase64String(doc);

  // let filename = 'my-custom-filename.docx'
  // res.setHeader('Content-Disposition', 'attachment; filename=' + filename);
  // res.send(Buffer.from(b64string, 'base64'));
  // res.download(doc)


  const b64string = await Packer.toBase64String(doc);
    
  res.setHeader('Content-Disposition', 'attachment; filename=My Document.docx');
  res.send(Buffer.from(b64string, 'base64'));
  res.download(doc,'newfile')


})


app.get('/uploadFiles', async (req, res) => {
  const doc = new Document({
    creator: "Dolan Miu",
    description: "My extremely interesting document",
    title: "My Document",
    compatibility: {
      // doNotBreakWrappedTables:true
    },
    sections: [
      {
        children: [
          new Paragraph({
            text: "Header title",
            // heading: HeadingLevel.TITLE,
            alignment: AlignmentType.CENTER,
            spacing: {
              after: 350
            },
          }),
          new Table({
            rows: [



              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new ImageRun({
                            data: fs.readFileSync("./cat.jpg"),
                            transformation: {
                              width: 250,
                              height: 350
                            }
                          })
                        ]
                        ,
                        alignment: AlignmentType.CENTER
                      }),
                    ],

                    verticalAlign: VerticalAlign.CENTER,
                    margins: {
                      top: convertInchesToTwip(0.2),
                      bottom: convertInchesToTwip(0.2),
                      left: convertInchesToTwip(0.2),
                      right: convertInchesToTwip(0.2),
                    },
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new ImageRun({
                            data: fs.readFileSync("./cat.jpg"),
                            transformation: {
                              width: 250,
                              height: 350
                            }
                          })
                        ]
                        ,
                        alignment: docx.AlignmentType.CENTER
                      }),
                    ],
                    verticalAlign: docx.VerticalAlign.CENTER,
                    margins: {
                      top: convertInchesToTwip(0.2),
                      bottom: convertInchesToTwip(0.2),
                      left: convertInchesToTwip(0.2),
                      right: convertInchesToTwip(0.2),
                    },
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph("Hello")
                    ],
                  }),
                  new TableCell({
                    children: [
                      new Paragraph("Hello")
                    ],
                  }),
                ]
              })
            ],
            width: {
              size: 100,
              type: WidthType.PERCENTAGE,
            }
          })
        ],
        properties: {
          page: {
            margin: {
              top: convertInchesToTwip(0.3),
              bottom: convertInchesToTwip(0.3),
              right: convertInchesToTwip(0.5),
              left: convertInchesToTwip(0.5)
            },
            borders: {
              pageBorderLeft: {
                style: BorderStyle.THICK_THIN_MEDIUM_GAP,
                size: 30,
                color: "#000000",
                space: 500
              }
            }
          }
        }
      }
    ],
  });

  const b64string = await Packer.toBase64String(doc);

  res.setHeader('Content-Disposition', 'attachment; filename=MyDocument5.docx');
  res.send(Buffer.from(b64string, 'base64'));
  res.download(doc)

})

app.post("/upload", upload.single("file"), async (req, res) => {
  const chunk = req.file.buffer;
  const chunkNumber = Number(req.body.chunkNumber); // Sent from the client
  const totalChunks = Number(req.body.totalChunks); // Sent from the client
  const fileName = req.body.originalname;

  const chunkDir = __dirname + "/chunks"; // Directory to save chunks

  if (!fs.existsSync(chunkDir)) {
    fs.mkdirSync(chunkDir);
  }

  const chunkFilePath = `${chunkDir}/${fileName}.part_${chunkNumber}`;

  try {
    await fs.promises.writeFile(chunkFilePath, chunk);
    console.log(`Chunk ${chunkNumber}/${totalChunks} saved`);

    if (chunkNumber === totalChunks - 1) {
      // If this is the last chunk, merge all chunks into a single file
      await mergeChunks(fileName, totalChunks);
      console.log("File merged successfully");
    }

    res.status(200).json({ message: "Chunk uploaded successfully" });
  } catch (error) {
    console.error("Error saving chunk:", error);
    res.status(500).json({ error: "Error saving chunk" });
  }
});




app.listen(3000, () => console.log('Server up at 3000'))