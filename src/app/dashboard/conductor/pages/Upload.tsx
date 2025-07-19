import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const Upload = () => {
  return (
    <div className="">
      <h1 className="text-2xl font-bold mb-2">Upload</h1>
      <p className="mb-4 text-gray-600">Greetings Conductors! Please upload your files using the form below.</p>
      <hr/>
      <div className="grid w-full max-w-sm items-center gap-3">
        <Label htmlFor="files" className="mb-1 font-bold text-gray-700 font-medium">Upload Trip JSON:</Label>
        <Input id="files" type="file" accept=".json" />
      </div>
      <hr/>
      <Card className="h-[400px] w-full mt-4 bg-white shadow-md">
        {/* Display file */}
      </Card>
      <Button className="w-full border border-gray-200 rounded-lg mb-4 mt-4">Submit</Button>
    </div>
  );
};

export default Upload;

