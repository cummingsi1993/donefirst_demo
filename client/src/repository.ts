import { PatientRegistrationForm } from "./model";

const rootUrl = "http://localhost:80/api/v1";

export const savePatientRegistration = (patient: PatientRegistrationForm) =>
  fetch(`${rootUrl}/registration`, {
    method: "POST",
    body: JSON.stringify(patient),
    headers: { "Content-Type": "application/json" },
  });

export const getAllRegistrations = () => fetch(`${rootUrl}/registrations`);
