const express = require('express');
const app = express()
const docx = require('docx')
const request = require('request');
const fs = require('fs');

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
  BorderStyle
} = docx;

// https://stackoverflow.com/questions/12740659/downloading-images-with-node-js
const download = (uri, filename, callback) => {
  request.head(uri, (err, res, body) => {
    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};

const URL = 'https://raw.githubusercontent.com/dolanmiu/docx/ccd655ef8be3828f2c4b1feb3517a905f98409d9/demo/images/cat.jpg';


app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.get('/', (req, res) => {
  res.json({
    hello: 'hii'
  })
})

app.get("/get", async (req, res) => {
  const doc = new Document({
    sections: [{
      properties: {},
      children: [
        new Paragraph({
          children: [
            new TextRun("Hello World"),
            new TextRun({
              text: "Foo Bar",
              bold: true,
            }),
            new TextRun({
              text: "\tGithub is the best",
              bold: true,
            }),
          ],
        }),
      ],
    }],
  });

  const b64string = await Packer.toBase64String(doc);

  res.setHeader('Content-Disposition', 'attachment; filename=MyDocument1.docx');
  res.send(Buffer.from(b64string, 'base64'));
  res.download(doc)


})

app.get("/img", async (req, res) => {
  download(URL, 'cat.jpg', async () => {
    const doc = new Document({
      sections: [{
        children: [
          new Paragraph("Hello World"),
          new Paragraph({
            children: [
              new ImageRun({
                data: fs.readFileSync("./cat.jpg"),
                transformation: {
                  width: 100,
                  height: 100,
                }
              }),
            ],
          }),
          new Paragraph({
            children: [
              new ImageRun({
                data: fs.readFileSync("./cat.jpg"),
                transformation: {
                  width: 200,
                  height: 200,
                },
                floating: {
                  horizontalPosition: {
                    offset: 1014400,
                  },
                  verticalPosition: {
                    offset: 1014400,
                  },
                },
              }),
            ],
          }),
          new Paragraph({
            children: [
              new ImageRun({
                data: fs.readFileSync("./cat.jpg"),
                transformation: {
                  width: 200,
                  height: 200,
                },
                floating: {
                  horizontalPosition: {
                    relative: HorizontalPositionRelativeFrom.PAGE,
                    align: HorizontalPositionAlign.RIGHT,
                  },
                  verticalPosition: {
                    relative: VerticalPositionRelativeFrom.PAGE,
                    align: VerticalPositionAlign.BOTTOM,
                  },
                },
              }),
            ],
          }),
        ],
      }],
    });

    const b64string = await Packer.toBase64String(doc);

    res.setHeader('Content-Disposition', 'attachment; filename=MyDocument2.docx');
    res.send(Buffer.from(b64string, 'base64'));
    res.download(doc)

  });
})



app.get('/new', async (req, res) => {
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
            alignment: docx.AlignmentType.CENTER,
            spacing: {
              after: 350
            },
          }),
          new docx.Table({
            rows: [
              new docx.TableRow({
                children: [
                  new docx.TableCell({
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
              }),
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


app.post('/images', (req, res) => {
  res.json({
    message: 'img received'
  })
})

app.listen(3000, () => console.log('Server up at 3000'))