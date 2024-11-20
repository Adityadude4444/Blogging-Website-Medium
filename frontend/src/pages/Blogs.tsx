import Appbar from "../components/Appbar";
import Loading from "../components/minicomponents/Loading";
import { useblog } from "../hooks/Useblog";
import Blog from "./Blog";

const Blogs = () => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };
  const { loading, blogs } = useblog();
  return (
    <div>
      <Appbar />
      <div className="flex justify-center">
        <div>
          {loading ? (
            <div>
              <Loading />
              <Loading />
              <Loading />
              <Loading />
            </div>
          ) : (
            <div>
              {blogs.map((blog) => (
                <Blog
                  key={blog.id}
                  title={blog.title}
                  content={blog.content}
                  authorname={blog.author.name || "Anonymous"}
                  date={blog?.createdAt ? formatDate(blog.createdAt) : ""}
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
