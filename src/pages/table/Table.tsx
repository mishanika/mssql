import { useEffect, useState } from "react";
import "./Table.scss";
import Cell from "../../components/cell/Cell";
import Popup from "../../components/popup/Popup";
import { useNavigate } from "react-router-dom";
import { keyType } from "../../components/router/routes";

type TableProps = {
  keys: keyType[];
  tableKey: string;
};

const Table: React.FC<TableProps> = ({ keys, tableKey }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isCreatePoup, setIsCreatePoup] = useState(false);
  const [activeCell, setActiveCell] = useState(-1);
  const [url, setUrl] = useState("");
  const [table, setTable] = useState<Cell[]>([]);

  const tableRender = (item: Cell, index: number) => (
    <Cell
      {...item}
      index={index}
      setIsPopupOpen={setIsPopupOpen}
      setActiveCell={setActiveCell}
      tableKey={tableKey}
      url={url}
      getTable={getTable}
    />
  );

  const headerRender = ({ value, className }: keyType) => (
    <div className={className.toLowerCase() + "-" + value.toLowerCase()}>{value}</div>
  );

  const createCell = () => {
    setIsPopupOpen(true);
    setIsCreatePoup(true);
  };

  const getTable = async () => {
    await fetch(url)
      .then((data) => data.json())
      .then((data) => setTable(data));
  };

  useEffect(() => {
    if (tableKey === "client") {
      setUrl("http://localhost:3030/user");
    } else if (tableKey === "stuff") {
      setUrl("http://localhost:3030/stuff");
    } else if (tableKey === "agreements") {
      setUrl("http://localhost:3030/agreements");
    }
  }, []);

  useEffect(() => {
    getTable();
  }, [url]);

  return (
    <>
      {isPopupOpen ? (
        isCreatePoup ? (
          <Popup
            index={activeCell}
            setIsPopupOpen={setIsPopupOpen}
            setIsCreatePoup={setIsCreatePoup}
            getTable={getTable}
            isCreatePoup={isCreatePoup}
            keys={keys}
            tableKey={tableKey}
            url={url}
          />
        ) : (
          <Popup
            {...table[activeCell]}
            index={activeCell}
            setIsPopupOpen={setIsPopupOpen}
            getTable={getTable}
            keys={keys}
            tableKey={tableKey}
            url={url}
          />
        )
      ) : (
        false
      )}
      <div className="table-wrapper">
        <div className="buttons-sort">
          <div className="create" onClick={() => createCell()}>
            Create
          </div>
        </div>
        <div className="table">
          <div className="header">{keys.map(headerRender)}</div>
          {table.map(tableRender)}
        </div>
      </div>
    </>
  );
};

export default Table;
