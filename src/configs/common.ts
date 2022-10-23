import { DataSource } from "typeorm"

const myDataSource = new DataSource ({
  type: "mysql",
  host: process.env.TYPEORM_HOST,
  port: 3306,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE
});

myDataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initailized!");
  })
  .catch(() => {
    console.log("Database initialize failed.");
  });

  export default myDataSource
