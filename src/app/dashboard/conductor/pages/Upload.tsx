import { Card } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Upload = () => {
  return (
    <div className="">
      <h1 className="text-2xl font-bold mb-2">Upload</h1>
      <p className="mb-4 text-gray-600">Greetings Conductors! Please upload your file using the form below.</p>
      <hr/>
      <Input type="file" className="border border-gray-200 rounded-lg mb-4 mt-4" />
      <hr/>
      <Card className="h-[400px] w-full mt-4 bg-white shadow-md">
        {/* Display file */}
      </Card>
      <Button className="w-full border border-gray-200 rounded-lg mb-4 mt-4">Submit</Button>
    </div>
  );
};

export default Upload;

