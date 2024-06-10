import mongoose from "mongoose";

export const doc = {
  assetId: {
    required: true,
    type: mongoose.Schema.Types.String
  },
  secureUrl: {
    required: true,
    type: mongoose.Schema.Types.String
  },
  signatures: {
    required: true,
    type: [mongoose.Schema.Types.String]
  },
  url: {
    required: true,
    type: mongoose.Schema.Types.String
  }
} as const;

export const founder = {
  email: {
    required: true,
    type: mongoose.Schema.Types.String
  },
  firstName: {
    type: mongoose.Schema.Types.String
  },
  lastName: {
    type: mongoose.Schema.Types.String
  },
  share: {
    type: mongoose.Schema.Types.Number
  }
} as const;

export const image = {
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

export const signatory = {
  email: {
    required: true,
    type: mongoose.Schema.Types.String
  },
  firstName: {
    type: mongoose.Schema.Types.String
  },
  lastName: {
    type: mongoose.Schema.Types.String
  }
} as const;
