import { NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/prisma';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const { completed } = await request.json();

  const updated = await prisma.todo.update({
    where: { id },
    data: { completed },
  });

  return NextResponse.json(updated);
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  await prisma.todo.delete({
    where: { id },
  });

  return NextResponse.json({ message: 'Deleted' });
}
