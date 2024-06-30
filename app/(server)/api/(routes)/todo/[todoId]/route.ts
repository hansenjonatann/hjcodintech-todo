"use server";

import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

export const GET = async (
  req: NextRequest,
  { params }: { params: { todoId: string } }
) => {
  const todo = await db.todo.findFirst({
    where: {
      id: params.todoId,
    },
  });

  if (todo) {
    return NextResponse.json({
      status: true,
      statusCode: 200,
      message: `Todo Detail ${todo.title}`,
      data: todo,
    });
  }

  if (!todo) {
    return NextResponse.json({
      status: false,
      statusCode: 404,
      message: "Todo tidak ada",
      data: null,
    });
  }
};

// export const PATCH = async (
//   req: NextRequest,
//   { params }: { params: { todoId: string } }
// ) => {
//   const body = await req.json();
// };
