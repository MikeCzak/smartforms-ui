/* eslint-disable no-plusplus */
export type ValidationRule = {
  description: string;
  validate: (input: string) => boolean;
};

export class PatternValidator {
  private pattern: string;
  public rules: ValidationRule[] = [];
  public fullyParsed: boolean = true;

  constructor(constraints: {[key: string]: any}) {
    this.pattern = constraints.pattern;
    if(this.pattern) {
      this.rules = this.parsePattern(this.pattern);
    }
    if(constraints.minLength) {
      this.rules.push({
        description: `At least ${constraints.minLength} characters`,
        validate: input => input.length >= constraints.minLength
      })
    }
    this.fullyParsed = this.rules.length > 0;
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

    if (pattern.includes("(?=.*[!@#$%&*])")) {
      recognized++;
      rules.push({
        description: "At least one special character (!@#$%&*)",
        validate: input => /[!@#$%&*]/.test(input),
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

    if (pattern === "^\\+?[1-9]\\d{1,14}$") {
      recognized++;
      rules.push({
        description: "Valid phone number (starts with optional +, one non-zero digit, then digits)",
        validate: input => /^\+?[1-9]\d{1,14}$/.test(input),
      });
    }

    if (pattern.includes("^[A-Z]{2}\\d{2}[A-Z0-9]{11,30}$")) {
      recognized++;
      rules.push({
        description: "Valid IBAN (2-letter country code, 2-digit checksum, alphanumeric rest)",
        validate: input => /^[A-Z]{2}\d{2}[A-Z0-9]{11,30}$/.test(input),
      });
    }

    if (pattern.includes("^\\S+@\\S+\\.\\S+$")) {
      recognized++;
      rules.push({
        description: "Valid email address",
        validate: input => /^\S+@\S+\.\S+$/.test(input),
      });
    }

    if (pattern.includes("^[A-Za-z0-9]+$")) {
      recognized++;
      rules.push({
        description: "Only letters and numbers allowed",
        validate: input => /^[A-Za-z0-9]+$/.test(input),
      });
    }

    if (pattern.includes("^[A-Za-z]+$")) {
      recognized++;
      rules.push({
        description: "Only letters allowed",
        validate: input => /^[A-Za-z]+$/.test(input),
      });
    }

    if (pattern.includes("(?!.*(.)\\1)")) {
      recognized++;
      rules.push({
        description: "No repeating characters",
        validate: input => !/(.).*?\1/.test(input),
      });
    }


    // Determine how many positive lookaheads (e.g. (?=...)) exist
    const patternParts = (pattern.match(/\(\?=/g) || []).length;

    return rules;
  }

  public validate(input: string): { rule: string; valid: boolean }[] {
    return this.rules.map(rule => ({
      rule: rule.description,
      valid: rule.validate(input),
    }));
  }

  public isValid(input: string): boolean {
    return this.rules.every(rule => rule.validate(input));
  }
}
