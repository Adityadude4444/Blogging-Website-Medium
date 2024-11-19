import { useParams } from "react-router-dom";
import { useblog } from "../hooks/Useblog";
import Appbar from "../components/Appbar";

const Blogpage = () => {
  const { id } = useParams();
  const { loading, blog } = useblog(id);

  return loading ? (
    <div>Loading....</div>
  ) : (
    <div>
      <Appbar />
      <div className="grid grid-cols-2 pt-8">
        <div className="h-screen flex justify-center pl-[10%]">
          <div className="flex flex-col gap-3">
            <div className="text-5xl font-extrabold">{blog?.title}</div>
            <div>Posted on 23rd Dec 2023</div>
            <div className="text-lg">{blog?.content}</div>
          </div>
        </div>
        <div className="pt-8">
          <div className="flex justify-center">
            <div className="flex flex-col gap-3">
              <div>Author</div>
              <div className="flex gap-2 items-center">
                <div
                  className="relative inline-flex items-center justify-center w-8 h-8
                 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600"
                >
                  <span className="text-xs text-gray-600 dark:text-gray-300">
                    {blog?.author.name ? blog.author.name[0] : "A"}
                  </span>
                </div>
                <div className="text-2xl font-bold">
                  {blog?.author.name ? blog.author.name : "Anonymous"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogpage;
