import { getStudentsDb, addStudentDb } from "@/db/studentDb";
import { NextRequest } from "next/server";
import StudentInterface from "@/types/StudentInterface";
export async function GET(): Promise<Response> {
  const students = await getStudentsDb();

  return new Response(JSON.stringify(students), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
export async function POST(req: NextRequest): Promise<Response> {
  try {
    const body = await req.json();
    const { firstName, lastName, middleName, groupId } = body;

    if (!firstName || !lastName || !groupId) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const newStudent: StudentInterface = await addStudentDb({
      firstName,
      lastName,
      middleName: middleName || "",
      groupId: Number(groupId),
    });

    return new Response(JSON.stringify(newStudent), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Failed to add student:", err);
    return new Response(JSON.stringify({ error: "Failed to add student" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
