import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';


export async function GET() {
    const todos = await prisma.todo.findMany();
    return NextResponse.json(todos);
  }
  
  export async function POST(request: Request) {
    try {
      const body = await request.json();
      const { title } = body;
  
      if (!title || typeof title !== 'string') {
        return NextResponse.json({ error: 'Invalid title' }, { status: 400 });
      }
  
      // ✅ Replace with real user ID or use a temp one that exists
      const userId = '7957a974-d816-4d7c-98b3-e6e5b10c1bd2'; // make sure this exists in your User table
  
      const todo = await prisma.todo.create({
        data: {
          title,
          userId,
        },
      });
  
      return NextResponse.json(todo); // ✅ make sure this line runs
    } catch (err) {
      console.error('Error in POST /api/todo:', err);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  }


export async function PUT(request: Request) {
  const { id, title, completed } = await request.json();

  const updated = await prisma.todo.update({
    where: { id },
    data: { title, completed },
  });

  return NextResponse.json(updated);
}

export async function DELETE(request: Request) {
  const { id } = await request.json();

  await prisma.todo.delete({ where: { id } });

  return NextResponse.json({ message: 'Deleted successfully' });
}
