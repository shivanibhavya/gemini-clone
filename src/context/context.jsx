import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const delayPara = (index, nextWord) => {
   
  };

  const newChat = () =>{
    setLoading(false)
    setShowResult(false)
  }

  const onSent = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);

    try {
      let response;
      if (prompt !== undefined) {
        response = await run(prompt);
        setRecentPrompt(prompt);
      } else {
        setPrevPrompts((prev) => [...prev, input]);
        setRecentPrompt(input);
        response = await run(input);
      }

      const dataArray = response.split("**");
      let newData = "";

      for (let i = 0; i < dataArray.length; i++) {
        if (i === 0 || i % 2 !== 1) {
          newData += dataArray[i];
        } else {
          newData += "<b>" + dataArray[i] + "</b>";
        }
      }

      let newData2 = newData.split("*").join("</br>");
      setResultData(newData2);
    } catch (error) {
      console.error("Error in onSent:", error);
    } finally {
      setLoading(false);
      setInput("");
    }
  };

  return (
    <Context.Provider
      value={{
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
