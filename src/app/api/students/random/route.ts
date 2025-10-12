import { NextRequest } from "next/server";
import { addRandomStudentsDb } from "@/db/studentDb";
import type StudentInterface from "@/types/StudentInterface";

export async function POST(req: NextRequest): Promise<Response> {
  try {
    const url = new URL(req.url);
    const amount = Number(url.searchParams.get("amount") || 1);

    const newFios = await addRandomStudentsDb(amount);

    // Преобразуем FioInterface в StudentInterface, чтобы клиент получил id
    const newStudents: StudentInterface[] = newFios.map((f, i) => ({
      id: Date.now() + i, // временный id, если в БД нет автоинкремента
      firstName: f.firstName,
      lastName: f.lastName,
      middleName: f.middleName || "",
      groupId: 1,
    }));

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
