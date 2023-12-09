import { useEffect, useRef, useState } from "react";
import "./InterestingCell.scss";

type InterestingCell = {
  index: number;
  item: {};
};

const InterestingCell = ({ item, index }: InterestingCell) => {
  const [data, setData] = useState<string[]>([]);
  const [keys, setKeys] = useState<string[]>([]);

  useEffect(() => {
    const data = Object.values(item).map((item) => item + "");
    console.log(data, item);
    setData([...data]);
  }, [item]);

  useEffect(() => {
    const keys = Object.keys(item);
    setKeys([...keys]);
  }, [data]);

  const cellrender = (value: string, i: number) => (
    <div key={i} style={{ width: `calc(${100 / keys.length}%` }}>
      {value}
    </div>
  );

  return <div className={`cell ${index % 2 ? "odd" : "even"}`}>{data.map(cellrender)}</div>;
};

export default InterestingCell;
