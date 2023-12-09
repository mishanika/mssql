import PDFDocument from "pdfkit-table";
import fs from "fs";
import database from "./database/database";

export const writePDF = (data: database.IRecordSet<any>, name: string) => {
  const keys = [];

  for (const key in data[0]) {
    keys.push(key);
  }

  const rows = [];

  for (const obj of data) {
    const row = [];
    for (const [key, value] of Object.entries(obj)) {
      console.log(value);
      row.push(value + "");
    }
    rows.push(row);
  }

  let doc = new PDFDocument({ margin: 30, size: "A4" });

  doc.pipe(fs.createWriteStream(`./${name}.pdf`));
  console.log(rows);
  const tableArray = {
    headers: keys,
    rows: rows,
  };
  doc.table(tableArray, { width: 300 });
  doc.end();
};
