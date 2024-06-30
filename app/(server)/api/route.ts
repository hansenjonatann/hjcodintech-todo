"use server";

import { NextResponse } from "next/server";

export const GET = async () => {
  return NextResponse.json({
    status: true,
    statusCode: 200,
    message: "Api berhasil berjalan",
    data: {
      user: 'tes'
    }
  });
};
