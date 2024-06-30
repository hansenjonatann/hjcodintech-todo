"use client";

import Link from "next/link";

interface TodoCardProps {
  todos: any;
}

const TodoCard = ({ todos }: TodoCardProps) => {
  return (
    <>
      <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3">
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
                  <Link href="/" className="bg-blue-600 px-4 py-2 rounded">
                    Ubah
                  </Link>
                  <Link href="/" className="bg-red-600 px-4 py-2 rounded">
                    Hapus
                  </Link>
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
