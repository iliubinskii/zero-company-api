import React from "react";
import type { Template } from "../providers";

export const FoundingAgreement: Template = ({ signatories }) => (
  <html>
    <head>
      <meta charSet="utf8" />
      <title>Founding Agreement</title>
    </head>
    <body>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "40px",
          padding: "20px"
        }}
      >
        {/* Title */}
        <h1
          style={{
            margin: "0px",
            padding: "0px",
            textAlign: "center"
          }}
        >
          Founding Agreement
        </h1>
        {/* Title END */}

        {/* Demo notice */}
        <div
          style={{
            display: "flex",
            justifyContent: "center"
          }}
        >
          <div
            style={{
              border: "2px solid red",
              fontSize: "25px",
              margin: "auto",
              padding: "20px"
            }}
          >
            This demo of a founding agreement has no legal force.
          </div>
        </div>
        {/* Demo notice END */}

        {/* Contents */}
        <div
          style={{
            alignItems: "center",
            background: "lightGray",
            color: "gray",
            display: "flex",
            fontSize: "25px",
            height: "300px",
            justifyContent: "center"
          }}
        >
          Some text here
        </div>
        {/* Contents */}

        {/* Signatures */}
        {signatories.map(signatory => (
          <div
            style={{
              alignItems: "center",
              display: "flex",
              gap: "20px"
            }}
          >
            {/* Full name */}
            <div
              style={{
                display: "flex",
                flexDirection: "column"
              }}
            >
              {signatory.role}:
              <text-field
                name="Full Name"
                role={signatory.role}
                style={{
                  display: "inline-block",
                  height: "20px",
                  width: "160px"
                }}
              />
            </div>
            {/* Full name END */}

            {/* Date */}
            <div
              style={{
                display: "flex",
                flexDirection: "column"
              }}
            >
              Date:
              <date-field
                name="Date"
                role={signatory.role}
                style={{
                  display: "inline-block",
                  height: "20px",
                  width: "100px"
                }}
              />
            </div>
            {/* Date END */}

            {/* Signature */}
            <signature-field
              name={`${signatory.role}'s Signature`}
              role={signatory.role}
              style={{
                display: "inline-block",
                height: "80px",
                width: "160px"
              }}
            />
            {/* Signature END */}
          </div>
        ))}
        {/* Signatures END */}
      </div>
    </body>
  </html>
);
