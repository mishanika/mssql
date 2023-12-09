import { useRef } from "react";
import "./Popup.scss";
import { keyType } from "../router/routes";

type Handler = {
  setIsPopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsCreatePoup?: React.Dispatch<React.SetStateAction<boolean>>;
  getTable?: () => Promise<void>;
};

type Cell = {
  Id?: number;
  PhoneNumber?: string;
  Name?: string;
  Address?: string;
  WholesalePrice?: number;
  RetailPrice?: number;
  Description?: string;
  Date?: string;
  StuffId?: number;
  Quantity?: number;
  ClientId?: number;
  Sign?: number;
  index: number;
  isCreatePoup?: boolean;
  keys: keyType[];
  tableKey: string;
  url: string;
};

const Popup = ({
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
  isCreatePoup,
  keys,
  tableKey,
  url,
  setIsPopupOpen,
  setIsCreatePoup,
  getTable,
}: Cell & Handler) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);
  const idRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const numberRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  const wholesaleRef = useRef<HTMLInputElement>(null);
  const retailRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const stuffidRef = useRef<HTMLInputElement>(null);
  const quantityRef = useRef<HTMLInputElement>(null);
  const clientidref = useRef<HTMLInputElement>(null);
  const signRef = useRef<HTMLInputElement>(null);

  const closePopup = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === wrapperRef.current) {
      setIsPopupOpen(false);
    }
  };

  const changeData = async (e: React.FormEvent<HTMLFormElement>) => {
    let data;
    if (tableKey === "client") {
      if (
        !numberRef.current?.value ||
        (numberRef.current?.value && (parseInt(numberRef.current?.value) < 6 || !parseInt(numberRef.current?.value)))
      ) {
        errorRef.current!.textContent = "Phone number must be grater or equal to 6 charachters";
        errorRef.current!.style.color = "#f54f4f";
        return;
      }
      data = {
        id: Id,
        name: nameRef.current?.value ? nameRef.current?.value : Name,
        phone_number: numberRef.current?.value ? numberRef.current?.value : PhoneNumber,
        address: addressRef.current?.value ? addressRef.current?.value : Address,
      };
    } else if (tableKey === "stuff") {
      if (!wholesaleRef.current?.value || (wholesaleRef.current?.value && !parseInt(wholesaleRef.current?.value))) {
        errorRef.current!.textContent = "Wholesale price must be a number";
        errorRef.current!.style.color = "#f54f4f";
        return;
      }

      if (!retailRef.current?.value || (retailRef.current?.value && !parseInt(wholesaleRef.current?.value))) {
        errorRef.current!.textContent = "Reatil price must be a number";
        errorRef.current!.style.color = "#f54f4f";
        return;
      }
      data = {
        id: Id,
        name: nameRef.current?.value ? nameRef.current?.value : Name,
        wholesale_price: wholesaleRef.current?.value ? wholesaleRef.current?.value : WholesalePrice,
        retail_price: retailRef.current?.value ? retailRef.current?.value : RetailPrice,
        description: descriptionRef.current?.value ? descriptionRef.current?.value : Description,
      };
    } else if (tableKey === "agreements") {
      if (
        !dateRef.current?.value ||
        (dateRef.current?.value && !dateRef.current?.value.match(/^(0[1-9]|[12][0-9]|3[01]).(0[1-9]|1[0-2]).\d{4}$/))
      ) {
        errorRef.current!.textContent = "Date must be like 21.10.2020";
        errorRef.current!.style.color = "#f54f4f";
        return;
      }
      if (!stuffidRef.current?.value || (stuffidRef.current?.value && !parseInt(stuffidRef.current.value))) {
        errorRef.current!.textContent = "StuffId must be a number";
        errorRef.current!.style.color = "#f54f4f";
        return;
      }
      if (!quantityRef.current?.value || (quantityRef.current?.value && !parseInt(quantityRef.current.value))) {
        errorRef.current!.textContent = "Quantity must be a number";
        errorRef.current!.style.color = "#f54f4f";
        return;
      }
      if (!clientidref.current?.value || (clientidref.current?.value && !parseInt(clientidref.current.value))) {
        errorRef.current!.textContent = "ClientId must be a number";
        errorRef.current!.style.color = "#f54f4f";
        return;
      }
      if (
        !signRef.current?.value ||
        (signRef.current?.value && parseInt(signRef.current.value) !== 0 && parseInt(signRef.current.value) !== 1)
      ) {
        errorRef.current!.textContent = "Sign must be 0 or 1";
        errorRef.current!.style.color = "#f54f4f";
        return;
      }
      data = {
        id: Id,
        date: dateRef.current?.value ? dateRef.current?.value : Date,
        stuff_id: stuffidRef.current?.value ? stuffidRef.current?.value : StuffId,
        quantity: quantityRef.current?.value ? quantityRef.current?.value : Quantity,
        client_id: clientidref.current?.value ? clientidref.current?.value : ClientId,
        sign: signRef.current?.value ? clientidref.current?.value : Sign,
      };
    }

    const response = await fetch(url + "/update", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response;
  };

  const createCell = async (e: React.FormEvent<HTMLFormElement>) => {
    let data;
    if (tableKey === "client") {
      if (numberRef.current?.value && (parseInt(numberRef.current?.value) < 6 || !parseInt(numberRef.current?.value))) {
        errorRef.current!.textContent = "Phone number must be grater or equal to 6 charachters";
        errorRef.current!.style.color = "#f54f4f";
        return;
      }
      data = {
        name: nameRef.current?.value,
        phone_number: numberRef.current?.value,
        address: addressRef.current?.value,
      };
    } else if (tableKey === "stuff") {
      if (!wholesaleRef.current?.value || (wholesaleRef.current?.value && !parseInt(wholesaleRef.current?.value))) {
        errorRef.current!.textContent = "Wholesale price must be a number";
        errorRef.current!.style.color = "#f54f4f";
        return;
      }

      if (!retailRef.current?.value || (retailRef.current?.value && !parseInt(retailRef.current?.value))) {
        errorRef.current!.textContent = "Reatil price must be a number";
        errorRef.current!.style.color = "#f54f4f";
        return;
      }
      data = {
        name: nameRef.current?.value,
        wholesale_price: wholesaleRef.current?.value,
        retail_price: retailRef.current?.value,
        description: descriptionRef.current?.value,
      };
    } else if (tableKey === "agreements") {
      console.log(dateRef.current?.value.match(/^(0[1-9]|[12][0-9]|3[01]).(0[1-9]|1[0-2]).\d{4}$/));
      if (
        !dateRef.current?.value ||
        (dateRef.current?.value && !dateRef.current?.value.match(/^(0[1-9]|[12][0-9]|3[01]).(0[1-9]|1[0-2]).\d{4}$/))
      ) {
        errorRef.current!.textContent = "Date must be like 21.10.2020";
        errorRef.current!.style.color = "#f54f4f";
        return;
      }
      if (!stuffidRef.current?.value || (stuffidRef.current?.value && !parseInt(stuffidRef.current.value))) {
        errorRef.current!.textContent = "StuffId must be a number";
        errorRef.current!.style.color = "#f54f4f";
        return;
      }
      if (!quantityRef.current?.value || (quantityRef.current?.value && !parseInt(quantityRef.current.value))) {
        errorRef.current!.textContent = "Quantity must be a number";
        errorRef.current!.style.color = "#f54f4f";
        return;
      }
      if (!clientidref.current?.value || (clientidref.current?.value && !parseInt(clientidref.current.value))) {
        errorRef.current!.textContent = "ClientId must be a number";
        errorRef.current!.style.color = "#f54f4f";
        return;
      }
      if (
        !signRef.current?.value ||
        (signRef.current?.value && parseInt(signRef.current.value) !== 0 && parseInt(signRef.current.value) !== 1)
      ) {
        errorRef.current!.textContent = "Sign must be 0 or 1";
        errorRef.current!.style.color = "#f54f4f";
        return;
      }
      data = {
        name: nameRef.current?.value,
        date: dateRef.current?.value,
        stuff_id: stuffidRef.current?.value,
        quantity: quantityRef.current?.value,
        client_id: clientidref.current?.value,
        sign: signRef.current?.value,
      };
    }

    const response = await fetch(url + "/create", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let response;
    if (isCreatePoup) {
      response = await createCell(e);
    } else {
      response = await changeData(e);
    }

    if (!response) {
      return;
    }

    const responseData = await response.json();

    if (!response.ok) {
      console.log(errorRef.current);
      errorRef.current!.textContent = "";
      errorRef.current!.style.color = "#f54f4f";
      for (const [key, value] of Object.entries(responseData)) {
        errorRef.current!.textContent += key + ": " + value + " ";
      }
      return;
    }

    if (setIsCreatePoup) {
      setIsCreatePoup(false);
    }
    if (getTable) {
      await getTable();
    }
    setIsPopupOpen(false);
  };

  const clientRender = () => (
    <>
      <input type="text" placeholder={Id ? Id + "" : "id, you can't type it"} ref={idRef} disabled />
      <input type="text" placeholder={PhoneNumber ? PhoneNumber + "" : "Phone number"} ref={numberRef} />
      <input type="text" placeholder={Name ? Name + "" : "Name"} ref={nameRef} />
      <input type="text" placeholder={Address ? Address + "" : "Address"} ref={addressRef} />
    </>
  );

  const stuffRender = () => (
    <>
      <input type="text" placeholder={Id ? Id + "" : "id, you can't type it"} ref={idRef} disabled />
      <input type="text" placeholder={Name ? Name + "" : "Name"} ref={nameRef} />
      <input type="text" placeholder={WholesalePrice ? WholesalePrice + "" : "Wholesale price"} ref={wholesaleRef} />
      <input type="text" placeholder={RetailPrice ? RetailPrice + "" : "Retail price"} ref={retailRef} />
      <input type="text" placeholder={Description ? Description + "" : "Description"} ref={descriptionRef} />
    </>
  );

  const agreementsRender = () => (
    <>
      <input type="text" placeholder={Id ? Id + "" : "id, you can't type it"} ref={idRef} disabled />
      <input type="text" placeholder={Date ? Date + "" : "Date like 21.10.2020"} ref={dateRef} />
      <input type="text" placeholder={StuffId ? StuffId + "" : "Stuff id"} ref={stuffidRef} />
      <input type="text" placeholder={Quantity ? Quantity + "" : "Quantity"} ref={quantityRef} />
      <input type="text" placeholder={ClientId ? ClientId + "" : "ClientId"} ref={clientidref} />
      <input type="text" placeholder={Sign ? Sign + "" : "Sign"} ref={signRef} />
    </>
  );

  return (
    <div className="popup-wrapper" onClick={(e) => closePopup(e)} ref={wrapperRef}>
      <form className={`cell ${index % 2 ? "odd" : "even"}`} onSubmit={(e) => submitHandler(e)}>
        <div className="error" ref={errorRef}>
          There will be errors
        </div>
        {tableKey === "client" && clientRender()}
        {tableKey === "stuff" && stuffRender()}
        {tableKey === "agreements" && agreementsRender()}
        <input type="submit" value={isCreatePoup ? "Create cell" : "Change data"} />
      </form>
    </div>
  );
};

export default Popup;
