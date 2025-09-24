
import { deleteStudentDb } from '@/db/studentDb';
import { NextRequest } from 'next/server';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<Response> {
  const { id } = params;


  const studentId = Number(id);
  if (isNaN(studentId)) {
    return new Response(JSON.stringify({ error: 'Invalid student ID' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    await deleteStudentDb(studentId);
    return new Response(null, { status: 204 }); // 204 No Content — стандарт для успешного удаления
  } catch (error) {
    console.error('Failed to delete student:', error);
    return new Response(JSON.stringify({ error: 'Failed to delete student' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}