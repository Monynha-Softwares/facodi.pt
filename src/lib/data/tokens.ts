import tokens from "../../../tokens.json" assert { type: "json" };

type DesignTokens = typeof tokens;

export const designTokens: DesignTokens = tokens;
