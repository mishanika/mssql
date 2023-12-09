import { useEffect, useState } from "react";
import "./InterestingTable.scss";
import InterestingCell from "../../components/interestingCell/InterestingCell";
import InterestingPopup from "../../components/interestingPopup/InterestingPopup";

const InterestingTable: React.FC = () => {
  const [table, setTable] = useState<InterestingCell[]>([]);
  const [keys, setKeys] = useState<string[]>([]);
  const [popupKeys, setPopupKeys] = useState<string[]>([]);
  const [url, setUrl] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const tableRender = (item: InterestingCell, index: number) => <InterestingCell item={item} index={index} />;

  const headerRender = (item: string) => <div style={{ width: `${100 / keys.length}%` }}>{item}</div>;

  const getAgreementsStuffClients = async () => {
    const response = await fetch("http://localhost:3030/interesting-table/agreements-stuff-clients");
    const data = await response.json();

    setTable([...data]);
  };

  const getAgreementsAmount = async () => {
    const response = await fetch("http://localhost:3030/interesting-table/agreements-amount");
    const data = await response.json();

    setTable([...data]);
  };

  const getStuffSelledByClient = async () => {
    const response = await fetch("http://localhost:3030/interesting-table/stuff-selled-by-client");
    const data = await response.json();

    setTable([...data]);
  };

  const getMostAgreementsByClient = async () => {
    const response = await fetch("http://localhost:3030/interesting-table/most-agreements-by-client");
    const data = await response.json();

    setTable([...data]);
  };

  const getMostAvgStuff = async () => {
    const response = await fetch("http://localhost:3030/interesting-table/most-avg-stuff");
    const data = await response.json();

    setTable([...data]);
  };

  const getClientMostVarietyOfStuff = async () => {
    const response = await fetch("http://localhost:3030/interesting-table/client-of-stuff");
    const data = await response.json();

    setTable([...data]);
  };

  const openPopup = (keys: string[], url: string) => {
    setPopupKeys([...keys]);
    setIsPopupOpen(true);
    setUrl(url);
  };

  useEffect(() => {
    const keys = [];

    for (const key in table[0]) {
      keys.push(key);
    }

    setKeys(keys);
  }, [table]);

  return (
    <>
      {isPopupOpen && (
        <InterestingPopup setIsPopupOpen={setIsPopupOpen} setTable={setTable} keys={popupKeys} url={url} />
      )}
      <div className="table-wrapper">
        <div className="buttons-sort interesting">
          <div className="create" onClick={() => getAgreementsStuffClients()}>
            getAgreementsStuffClients
          </div>
          <div className="create" onClick={() => getAgreementsAmount()}>
            getAgreementsAmount
          </div>
          <div className="create" onClick={() => getStuffSelledByClient()}>
            getStuffSelledByClient
          </div>
          <div className="create" onClick={() => getMostAgreementsByClient()}>
            getMostAgreementsByClient
          </div>
          <div className="create" onClick={() => getMostAvgStuff()}>
            getMostAvgStuff
          </div>
          <div
            className="create"
            onClick={() => openPopup(["quantity"], "http://localhost:3030/interesting-table/stuff-by-quantity")}
          >
            getStuffByQuantity
          </div>
          <div
            className="create"
            onClick={() => openPopup(["name"], "http://localhost:3030/interesting-table/client-by-name")}
          >
            getClientByName
          </div>
          <div className="create" onClick={() => getClientMostVarietyOfStuff()}>
            getClientMostVarietyOfStuff
          </div>
          <div
            className="create"
            onClick={() => openPopup(["amount"], "http://localhost:3030/interesting-table/client-by-agreements")}
          >
            getClientByAgreements
          </div>
          <div
            className="create"
            onClick={() => openPopup(["min", "max"], "http://localhost:3030/interesting-table/stuff-by-min-max")}
          >
            getStuffByMinMaxRetail
          </div>
          <div
            className="create"
            onClick={() => openPopup(["description"], "http://localhost:3030/interesting-table/stuff-by-description")}
          >
            getStuffByDescription
          </div>
          <div
            className="create"
            onClick={() => openPopup(["limit"], "http://localhost:3030/interesting-table/agreements-by-wholesale")}
          >
            getStuffByWholesalePrice
          </div>
        </div>
        <div className="table interesting-table">
          <div className="header">{keys?.map(headerRender)}</div>
          {table.map(tableRender)}
        </div>
      </div>
    </>
  );
};

export default InterestingTable;
