"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface TodoCardProps {
  todos: any;
}

const TodoCard = ({ todos }: TodoCardProps) => {
  const handleDeleteTodo = async (todo: any) => {
    const res = await axios.delete(`/api/todo/${todo}`);
    if (res) {
      confirm("Apakah anda yakin ingin menghapus TODO ini?");
      window.location.reload();
    }
  };
  return (
    <>
      <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 lg:gap-x-4">
        {todos.map((todo: any, index: number) => (
          <>
            <div
              key={index}
              className="bg-white shadow-md rounded-lg w-56 mt-4"
            >
              <div className="flex-col p-2">
                <h5 className="font-semibold text-black">{todo.title}</h5>
                <p className="text-black">{todo.description}</p>
                <div className="flex justify-between mt-5 text-sm">
                  <Link
                    href={`/todo/edit/${todo.id}`}
                    className="bg-blue-600 px-4 py-2 rounded"
                  >
                    Ubah
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleDeleteTodo(todo.id)}
                    className="bg-red-600 px-4 py-2 rounded"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          </>
        ))}
      </div>
    </>
  );
};

export default TodoCard;
