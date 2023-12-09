import database from "../database/database";
import { writePDF } from "../utils";

class InterestingTableService {
  //Зв'язані дані про угоди з клієнтами та товаром
  getAgreementsStuffClients = async () => {
    return (
      await database.query(
        "SELECT Agreements.*, Clients.Name AS ClientName, Stuff.Name AS StuffName FROM Agreements JOIN Clients ON Agreements.ClientId = Clients.Id JOIN Stuff ON Agreements.StuffId = Stuff.Id;"
      )
    ).recordset;
  };

  //Угрупувати та підрахувати кількість угод для кожного клієнта
  getAgreementsAmount = async () => {
    return (
      await database.query(
        "SELECT Clients.Name AS ClientName, COUNT(Agreements.Id) AS AgreementCount FROM Clients LEFT JOIN Agreements ON Clients.Id = Agreements.ClientId GROUP BY Clients.Id, Clients.Name;"
      )
    ).recordset;
  };

  //Підрахувати сумарну кількість товарів, проданих кожним клієнтом
  getStuffSelledByClient = async () => {
    return (
      await database.query(
        "SELECT Clients.Name AS ClientName, SUM(Agreements.Quantity) AS TotalQuantity FROM Clients LEFT JOIN Agreements ON Clients.Id = Agreements.ClientId GROUP BY Clients.Id, Clients.Name;"
      )
    ).recordset;
  };

  //Знайти клієнта, який здійснив найбільше угод
  getMostAgreementsByClient = async () => {
    return (
      await database.query(
        "SELECT TOP 1 Clients.Name AS ClientName, COUNT(Agreements.Id) AS AgreementCount FROM Clients LEFT JOIN Agreements ON Clients.Id = Agreements.ClientId GROUP BY Clients.Id, Clients.Name ORDER BY AgreementCount DESC;"
      )
    ).recordset;
  };

  //Знайти товар з найбільшою середньою кількістю, проданою за угодами
  getMostAvgStuff = async () => {
    const data = (
      await database.query(
        "SELECT TOP 1 Stuff.Name AS StuffName, AVG(Agreements.Quantity) AS AverageQuantity FROM Stuff LEFT JOIN Agreements ON Stuff.Id = Agreements.StuffId GROUP BY Stuff.Id, Stuff.Name ORDER BY AverageQuantity DESC;"
      )
    ).recordset;
    writePDF(data, "getMostAvgStuff");
    return data;
  };
  //ті п'ять все

  //початок семи
  //Знайти товари, кількість яких більше заданої кількості
  getStuffByQuantity = async (quantity: number) => {
    return (
      await database.query(
        `SELECT Stuff.Id, Stuff.Name, SUM(Agreements.Quantity) AS TotalQuantity FROM Stuff LEFT JOIN Agreements ON Stuff.Id = Agreements.StuffId GROUP BY Stuff.Id, Stuff.Name HAVING SUM(Agreements.Quantity) > ${quantity};`
      )
    ).recordset;
  };

  //Пошук клієнта за частковим співпадінням в імені та телефонному номері
  getClientByName = async (name: string) => {
    return (await database.query(`SELECT * FROM Clients WHERE Name LIKE '%${name}%';`)).recordset;
  };

  //Пошук клієнта, який купив найбільше різних товарів:
  getClientMostVarietyOfStuff = async () => {
    const data = (
      await database.query(
        `SELECT TOP 1 Clients.Name AS ClientName, COUNT(DISTINCT Agreements.StuffId) AS UniqueStuffCount FROM Clients 
        JOIN Agreements ON Clients.Id = Agreements.ClientId GROUP BY Clients.Id, Clients.Name ORDER BY UniqueStuffCount DESC;`
      )
    ).recordset;
    writePDF(data, "getClientMostVarietyOfStuff");
    return data;
  };

  //Отримати список клієнтів, які зробили певну кількість угод
  getClientByAgreements = async (agAmount: number) => {
    const data = (
      await database.query(
        `SELECT Clients.* FROM Clients JOIN (
    SELECT ClientId
    FROM Agreements
    GROUP BY ClientId
    HAVING COUNT(Id) >= ${agAmount}
) AS HighVolumeClients ON Clients.Id = HighVolumeClients.ClientId;`
      )
    ).recordset;
    writePDF(data, "getClientByAgreements");

    return data;
  };

  //Пошук товарів з визначеним описом та вказаним ціновим діапазоном
  getStuffByMinMax = async (min: number, max: number) => {
    return (
      await database.query(
        `SELECT *
FROM Stuff
WHERE RetailPrice BETWEEN ${min} AND ${max};`
      )
    ).recordset;
  };

  //Пошук товарів за описом
  getStuffByDescription = async (description: string) => {
    return (
      await database.query(
        `SELECT *
FROM Stuff
WHERE Description LIKE '%${description}%'`
      )
    ).recordset;
  };

  //Отримати список угод для товару з вказаною оптовою ціною нижче заданого ліміту
  getStuffByWholesalePrice = async (limit: number) => {
    return (
      await database.query(
        `SELECT Agreements.*
FROM Agreements
JOIN Stuff ON Stuff.Id = Agreements.StuffId
WHERE Stuff.WholesalePrice < ${limit};`
      )
    ).recordset;
  };
}

export default InterestingTableService;
