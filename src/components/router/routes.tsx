import InterestingTable from "../../pages/interestingTable/InterestingTable";
import Table from "../../pages/table/Table";

export type IRoute = {
  path: string;
  element: JSX.Element;
};

export type keyType = { className: string; value: string };

const keys = {
  clientKeys: [
    { className: "Client", value: "Id" },
    { className: "Client", value: "Phone number" },
    { className: "Client", value: "Name" },
    { className: "Client", value: "Address" },
  ],
  stuffKeys: [
    { className: "Stuff", value: "Id" },
    { className: "Stuff", value: "Name" },
    { className: "Stuff", value: "Wholesale price" },
    { className: "Stuff", value: "Retail price" },
    { className: "Stuff", value: "Description" },
  ],
  agreementsKeys: [
    { className: "Agreements", value: "Id" },
    { className: "Agreements", value: "Date" },
    { className: "Agreements", value: "Stuff id" },
    { className: "Agreements", value: "Quantity" },
    { className: "Agreements", value: "Client id" },
    { className: "Agreements", value: "Sign" },
  ],
};

export const routes: IRoute[] = [
  {
    path: "/",
    element: <Table keys={keys.clientKeys} tableKey="client" />,
  },
  {
    path: "/stuff",
    element: <Table keys={keys.stuffKeys} tableKey="stuff" />,
  },
  {
    path: "/agreements",
    element: <Table keys={keys.agreementsKeys} tableKey="agreements" />,
  },
  {
    path: "/interestingTable",
    element: <InterestingTable />,
  },
];
