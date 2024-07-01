"use client";

import { useUser } from "@clerk/nextjs";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

const TodoEditPage = ({ params }: { params: { todoId: string } }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { user } = useUser();

  const fetchDetaiTodo = async () => {
    const response = await axios.get(`/api/todo/${params.todoId}`);
    if (response) {
      setTitle(response.data.data.title);
      setDescription(response.data.data.description);
    }
  };

  const handleUpdateTodo = async () => {
    try {
      const response = await axios.patch(`/api/todo/${params.todoId}`, {
        title,
        description,
      });

      if (response) {
        window.location.href = "/";
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDetaiTodo();
  }, []);
  return (
    <>
      <div className=" flex justify-center items-center h-screen bg-zinc-800">
        <div className="flex-col">
          <h1 className="text-xl font-bold ">Form Edit Todo</h1>
          <form onSubmit={handleUpdateTodo} method="post">
            <div className="my-4">
              <label htmlFor="title" className="font-bold">
                Judul Todo
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full py-2 px-2 text-black rounded placeholder:text-black mt-2 placeholder:text-sm placeholder:px-2"
                placeholder="Masukkan Judul Todo yang diinginkan!"
              />
            </div>
            <div className="my-4">
              <label htmlFor="description" className="font-bold">
                Deskripsi Todo
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="py-4 w-full px-2 text-black rounded  mt-2 placeholder:text-black placeholder:text-sm"
                placeholder="Masukkan Judul Todo yang diinginkan!"
              />
            </div>
            <div className="my-4">
              <button
                type="submit"
                className="bg-green-700 text-white text-center w-full font-bold rounded shadow-lg py-2 hover:bg-green-500"
              >
                Update Todo
              </button>
            </div>
            <div className="my-4 flex">
              <Link
                href={"/"}
                className="bg-red-700 text-white text-center w-full font-bold rounded shadow-lg py-2 hover:bg-red-500"
              >
                Batal
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default TodoEditPage;
