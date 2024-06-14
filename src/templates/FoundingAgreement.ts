/* eslint-disable no-inline-comments -- Ok */
/* eslint-disable spaced-comment -- Ok */

import type { Template } from "../providers";

export const FoundingAgreement: Template = signatories => /*html*/ `
    <html>
      <head>
        <meta charset="utf8" />
        <title>Founding Agreement</title>
      </head>
      <body>
        <div
          style="display: flex; flex-direction: column; gap: 40px; padding: 20px;"
        >
          <h1 style="margin: 0px; padding: 0px; text-align: center;">
            Founding Agreement
          </h1>
          <div style="display: flex; justify-content: center;">
            <div
              style="border: 2px solid red; font-size: 25px; margin: auto; padding: 20px;"
            >
              This demo of a founding agreement has no legal force.
            </div>
          </div>
          <div
            style="align-items: center; background: lightGray; color: gray; display: flex; font-size: 25px; height: 300px; justify-content: center;"
          >
            Some text here
          </div>
          ${signatories
            .map(
              signatory => /*html*/ `
              <div style="align-items: center; display: flex; gap: 20px;">
                <div style="display: flex; flex-direction: column;">
                  ${signatory.role}:
                  <text-field
                    name="Full Name"
                    role="${signatory.role}"
                    style="display: inline-block; height: 20px; width: 160px;"
                  />
                </div>
                <div style="display: flex; flex-direction: column;">
                  Date:
                  <date-field
                    name="Date"
                    role="${signatory.role}"
                    style="display: inline-block; height: 20px; width: 100px;"
                  />
                </div>
                <signature-field
                  name="${signatory.role}'s Signature"
                  role="${signatory.role}"
                  style="display: inline-block; height: 80px; width: 160px;"
                />
              </div>
            `
            )
            .join("")}
        </div>
      </body>
    </html>
  `;
