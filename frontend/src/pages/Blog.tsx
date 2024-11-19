import { useNavigate } from "react-router-dom";

interface Blogtype {
  authorname: String;
  title: String;
  content: String;
  date: String;
  id: String;
}

const Blog = ({ authorname, title, content, date, id }: Blogtype) => {
  const navigator = useNavigate();
  return (
    <div
      className="w-screen max-w-screen-lg cursor-pointer"
      onClick={() => {
        navigator(`/blog/get/${id}`);
      }}
    >
      <div className="flex flex-col gap-2 border-b border-slate-200 pb-4 p-4">
        <div className="flex items-center text-center gap-1">
          <Avatar aname={authorname} />
          <div className="text-gray-700 font-semibold text-sm">
            {authorname}
          </div>
          <div className="text-xs text-gray-500">{date}</div>
        </div>
        <div className="font-bold text-xl">{title}</div>
        <div className="text-md">
          {content.length > 100 ? content.slice(0, 264) + "...." : content}
        </div>
        <div className="text-xs text-gray-500">
          {Math.ceil(content.length / 100)} min read
        </div>
      </div>
    </div>
  );
};

interface avatartype {
  aname: String;
}
const Avatar = ({ aname }: avatartype) => {
  return (
    <div className="relative inline-flex items-center justify-center w-5 h-5 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
      <span className="text-xs text-gray-600 dark:text-gray-300">
        {aname[0]}
      </span>
    </div>
  );
};

export default Blog;
