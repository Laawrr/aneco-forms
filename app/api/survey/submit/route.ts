import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "../../../../lib/prisma";

const SubmitSurveySchema = z.object({
  form_id: z.number().int(),
  name: z.string().optional(),
  address: z.string().optional(),
  email: z.string().optional(),
  contact_no: z.string().optional(),
  assisting_staff: z.string().optional(),
  answers: z
    .array(
      z.object({
        form_content_id: z.number().int().optional(),
        rating: z.number().optional(),
      })
    )
    .optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parse = SubmitSurveySchema.safeParse(body);
    if (!parse.success) {
      return NextResponse.json({ error: parse.error.errors }, { status: 400 });
    }

    const { form_id, name, address, email, contact_no, assisting_staff, answers } = parse.data;

    // Use a transaction to ensure both record and contents are created together
    const created = await prisma.$transaction(async (tx: any) => {
      const record = await tx.survey_record.create({
        data: {
          name,
          address,
          email,
          contact_no,
          assisting_staff,
          form_id,
        },
      });

      if (answers && answers.length > 0) {
        await tx.survey_content.createMany({
          data: answers.map((a) => ({ survey_id: record.id, form_content_id: a.form_content_id ?? null, rating: a.rating ?? null })),
        });
      }

      const result = await tx.survey_record.findUnique({ where: { id: record.id }, include: { survey_content: true } });
      return result;
    });

    return NextResponse.json({ success: true, survey: created }, { status: 201 });
  } catch (err) {
    console.error('Error in /api/survey/submit:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
