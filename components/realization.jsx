import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useState } from "react";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

const Reatization = ({pythonCode, cppCode, cCode, cSharpCode}) => {
  const [language, setlanguage] = useState("python");
  const [codeString, setCode] = useState(pythonCode);
  const changeLanguageHandle = (event, value) => {
    setlanguage(value);
    switch (value) {
      case "python":
        setCode(pythonCode);
        break;

      case "cpp":
        setCode(cppCode);
        break;

      case "c":
        setCode(cCode);
        break;
      case "csharp":
        setCode(cSharpCode);
        break;
    }
  };

  return (
    <div>
      <Tabs
        value={language}
        onChange={changeLanguageHandle}
        aria-label="basic tabs example"
      >
        <Tab value="python" label="Python"></Tab>
        <Tab value="cpp" label="C++"></Tab>
        <Tab value="c" label="C" />
        <Tab value="csharp" label="C#" />
      </Tabs>
      <SyntaxHighlighter language={language}>{codeString}</SyntaxHighlighter>
    </div>
  );
};

export default Reatization;
