import { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { MdOutlineEdit } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";

const Post = ({ post, setPosts, posts }) => {
  const [editPost, setEditPost] = useState(false);
  const [title, setTitle] = useState(post.title);
  const [description, setDescription] = useState(post.description);

  function handelEdit() {
    setEditPost(!editPost);
  }
  async function handelDelete(id) {
    const response = await fetch(`http://localhost:5000/delete-blog/${id}`, {
      method: "DELETE",
    });
    if (response.status === 200) {
      setPosts(posts.filter((post) => post._id !== id));
      toast.success("Blog is deleted successfully");
    } else {
      toast.error("Something Went Wrong");
    }
  }

  async function handelUpdate() {
    const response = await fetch(
      `http://localhost:5000/update-blog/${post._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      }
    );
    if (response.status == 200) {
      const data = await response.json();
      const updatedPost = { ...data.blogs, title, description };
      const updatedPosts = posts.map(p => (p._id === post._id ? updatedPost : p));
      setPosts(updatedPosts);
      setEditPost(!editPost);
    } else {
      console.log("error");
    }
  }
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="w-[40vw] border-2 mx-auto p-3 rounded-md shadow-md">
        <div className="flex justify-end text-lg gap-3 ">
          <AiFillDelete
            onClick={() => handelDelete(post._id)}
            className="text-gray-400 hover:text-red-400 cursor-pointer hover:scale-110 transition-all"
          />

          <MdOutlineEdit
            onClick={() => handelEdit()}
            className={`${
              editPost ? "text-red-400 scale-110" : "text-gray-400"
            } text-gray-400 hover:text-red-400  cursor-pointer hover:scale-110 transition-all `}
          />
        </div>
        <h2 className="text-lg font-bold my-2">
          {editPost ? (
            <input
              className="bg-gray-300 w-full"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          ) : (
            post.title
          )}
        </h2>

        <h3 className="break-all text-gray-500 font-semibold">
          {editPost ? (
            <textarea
              className="bg-gray-300 w-full "
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          ) : (
            post.description
          )}
        </h3>
        {editPost && (
          <button
            onClick={handelUpdate}
            className="bg-purple-400 hover:bg-purple-600 px-3 py-1 my-1 rounded-md font-bold text-white"
          >
            Save
          </button>
        )}
      </div>
    </>
  );
};

export default Post;
