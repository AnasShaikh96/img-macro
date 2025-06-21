import {
  ImageRun,
  Paragraph,
  TableRow,
  TableCell,
  BorderStyle,
  VerticalAlign,
} from "docx";
import * as fs from "fs";
import path from "path";

export const generateTableCells = (folderName) => {
  // const folderName = './tmp/uploads/32dc259c-3743-468a-adee-747fa29253aa/';
  let tempArr = [];

  // console.log(folderName, fs.existsSync(folderName))

  // if (!fs.existsSync(folderName)) {
  //   return tempArr;
  // }

  const storeCells = [];
  const files = folderName; //fs.readdirSync(folderName);
  console.log(files);

  const createTableCell = (path) => {
    return new TableCell({
      children: [
        new Paragraph({
          children: [
            new ImageRun({
              data: fs.readFileSync(path),
              transformation: {
                width: 300,
                height: 300,
              },
            }),
          ],
        }),
        new Paragraph("hello"),
      ],
      verticalAlign: VerticalAlign.CENTER,
      margins: {
        // top: convertInchesToTwip(0.69),
        // bottom: convertInchesToTwip(0.69),
        // left: convertInchesToTwip(0.69),
        // right: convertInchesToTwip(0.69),
      },
      borders: {
        top: {
          style: BorderStyle.SINGLE,
          size: 1,
          color: "000000",
        },
        bottom: {
          style: BorderStyle.SINGLE,
          size: 5,
          color: "000000",
        },
      },
    });
  };

  files.forEach((file) => {
    const filePath = path.join(folderName, file);
    const cell = createTableCell(filePath);
    storeCells.push(cell);
  });

  for (let i = 0; i < storeCells.length; i += 2) {
    if (storeCells && storeCells[i]) {
      const row = new TableRow({
        children: storeCells[i + 1]
          ? [storeCells[i], storeCells[i + 1]]
          : [storeCells[i]],
      });
      tempArr.push(row);
    }
  }

  return tempArr;
};
