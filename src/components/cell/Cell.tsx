import { useRef } from "react";
import "./Cell.scss";

type Cell = {
  Id: number;
  PhoneNumber: string;
  Name: string;
  Address: string;
  WholesalePrice: number;
  RetailPrice: number;
  Description: string;
  Date: string;
  StuffId: number;
  Quantity: number;
  ClientId: number;
  Sign: number;
  index: number;
  tableKey?: string;
  url: string;
};

type Handlers = {
  setActiveCell: React.Dispatch<React.SetStateAction<number>>;
  setIsPopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
  getTable: () => Promise<void>;
};

const Cell = ({
  Id,
  PhoneNumber,
  Name,
  Address,
  WholesalePrice,
  RetailPrice,
  Description,
  Date,
  StuffId,
  Quantity,
  ClientId,
  Sign,
  index,
  tableKey,
  url,
  setActiveCell,
  setIsPopupOpen,
  getTable,
}: Cell & Handlers) => {
  const cellHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = e.target as HTMLDivElement;
    console.log(target);
    if (!target.classList.contains("delete")) {
      setActiveCell(index);
      setIsPopupOpen(true);
    }
  };

  const deleteCell = async () => {
    const data = {
      id: Id,
    };

    await fetch(url + "/delete", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    await getTable();
  };

  const clientRender = () => (
    <>
      <div className="client-id">{Id}</div>
      <div className="client-phone">{PhoneNumber}</div>
      <div className="client-name">{Name}</div>
      <div className="client-address">{Address}</div>
      <div className="delete" onClick={() => deleteCell()}>
        Delete
      </div>
    </>
  );

  const stuffRender = () => (
    <>
      <div className="stuff-id">{Id}</div>
      <div className="stuff-name">{Name}</div>
      <div className="stuff-wholesale">{WholesalePrice}</div>
      <div className="stuff-retail">{RetailPrice}</div>
      <div className="stuff-description">{Description}</div>
      <div className="delete" onClick={() => deleteCell()}>
        Delete
      </div>
    </>
  );

  const agreementsRender = () => (
    <>
      <div className="agreements-id">{Id}</div>
      <div className="agreements-date">{Date}</div>
      <div className="agreements-stuff">{StuffId}</div>
      <div className="agreements-quantity">{Quantity}</div>
      <div className="agreements-client">{ClientId}</div>
      <div className="agreements-sign">{Sign}</div>
      <div className="delete" onClick={() => deleteCell()}>
        Delete
      </div>
    </>
  );

  return (
    <div className={`cell ${index % 2 ? "odd" : "even"}`} onClick={(e) => cellHandler(e)}>
      {tableKey === "client" && clientRender()}
      {tableKey === "stuff" && stuffRender()}
      {tableKey === "agreements" && agreementsRender()}
    </div>
  );
};

export default Cell;
