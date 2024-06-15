import mongoose from "mongoose";

export const founder = {
  email: {
    required: true,
    type: mongoose.Schema.Types.String
  },
  name: {
    type: mongoose.Schema.Types.String
  },
  share: {
    type: mongoose.Schema.Types.Number
  }
} as const;

export const signatory = {
  email: {
    required: true,
    type: mongoose.Schema.Types.String
  },
  name: {
    type: mongoose.Schema.Types.String
  },
  role: {
    required: true,
    type: mongoose.Schema.Types.String
  }
} as const;

export const signature = {
  email: {
    required: true,
    type: mongoose.Schema.Types.String
  },
  embedSrc: {
    required: true,
    type: mongoose.Schema.Types.String
  },
  name: {
    type: mongoose.Schema.Types.String
  },
  role: {
    required: true,
    type: mongoose.Schema.Types.String
  },
  status: {
    required: true,
    type: mongoose.Schema.Types.String
  }
} as const;

export const webAccessibleImage = {
  assetId: {
    required: true,
    type: mongoose.Schema.Types.String
  },
  height: {
    required: true,
    type: mongoose.Schema.Types.Number
  },
  name: {
    required: true,
    type: mongoose.Schema.Types.String
  },
  secureUrl: {
    required: true,
    type: mongoose.Schema.Types.String
  },
  url: {
    required: true,
    type: mongoose.Schema.Types.String
  },
  width: {
    required: true,
    type: mongoose.Schema.Types.Number
  }
} as const;

export const digitalDocument = {
  signatures: {
    required: true,
    type: [signature]
  },
  status: {
    type: mongoose.Schema.Types.String
  },
  submissionId: {
    required: true,
    type: mongoose.Schema.Types.Number
  }
} as const;
