import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND } from "../config";

interface Blog {
  title: string;
  content: string;
  id: string;
  createdAt: string;
  author: {
    name: string;
  };
}

export const useblog = (id?: string) => {
  const [loading, setloading] = useState(true);
  const [blogs, setblogs] = useState<Blog[]>([]);
  const [blog, setblog] = useState<Blog | null>(null);

  useEffect(() => {
    if (id) {
      axios
        .get(`${BACKEND}/api/v1/blog/get/${id}`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((response) => {
          setblog(response.data.blog);
          setloading(false);
        });
    } else {
      // Fetch all blogs
      axios
        .get(`${BACKEND}/api/v1/blog/bulk`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((response) => {
          setblogs(response.data.blogs);
          setloading(false);
        });
    }
  }, [id]);

  return { loading, blogs, blog };
};
