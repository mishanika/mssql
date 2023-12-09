import process from "process";
import database from "../database/database";
import { User } from "../types";

class UserService {
  getUsers = async () => {
    return (await database.query("select * from Clients")).recordset;
  };

  createUser = async ({ phone_number, name, address }: User): Promise<{ status: boolean; error: string }> => {
    console.log(phone_number, name, address);
    try {
      await database.query(
        `INSERT INTO Clients (PhoneNumber, Name, Address) VALUES ('${phone_number}', '${name}', '${address}')`
      );

      return { status: true, error: "" };
    } catch (e) {
      return { status: false, error: e as string };
    }
  };

  deleteUser = async (id: string): Promise<{ status: boolean; error: string }> => {
    try {
      await database.query(`DELETE FROM Clients WHERE Id = '${id}'`);

      return { status: true, error: "" };
    } catch (e) {
      return { status: false, error: e as string };
    }
  };

  updateUser = async ({ id, phone_number, name, address }: User): Promise<{ status: boolean; error: string }> => {
    try {
      console.log(id, phone_number, name, address);
      console.log(
        (
          await database.query(
            `UPDATE Clients SET PhoneNumber = '${phone_number}', Name = '${name}', Address = '${address}' WHERE Id = ${id}`
          )
        ).rowsAffected
      );

      return { status: true, error: "" };
    } catch (e) {
      return { status: false, error: e as string };
    }
  };
}

export default UserService;
