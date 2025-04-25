/* eslint-disable no-plusplus */
export type ValidationRule = {
  description: string;
  validate: (input: string) => boolean;
};

export class PatternValidator {
  private pattern: string;
  public rules: ValidationRule[] = [];
  public fullyParsed: boolean = true;

  constructor(pattern: string) {
    this.pattern = pattern;
    this.rules = this.parsePattern(pattern);
  }

  private parsePattern(pattern: string): ValidationRule[] {
    const rules: ValidationRule[] = [];
    let recognized = 0;

    if (pattern.includes("(?=.*[A-Z])")) {
      recognized++;
      rules.push({
        description: "At least one uppercase letter",
        validate: input => /[A-Z]/.test(input),
      });
    }

    if (pattern.includes("(?=.*[a-z])")) {
      recognized++;
      rules.push({
        description: "At least one lowercase letter",
        validate: input => /[a-z]/.test(input),
      });
    }

    if (pattern.includes("(?=.*\\d)")) {
      recognized++;
      rules.push({
        description: "At least one number",
        validate: input => /\d/.test(input),
      });
    }

    if (pattern.includes("(?=.*[!@#$%^&*])")) {
      recognized++;
      rules.push({
        description: "At least one special character (!@#$%^&*)",
        validate: input => /[!@#$%^&*]/.test(input),
      });
    }

    if (/^\^\d+$/.test(pattern)) {
      recognized++;
      rules.push({
        description: "Only digits allowed",
        validate: input => /^\d+$/.test(input),
      });
    }

    if (pattern.includes("(?!.*\\s)")) {
      recognized++;
      rules.push({
        description: "No spaces allowed",
        validate: input => !/\s/.test(input),
      });
    }

    // Determine how many positive lookaheads (e.g. (?=...)) exist
    const patternParts = (pattern.match(/\(\?=/g) || []).length;

    // If we found fewer rules than expected, it's only partially parsed
    this.fullyParsed = patternParts === recognized;

    return rules;
  }

  public validate(input: string): { rule: ValidationRule; valid: boolean }[] {
    return this.rules.map(rule => ({
      rule,
      valid: rule.validate(input),
    }));
  }

  public isValid(input: string): boolean {
    return this.rules.every(rule => rule.validate(input));
  }
}
