import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '../../../../../lib/prisma';

export async function PUT(request: NextRequest) {
  const url = new URL(request.url);
  const id = url.pathname.split('/').pop(); // or use request.nextUrl if available
  const { completed } = await request.json();

  const updated = await prisma.todo.update({
    where: { id },
    data: { completed },
  });

  return NextResponse.json(updated);
}

export async function DELETE(request: NextRequest) {
  const url = new URL(request.url);
  const id = url.pathname.split('/').pop(); // or use request.nextUrl

  await prisma.todo.delete({
    where: { id },
  });

  return NextResponse.json({ message: 'Deleted' });
}
