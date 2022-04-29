export type PatientRegistration = {
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  phoneNumber: string;
  email: string;
  address: string;
  licensePhoto: {};
  appointmentTime: Date;
};

export type Partial<T> = {
  [Property in keyof T]?: T[Property] | null;
};

export type Form<Questions> = Partial<{
  readonly [Property in keyof Questions]: Questions[Property] | "";
}>;

export type PatientRegistrationForm = Form<PatientRegistration>;

export type ValidationResult<T> = {
  [Property in keyof T]-?: { valid: boolean; message: string };
};

function IsPatientRegistrationForm(form: any): form is PatientRegistrationForm {
  return (
    !!form &&
    !!form.firstName &&
    typeof form.firstName === "string" &&
    !!form.lastName &&
    typeof form.lastName === "string" &&
    !!form.dateOfBirth &&
    (typeof form.dateOfBirth === "object" || form.dateOfBirth === "") &&
    !!form.appointmentTime &&
    (typeof form.appointmentTime === "object" || form.appointmentTime === "") &&
    !!form.phoneNumber &&
    typeof form.phoneNumber === "string" &&
    !!form.email &&
    typeof form.email === "string" &&
    !!form.address &&
    typeof form.address === "string" &&
    !!form.licensePhoto &&
    typeof form.licensePhoto === "object"
  ); //TODO: add some additional checks for license.
}

export function IsPatientRegistration(
  registration: any
): registration is PatientRegistration {
  return (
    !!registration &&
    !!registration.firstName &&
    typeof registration.firstName === "string" &&
    !!registration.lastName &&
    typeof registration.lastName === "string" &&
    !!registration.dateOfBirth &&
    typeof registration.dateOfBirth === "object" &&
    registration.dateOfBirth instanceof Date &&
    !!registration.appointmentTime &&
    typeof registration.appointmentTime === "object" &&
    registration.appointmentTime instanceof Date &&
    !!registration.phoneNumber &&
    typeof registration.phoneNumber === "string" &&
    !!registration.email &&
    typeof registration.email === "string" &&
    !!registration.address &&
    typeof registration.address === "string" &&
    !!registration.licensePhoto &&
    typeof registration.licensePhoto === "object"
  ); //TODO: add some additional checks for license.
}

const rules = {
  requiredRule: (value: any) => !!value,
  dateMustBeInFuture: (value: any) => new Date(value) > new Date(),
  dateMustBeInPast: (value: any) => new Date(value) < new Date(),
  emailAddressRule: (value: any) => true,
  phoneNumerRule: (value: any) => true,
};

const runRules =
  <T>(rules: ((v: T) => boolean)[], failureMessage: string) =>
  (value: T): { valid: boolean; message: string } => {
    const ruleResult = rules
      .map((r) => r(value))
      .reduce((a, b) => a && b, true);
    return { valid: ruleResult, message: ruleResult ? "" : failureMessage };
  };

const validate = {
  firstName: runRules([rules.requiredRule], "First Name is required"),
  lastName: runRules([rules.requiredRule], "Last Name is required"),
  dateOfBirth: runRules(
    [rules.requiredRule, rules.dateMustBeInPast],
    "Date of birth is required and must be in the past"
  ),
  phoneNumber: runRules(
    [rules.requiredRule, rules.phoneNumerRule],
    "Phone number is required and must be a valid phone number"
  ),
  licensePhoto: runRules(
    [rules.requiredRule],
    "A license photo must be provided."
  ),

  address: runRules([rules.requiredRule], "Address is required"),
  appointmentTime: runRules(
    [rules.requiredRule, rules.dateMustBeInFuture],
    "Appointment time is required, and must be in the future"
  ),
  emailAddress: runRules(
    [rules.requiredRule, rules.emailAddressRule],
    "Email address is required and must be in the future"
  ),
};

export const ValidatePatientRegistration = (
  registration: PatientRegistrationForm
): ValidationResult<PatientRegistrationForm> => ({
  firstName: validate.firstName(registration.firstName),
  lastName: validate.lastName(registration.lastName),
  dateOfBirth: validate.dateOfBirth(registration.dateOfBirth),
  address: validate.address(registration.address),
  appointmentTime: validate.appointmentTime(registration.appointmentTime),
  email: validate.emailAddress(registration.email),
  licensePhoto: validate.licensePhoto(registration.licensePhoto),
  phoneNumber: validate.phoneNumber(registration.phoneNumber),
});
