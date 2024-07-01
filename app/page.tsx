"use client";
import TodoCard from "@/components/todo-card";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const { user, isSignedIn } = useUser();
  const router = useRouter();
  if (!isSignedIn) {
    router.replace("/sign-in");
  } else {
    router.push("/");
  }

  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    const response = await axios.get("/api/todo");
    if (response) {
      setTodos(response.data.data);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);
  return (
    <>
      <div className="bg-zinc-800 h-screen flex justify-center">
        <div className="flex-col">
          <h1 className=" text-center text-white font-bold text-xl mt-16">
            HJ Codin Todo
          </h1>
          <pre className="mt-2">List dari TODO anda berada di bawah</pre>
          <div className="flex justify-center">
            <TodoCard todos={todos} />
          </div>
        </div>

        <Link
          href="/todo/create"
          className="w-12 flex justify-center items-center h-12 bg-green-800 rounded-full text-white text-center fixed bottom-5 right-5"
        >
          <Plus size={40} />
        </Link>
      </div>
    </>
  );
}
