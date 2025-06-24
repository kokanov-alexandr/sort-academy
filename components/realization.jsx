import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Realization = ({ pythonCode, cppCode, cCode, cSharpCode }) => {
  return (
    <div className="mt-8">
      <Tabs defaultValue="python" className="w-full max-w-2xl">
        <TabsList className="mb-2">
          <TabsTrigger value="python">Python</TabsTrigger>
          <TabsTrigger value="cpp">C++</TabsTrigger>
          <TabsTrigger value="c">C</TabsTrigger>
          <TabsTrigger value="csharp">C#</TabsTrigger>
        </TabsList>
        <TabsContent value="python">
          <pre className="bg-zinc-900 text-white rounded-lg p-4 overflow-x-auto text-sm">
            <code>{pythonCode || "Нет кода для Python"}</code>
          </pre>
        </TabsContent>
        <TabsContent value="cpp">
          <pre className="bg-zinc-900 text-white rounded-lg p-4 overflow-x-auto text-sm">
            <code>{cppCode || "Нет кода для C++"}</code>
          </pre>
        </TabsContent>
        <TabsContent value="c">
          <pre className="bg-zinc-900 text-white rounded-lg p-4 overflow-x-auto text-sm">
            <code>{cCode || "Нет кода для C"}</code>
          </pre>
        </TabsContent>
        <TabsContent value="csharp">
          <pre className="bg-zinc-900 text-white rounded-lg p-4 overflow-x-auto text-sm">
            <code>{cSharpCode || "Нет кода для C#"}</code>
          </pre>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Realization;
