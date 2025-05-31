import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

const Reatization = ({ pythonCode, cppCode, cCode, cSharpCode }) => {
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
        onChange={changeLanguageHandle}
        defaultValue="account"
        className="w-[400px]"
      >
        <TabsList>
          <TabsTrigger value="python">Python</TabsTrigger>
          <TabsTrigger value="cpp">C++</TabsTrigger>
          <TabsTrigger value="c">C</TabsTrigger>
          <TabsTrigger value="csharp">C#</TabsTrigger>
        </TabsList>
        <TabsContent value="python">pythonCode</TabsContent>
        <TabsContent value="password">Change your password here.</TabsContent>
      </Tabs>
    </div>
  );
};

export default Reatization;
