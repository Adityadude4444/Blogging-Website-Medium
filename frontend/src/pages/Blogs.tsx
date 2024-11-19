import Appbar from "../components/Appbar";
import { useblog } from "../hooks/Useblog";
import Blog from "./Blog";

const Blogs = () => {
  const { loading, blogs } = useblog();
  return (
    <div>
      <Appbar />
      <div className="flex justify-center">
        <div>
          {loading ? (
            <div>Loading</div>
          ) : (
            <div>
              {blogs.map((blog) => (
                <Blog
                  key={blog.id}
                  title={blog.title}
                  content={blog.content}
                  authorname={blog.author.name || "Anonymous"}
                  date={"3rd Nov 2024"}
                  id={blog.id}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
