import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

const Realization = ({ pythonCode, cppCode, cCode, cSharpCode }) => {
  return (
    <Card className="max-w-3xl">
      <div className="text-xl font-bold text-center mb-1">
        Реализация
      </div>
      <CardContent>
        <Tabs defaultValue="python" className="w-full max-w-2xl">
          <TabsList className="mb-2">
            <TabsTrigger value="python">Python</TabsTrigger>
            <TabsTrigger value="cpp">C++</TabsTrigger>
            <TabsTrigger value="c">C</TabsTrigger>
            <TabsTrigger value="csharp">C#</TabsTrigger>
          </TabsList>
          <TabsContent value="python">
            <pre>
              <code>{pythonCode || "Нет кода для Python"}</code>
            </pre>
          </TabsContent>
          <TabsContent value="cpp">
            <pre>
              <code>{cppCode || "Нет кода для C++"}</code>
            </pre>
          </TabsContent>
          <TabsContent value="c">
            <pre>
              <code>{cCode || "Нет кода для C"}</code>
            </pre>
          </TabsContent>
          <TabsContent value="csharp">
            <pre>
              <code>{cSharpCode || "Нет кода для C#"}</code>
            </pre>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default Realization;
