import React, { useEffect, useState } from "react";
import readXlsxFile from "read-excel-file";
import { useJsonToCsv } from "react-json-csv";
import styles from "../styles/Home.module.css";
import XlsExport from "xlsexport";

export default function App() {
  const [currentExcelFile, setCurrentExcelFile] = useState([]);
  const [newExcelFile, setNewExcelFile] = useState([]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const [column, setColumn] = useState(null);
  const [fields, setFields] = useState({});
  const { saveAsCsv } = useJsonToCsv();
  const date = new Date();
  const filename = `csv-file-${date.getFullYear()}${date.getMonth()}${date.getDay()}${date.getHours()}${date.getMinutes()}${date.getSeconds()}`;

  useEffect(() => {
    setLoading(false);
    if (currentExcelFile.length > 0) {
      let sss = {};
      currentExcelFile[0].map((i, j) => {
        sss[j] = j;
      });
      setFields(sss);
    }
    console.log("🚀 ~ file: App.js ~ line 143 ~ newExcelFile.map ~ data", data);
  }, [currentExcelFile, newExcelFile, data]);

  var foo = function (val) {
    var base = "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      i,
      j,
      result = 0;
    for (i = 0, j = val.length - 1; i < val.length; i += 1, j -= 1) {
      result += Math.pow(base.length, j) * (base.indexOf(val[i]) + 1);
    }
    return result;
  };
  return (
    <div dir="rtl" className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          حذف تکراری‌های{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/alisouran/RDRE"
          >
            دو فایل اکسل!
          </a>
        </h1>

        <p className={styles.description}>
          در صورت هرگونه مشکل پیام دهید:{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://t.me/alisouran"
          >
            تلگرام
          </a>
        </p>

        <div className={styles.grid}>
          <div className={styles.card}>
            <p>فایل اولیه را بارگزاری نمایید:</p>
            <input
              type="file"
              accept=".xls,.xlsx, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
              disabled={loading ? "disabled" : ""}
              multiple
              onChange={(event) => {
                setLoading(true);
                readXlsxFile(event.target.files[0]).then((rows) => {
                  setCurrentExcelFile(rows);
                });
              }}
            />
          </div>
          <div className={styles.card}>
            <p>فایل ثانویه را بارگزاری نمایید:</p>
            <input
              type="file"
              accept=".xls , .xlsx , application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
              multiple
              disabled={loading ? "disabled" : ""}
              onChange={(event) => {
                setLoading(true);
                readXlsxFile(event.target.files[0]).then((rows) => {
                  setNewExcelFile(rows);
                });
              }}
            />
          </div>

          <div className={styles.card}>
            <p>نام ستون منحصر به فرد:</p>
            <input
              type="text"
              style={{
                direction: "ltr",
                width: "100%",
                padding: "5px",
                textAlign: "center",
              }}
              onChange={(e) => {
                setColumn(foo(e.target.value.toUpperCase()));
              }}
            />
          </div>

          <div className={styles.card}>
            <p>برنامه را اجرا کنید:</p>
            <button
              disabled={loading ? "disabled" : ""}
              onClick={() => {
                setData([]);
                if (column !== null) {
                  newExcelFile.map((item) => {
                    let s = true;
                    currentExcelFile.map((cItem) => {
                      if (item[column - 1] === cItem[column - 1]) {
                        s = false;
                      }
                    });
                    if (s) {
                      setData((data) => [...data, Object.assign({}, item)]);
                    }
                  });
                  setLoading(true);
                } else {
                  alert("لطفا تمام قسمت‌ها را کامل نمایید...");
                }
              }}
            >
              اجرای برنامه
            </button>
          </div>
          {data && data.length > 0 && (
            <div className={styles.card}>
              <>
                <p>فایل را از اینجا دانلود کنید:</p>
                <button
                  style={{ marginLeft: 7 }}
                  onClick={() => {
                    const xls = new XlsExport(data, "Example WB");
                    xls.exportToXLS(
                      `xlsx-file-${date.getFullYear()}${date.getMonth()}${date.getDay()}${date.getHours()}${date.getMinutes()}${date.getSeconds()}.xlsx`
                    );
                  }}
                >
                  XLSX
                </button>
                <button
                  style={{ marginLeft: 7, marginRight: 7 }}
                  onClick={() => {
                    const xls = new XlsExport(data, "Example WB");
                    xls.exportToXLS(
                      `xls-file-${date.getFullYear()}${date.getMonth()}${date.getDay()}${date.getHours()}${date.getMinutes()}${date.getSeconds()}.xls`
                    );
                  }}
                >
                  XLS
                </button>
                <button
                  style={{ marginRight: 7 }}
                  onClick={() => {
                    const xls = new XlsExport(data, "Example WB");
                    xls.exportToCSV(
                      `csv-file-${date.getFullYear()}${date.getMonth()}${date.getDay()}${date.getHours()}${date.getMinutes()}${date.getSeconds()}.csv`
                    );
                  }}
                >
                  CSV
                </button>
              </>
            </div>
          )}
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://t.me/alisouran"
          target="_blank"
          rel="noopener noreferrer"
        >
          علیرضا سوران
        </a>
      </footer>
    </div>
  );
}
