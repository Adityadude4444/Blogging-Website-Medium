import { useState } from "react";
import Appbar from "../components/Appbar";
import { Input } from "../components/minicomponents/Input";
import { Blogcreation } from "@aditya_4444/medium-zod1";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND } from "../config";

const Create = () => {
  const [bloginputs, setbloginputs] = useState<Blogcreation>({
    title: "",
    content: "",
  });
  const navigator = useNavigate();
  const createblog = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("User not authenticated. Please log in.");
      return;
    }

    try {
      const response = await axios.post(
        `${BACKEND}/api/v1/blog`,
        bloginputs, // Send blog data here
        {
          headers: {
            authorization: token, // Send token in headers
          },
        }
      );

      if (response.status === 200) {
        alert("Blog created successfully");
        navigator("/blogs");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.response?.data);
        alert(`Error: ${error.response?.data.error || "Request failed"}`);
      } else {
        console.error("Unexpected error:", error);
        alert("An unexpected error occurred.");
      }
    }
  };

  return (
    <div>
      <Appbar />
      <div className="flex justify-center">
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
          <div>
            <label className="block mb-2 text-sm text-slate-600">Content</label>
            <textarea
              onChange={(e) => {
                setbloginputs({
                  ...bloginputs,
                  content: e.target.value,
                });
              }}
              id="message"
              rows={6}
              className="w-full max-w-sm min-w-[500px] bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
              placeholder="Write your content...."
            ></textarea>
          </div>
          <button
            type="button"
            className="p-4 text-white bg-green-500 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            onClick={createblog}
          >
            Publish
          </button>
        </div>
      </div>
    </div>
  );
};

export default Create;
