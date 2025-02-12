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

export const PATCH = async (
  req: NextRequest,
  { params }: { params: { todoId: string } }
) => {
  const body = await req.json();
  const todo = await db.todo.update({
    data: {
      title: body.title,
      description: body.description,
    },
    where: {
      id: params.todoId,
    },
  });

  if (todo) {
    return NextResponse.json({
      status: true,
      statusCode: 202,
      message: "Todo berhasil diupdate",
      data: todo,
    });
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { todoId: string } }
) => {
  const todo = await db.todo.delete({
    where: {
      id: params.todoId,
    },
  });

  if (todo) {
    return NextResponse.json({
      status: true,
      statusCode: 200,
      message: "Todo berhasil dihapus!",
      data: todo,
    });
  }
};
