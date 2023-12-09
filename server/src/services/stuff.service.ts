import process from "process";
import database from "../database/database";
import { Stuff } from "../types";

class StuffService {
  getStuff = async () => {
    return (await database.query("select * from Stuff")).recordset;
  };

  createStuff = async ({
    wholesale_price,
    name,
    retail_price,
    description,
  }: Stuff): Promise<{ status: boolean; error: string }> => {
    try {
      await database.query(
        `INSERT INTO Stuff (Name, WholesalePrice, RetailPrice, Description) VALUES ('${name}', '${wholesale_price}', '${retail_price}', '${description}')`
      );

      return { status: true, error: "" };
    } catch (e) {
      return { status: false, error: e as string };
    }
  };

  deleteStuff = async (id: string): Promise<{ status: boolean; error: string }> => {
    try {
      await database.query(`DELETE FROM Stuff WHERE Id = '${id}'`);

      return { status: true, error: "" };
    } catch (e) {
      return { status: false, error: e as string };
    }
  };

  updateStuff = async ({
    id,
    name,
    wholesale_price,
    retail_price,
    description,
  }: Stuff): Promise<{ status: boolean; error: string }> => {
    try {
      console.log(
        (
          await database.query(
            `UPDATE Stuff SET Name = '${name}', WholesalePrice = '${wholesale_price}',  RetailPrice = '${retail_price}', Description = '${description}' WHERE Id = ${id}`
          )
        ).rowsAffected
      );

      return { status: true, error: "" };
    } catch (e) {
      return { status: false, error: e as string };
    }
  };
}

export default StuffService;
