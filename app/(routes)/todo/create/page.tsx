"use client";

import { useUser } from "@clerk/nextjs";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const TodoCreatePage = () => {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { user } = useUser();

  const handleAddTodo = async () => {
    try {
      const response = await axios.post("/api/todo", {
        userId: user?.id,
        title: title,
        description: description,
      });

      if (response) {
        router.replace("/todo");
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className=" flex justify-center items-center h-screen bg-zinc-800">
        <div className="flex-col">
          <h1 className="text-xl font-bold ">Form Tambah Todo</h1>
          <form onSubmit={handleAddTodo} method="post">
            <div className="my-4">
              <label htmlFor="title" className="font-bold">
                Judul Todo
              </label>
              <input
                type="text"
                id="title"
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
                Simpan Todo
              </button>
            </div>
            <div className="my-4 flex">
              <Link
                href={"/todo"}
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

export default TodoCreatePage;
