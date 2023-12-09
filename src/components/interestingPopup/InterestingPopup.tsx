import { useRef } from "react";
import "./Popup.scss";
import InterestingCell from "../interestingCell/InterestingCell";

type Handler = {
  setIsPopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setTable: React.Dispatch<React.SetStateAction<InterestingCell[]>>;
};

type InterestingPopupProps = {
  keys: string[];
  url: string;
};

const InterestingPopup = ({ keys, url, setIsPopupOpen, setTable }: InterestingPopupProps & Handler) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);
  const inputRefs = useRef<HTMLInputElement[]>([]);

  const closePopup = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === wrapperRef.current) {
      setIsPopupOpen(false);
    }
  };

  const getData = async (e: React.FormEvent<HTMLFormElement>) => {
    let data = {};
    for (let i = 0; i < keys.length; i++) {
      data[keys[i] as keyof typeof data] = inputRefs.current[i].value as never;
    }

    const response = await fetch(url, {
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
    let response = await getData(e);

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
    setTable([...responseData]);
    setIsPopupOpen(false);
  };

  const keysRender = (item: string, i: number) => (
    <input type="text" placeholder={item} ref={(el) => (inputRefs.current[i] = el!)} />
  );

  return (
    <div className="popup-wrapper" onClick={(e) => closePopup(e)} ref={wrapperRef}>
      <form className={`cell odd`} onSubmit={(e) => submitHandler(e)}>
        <div className="error" ref={errorRef}>
          There will be errors
        </div>
        {keys.map(keysRender)}
        <input type="submit" value="Get Data" />
      </form>
    </div>
  );
};

export default InterestingPopup;
