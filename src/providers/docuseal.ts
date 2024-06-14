import {
  DOCUSEAL_API_KEY,
  DOCUSEAL_FOLDER_NAME,
  DOCUSEAL_SEND_EMAIL
} from "../config";
import {
  type DigitalDocument,
  type Signatory,
  preprocessEmail,
  preprocessInt
} from "../schema";
import { DOCUSEAL_ENDPOINT } from "../consts";
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

  const response = await fetch(DOCUSEAL_ENDPOINT.SUBMISSIONS, {
    body: JSON.stringify({
      order: "random",
      send_email: DOCUSEAL_SEND_EMAIL,
      submitters: signatories.map(submitters => {
        return {
          email: submitters.email,
          name: submitters.name,
          role: submitters.role
        };
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

  const submitters = SubmittersValidationSchema.parse(json);

  return {
    signatures: submitters.map(signature => {
      return {
        email: signature.email,
        embedSrc: signature.embed_src,
        name: signature.name,
        role: signature.role,
        status: signature.status
      };
    }),
    submissionId: submitters[0].submission_id
  };
}

/**
 * Get a digital document
 * @param doc - The digital document
 * @returns The updated digital document
 */
export async function getDigitalDocument(
  doc: DigitalDocument
): Promise<DigitalDocument> {
  const response = await fetch(
    `${DOCUSEAL_ENDPOINT.SUBMISSIONS}/${doc.submissionId}`,
    {
      headers: {
        "Content-Type": "application/json",
        "X-Auth-Token": DOCUSEAL_API_KEY
      },
      method: "GET"
    }
  );

  const json: unknown = await response.json();

  const submission = SubmissionValidationSchema.parse(json);

  return {
    ...doc,
    signatures: doc.signatures.map(signature => {
      const submitter = submission.submitters.find(
        ({ email }) => email === signature.email
      );

      return {
        ...signature,
        status: submitter ? submitter.status : signature.status
      };
    })
  };
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
  const html = template(signatories, metadata);

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

export type Template = (
  signatories: readonly Signatory[],
  metadata?: string | null
) => string;

const SubmissionValidationSchema = zod.object({
  submitters: zod
    .array(
      zod.object({
        email: preprocessEmail(zod.string().email()),
        status: zod.string().min(1)
      })
    )
    .nonempty()
});

const SubmittersValidationSchema = zod
  .array(
    zod.object({
      email: preprocessEmail(zod.string().email()),
      embed_src: zod.string().min(1),
      id: preprocessInt(zod.number().int().positive()),
      name: zod.string().min(1).nullable().optional(),
      role: zod.string().min(1),
      status: zod.string().min(1),
      submission_id: preprocessInt(zod.number().int().positive())
    })
  )
  .nonempty();

const TemplateValidationSchema = zod.object({
  id: preprocessInt(zod.number().int().positive())
});
