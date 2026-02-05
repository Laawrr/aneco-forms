import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "../../../lib/prisma";

const CreateFormSchema = z.object({
  form_name: z.string().min(1),
  form_description: z.string().optional(),
  user_id: z.number().int().optional(),
  form_content: z
    .array(
      z.object({
        form_content_description: z.string().min(1),
        order: z.number().optional(),
        required: z.boolean().optional(),
      })
    )
    .optional(),
});

export async function GET() {
  const forms = await prisma.forms.findMany({
    include: { form_content: true },
    orderBy: { id: "desc" },
  });
  return NextResponse.json(forms);
}

export async function POST(request: Request) {
  const body = await request.json();
  const parse = CreateFormSchema.safeParse(body);
  if (!parse.success) {
    return NextResponse.json({ error: parse.error.errors }, { status: 400 });
  }

  const { form_name, form_description, user_id, form_content } = parse.data;

  const created = await prisma.forms.create({
    data: {
      form_name,
      form_description,
      user_id: user_id ?? 1,
      form_content: form_content
        ? { create: form_content.map((c) => ({ form_content_description: c.form_content_description, order: c.order, required: c.required ?? false })) }
        : undefined,
    },
    include: { form_content: true },
  });

  return NextResponse.json(created, { status: 201 });
}
