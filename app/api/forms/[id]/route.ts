import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

interface Params {
  params: {
    id: string;
  };
}

export async function GET(request: Request, { params }: Params) {
  const id = Number(params.id);
  if (Number.isNaN(id)) {
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
  }

  const form = await prisma.forms.findUnique({
    where: { id },
    include: { form_content: { orderBy: { order: 'asc' } } },
  });

  if (!form) {
    return NextResponse.json({ error: 'Form not found' }, { status: 404 });
  }

  return NextResponse.json(form);
}