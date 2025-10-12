import { NextRequest } from "next/server";
import { addRandomStudentsDb, addStudentDb } from "@/db/studentDb";
import type StudentInterface from "@/types/StudentInterface";

export async function POST(req: NextRequest): Promise<Response> {
  try {
    const url = new URL(req.url);
    const amount = Number(url.searchParams.get("amount") || 1);

    const newStudents: StudentInterface[] = await addRandomStudentsDb(amount);

    return new Response(JSON.stringify(newStudents), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Failed to add random students:", err);
    return new Response(
      JSON.stringify({ error: "Failed to add random students" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
