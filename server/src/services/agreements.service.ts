import process from "process";
import database from "../database/database";
import { Agreements } from "../types";
import { RequestError } from "mssql";

class AgreementsService {
  getAgreements = async () => {
    return (await database.query("select * from Agreements")).recordset;
  };

  createAgreements = async ({
    date,
    stuff_id,
    quantity,
    client_id,
    sign,
  }: Agreements): Promise<{ status: boolean; error: string }> => {
    try {
      await database.query(
        `INSERT INTO Agreements (Date, StuffId, Quantity, ClientId, Sign) VALUES ('${date}', '${stuff_id}', '${quantity}', '${client_id}', '${sign}')`
      );

      return { status: true, error: "" };
    } catch (e) {
      const error = e as RequestError;
      console.log(error.message);
      return { status: false, error: error.message };
    }
  };

  deleteAgreements = async (id: string): Promise<{ status: boolean; error: string }> => {
    try {
      await database.query(`DELETE FROM Agreements WHERE Id = '${id}'`);

      return { status: true, error: "" };
    } catch (e) {
      const error = e as RequestError;
      console.log(error.message);
      return { status: false, error: error.message };
    }
  };

  updateAgreements = async ({
    id,
    date,
    stuff_id,
    quantity,
    client_id,
    sign,
  }: Agreements): Promise<{ status: boolean; error: string }> => {
    try {
      console.log(
        (
          await database.query(
            `UPDATE Agreements SET Date = '${date}', StuffId = '${stuff_id}', Quantity = '${quantity}', ClientId = '${client_id}', Sign = '${sign}' WHERE Id = ${id}`
          )
        ).rowsAffected
      );

      return { status: true, error: "" };
    } catch (e) {
      const error = e as RequestError;
      console.log(error.message);
      return { status: false, error: error.message };
    }
  };
}

export default AgreementsService;
