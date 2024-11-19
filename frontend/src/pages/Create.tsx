import React, { useState } from "react";
import Appbar from "../components/Appbar";
import { Input } from "../components/minicomponents/Input";
import { Blogcreation } from "@aditya_4444/medium-zod1";

const Create = () => {
  const [bloginputs, setbloginputs] = useState<Blogcreation>({
    title: "",
    content: "",
  });
  return (
    <div>
      <Appbar />
      <div className="flex flex-col gap-3 justify-center">
        <Input
          label="Title"
          placeholder="Enter title"
          onchange={(e) => {
            setbloginputs({
              ...bloginputs,
              title: e.target.value,
            });
          }}
        />
        <Input
          label="Content"
          placeholder=""
          onchange={(e) => {
            setbloginputs({
              ...bloginputs,
              content: e.target.value,
            });
          }}
        />
      </div>
    </div>
  );
};

export default Create;
