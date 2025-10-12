import { deleteStudentDb } from "@/db/studentDb";
import { NextRequest } from "next/server";

export async function DELETE(req: NextRequest): Promise<Response> {
  // Получаем URL запроса
  const url = new URL(req.url);
  // Извлекаем id из pathname, предполагаем, что маршрут /api/students/[id]
  const pathParts = url.pathname.split("/");
  const idParam = pathParts[pathParts.length - 1];

  const studentId = Number(idParam);

  if (isNaN(studentId)) {
    return new Response(JSON.stringify({ error: "Invalid student ID" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    await deleteStudentDb(studentId);
    return new Response(null, { status: 204 });
  } catch (err) {
    console.error("Failed to delete student:", err);
    return new Response(JSON.stringify({ error: "Failed to delete student" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
