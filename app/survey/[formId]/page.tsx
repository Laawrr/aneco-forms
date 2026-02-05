import prisma from "../../../lib/prisma";
import SurveyForm from "../SurveyForm.client";
import Image from "next/image";

interface Props {
  params: { formId: string };
}

export default async function SurveyPage({ params }: Props) {
  const id = Number(params.formId);
  if (Number.isNaN(id)) {
    return <div className="p-8">Invalid form id</div>;
  }

  const form = await prisma.forms.findUnique({
    where: { id },
    include: { form_content: { orderBy: { order: 'asc' } } },
  });

  if (!form) return <div className="p-8">Form not found</div>;

  // Serialize data to be client-safe (remove Dates and other non-serializable values)
  const formData = {
    ...form,
    form_content: form.form_content.map((fc) => ({
      id: fc.id,
      form_content_description: fc.form_content_description,
      order: fc.order ?? undefined,
      required: !!fc.required,
    })),
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <main className="mx-auto max-w-3xl rounded-md bg-white p-6 shadow">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16">
            <Image src="/aneco-logo.svg" alt="ANECO" width={64} height={64} />
          </div>
          <div>
            <h1 className="text-xl font-semibold">{formData.form_name}</h1>
            <p className="text-sm text-gray-500">{formData.form_description}</p>
          </div>
        </div>

        <div className="mt-6">
          <SurveyForm form={formData} />
        </div>
      </main>
    </div>
  );
}
