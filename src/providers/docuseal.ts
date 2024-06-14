import {
  DOCUSEAL_API_KEY,
  DOCUSEAL_FOLDER_NAME,
  DOCUSEAL_SEND_EMAIL
} from "../config";
import type { DigitalDocument, Signatory } from "../schema";
import { DOCUSEAL_ENDPOINT } from "../consts";
import type { FC } from "react";
import { renderToString } from "react-dom/server";
import zod from "zod";

/**
 * Create a digital document
 * @param name - The name of the document
 * @param template - The template to use
 * @param signatories - The signatories to use
 * @param metadata - The metadata to use
 * @returns The digital document
 */
export async function createDigitalDocument(
  name: string,
  template: Template,
  signatories: readonly Signatory[],
  metadata?: string | null
): Promise<DigitalDocument> {
  const templateId = await createTemplate(
    name,
    template,
    signatories,
    metadata
  );

  const digitalDocument = await createSubmission(templateId, signatories);

  return digitalDocument;
}

/**
 * Parse the template with the metadata
 * @param template - The template to parse
 * @param signatories - The signatories to use
 * @param metadata - The metadata to use
 * @returns The parsed template
 */
export function parseTemplate(
  template: Template,
  signatories: readonly Signatory[],
  metadata?: string | null
): string {
  return renderToString(template({ metadata, signatories }));
}

/**
 * Create a submission
 * @param templateId - The template ID
 * @param signatories - The signatories
 * @returns The submission
 */
async function createSubmission(
  templateId: number,
  signatories: readonly Signatory[]
): Promise<DigitalDocument> {
  const response = await fetch(DOCUSEAL_ENDPOINT.SUBMISSIONS, {
    body: JSON.stringify({
      order: "random",
      send_email: DOCUSEAL_SEND_EMAIL,
      submitters: signatories.map(({ email, name, role }) => {
        return { email, name, role };
      }),
      template_id: templateId
    }),
    headers: {
      "Content-Type": "application/json",
      "X-Auth-Token": DOCUSEAL_API_KEY
    },
    method: "POST"
  });

  const json: unknown = await response.json();

  const [{ embed_src, id }] = SubmissionValidationSchema.parse(json);

  return { embedSrc: embed_src, signatures: [], submissionId: id };
}

/**
 * Create a template
 * @param name - The name of the document
 * @param template - The template to use
 * @param signatories - The signatories to use
 * @param metadata - The metadata to use
 * @returns The template ID
 */
async function createTemplate(
  name: string,
  template: Template,
  signatories: readonly Signatory[],
  metadata?: string | null
): Promise<number> {
  const html = parseTemplate(template, signatories, metadata);

  const response = await fetch(DOCUSEAL_ENDPOINT.TEMPLATES_HTML, {
    body: JSON.stringify({ folder_name: DOCUSEAL_FOLDER_NAME, html, name }),
    headers: {
      "Content-Type": "application/json",
      "X-Auth-Token": DOCUSEAL_API_KEY
    },
    method: "POST"
  });

  const json: unknown = await response.json();

  const { id } = TemplateValidationSchema.parse(json);

  return id;
}

export type Template = FC<{
  metadata?: string | null | undefined;
  signatories: readonly Signatory[];
}>;

const SubmissionValidationSchema = zod
  .array(
    zod.object({
      embed_src: zod.string().min(1),
      id: zod.number()
    })
  )
  .nonempty();

const TemplateValidationSchema = zod.object({
  id: zod.number()
});
