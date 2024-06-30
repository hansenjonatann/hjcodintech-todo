"use server";

import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@clerk/nextjs/server";
const db = new PrismaClient();

export const GET = async (req: NextRequest) => {
  const todos = await db.todo.findMany();
  return NextResponse.json({
    status: true,
    statusCode: 200,
    message: "List Todo",
    data: todos,
  });
};

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const todo = await db.todo.create({
    data: {
      userId: body.userId,
      title: body.title,
      description: body.description,
    },
  });

  if (todo) {
    return NextResponse.json({
      status: true,
      statusCode: 201,
      message: "Todo berhasil ditambahkan!",
      data: todo,
    });
  }

  if (!todo) {
    return NextResponse.json({
      status: false,
      statusCode: 400,
      message: "Terjadi kesalahan",
    });
  }
};
