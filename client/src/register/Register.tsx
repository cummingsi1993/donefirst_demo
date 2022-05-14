import React from "react";

import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import FormLabel from "@mui/material/FormLabel";
import Popover from "@mui/material/Popover";
import { Typography, TextField } from "@mui/material";
import { savePatientRegistration } from "../repository";

import {
  PatientRegistrationForm,
  ValidatePatientRegistration,
  ValidationResult,
} from "../model";

export const Register: React.FC<{}> = () => {
  const [patient, setPatient] = React.useState<PatientRegistrationForm>({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    phoneNumber: "",
    email: "",
    address: "",
    licensePhoto: "",
    appointmentTime: "",
  });

  const [errorPopover, setErrorPopover] = React.useState(false);

  const [validations, setValidations] = React.useState<
    ValidationResult<PatientRegistrationForm>
  >(ValidatePatientRegistration(patient));

  const answerQuestion =
    <T,>(question: keyof PatientRegistrationForm) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newPatient = { ...patient, ...{ [question]: e.target.value } };
      setPatient(newPatient);
      setValidations(ValidatePatientRegistration(newPatient));
    };

  const submitForm = () => {
    if (
      validations.address.valid &&
      validations.appointmentTime.valid &&
      validations.dateOfBirth.valid &&
      validations.email.valid &&
      validations.firstName.valid &&
      validations.lastName.valid &&
      validations.licensePhoto.valid &&
      validations.phoneNumber.valid
    )
      savePatientRegistration(patient);
    else {
      setErrorPopover(true);
    }
  };

  return (
    <Container>
      <Popover
        open={errorPopover}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        onClose={() => setErrorPopover(false)}
      >
        Please fix all validation errors before continuing.
      </Popover>
      <Paper>
        <Box
          sx={{
            marginTop: 8,
            padding: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography color="textPrimary" variant="h4">
            Patient Registration
          </Typography>
          <Box component="form" sx={{ mt: 3 }}>
            <Grid container spacing={2} justifyContent={"center"}>
              <Grid item xs={12} sm={6} justifyContent={"center"}>
                <TextField
                  label="First Name"
                  error={!validations.firstName.valid}
                  helperText={validations.firstName.message}
                  value={patient.firstName}
                  variant="filled"
                  onChange={answerQuestion("firstName")}
                ></TextField>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Last Name"
                  error={!validations.lastName.valid}
                  helperText={validations.lastName.message}
                  value={patient.lastName}
                  variant="filled"
                  onChange={answerQuestion("lastName")}
                ></TextField>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Email"
                  error={!validations.email.valid}
                  helperText={validations.email.message}
                  value={patient.email}
                  variant="filled"
                  onChange={answerQuestion("email")}
                ></TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl>
                  <FormLabel>Date Of Birth</FormLabel>

                  <Input
                    type="date"
                    error={!validations.dateOfBirth.valid}
                    value={patient.dateOfBirth}
                    onChange={answerQuestion("dateOfBirth")}
                  ></Input>
                  <FormHelperText>
                    {validations.dateOfBirth.message}
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Address"
                  error={!validations.address.valid}
                  helperText={validations.address.message}
                  value={patient.address}
                  variant="filled"
                  onChange={answerQuestion("address")}
                ></TextField>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl>
                  <FormLabel>Appointment Time</FormLabel>

                  <Input
                    type="date"
                    error={!validations.appointmentTime.valid}
                    value={patient.appointmentTime}
                    onChange={answerQuestion("appointmentTime")}
                  ></Input>
                  <FormHelperText>
                    {validations.appointmentTime.message}
                  </FormHelperText>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Phone Number"
                  error={!validations.phoneNumber.valid}
                  helperText={validations.phoneNumber.message}
                  value={patient.phoneNumber}
                  variant="filled"
                  onChange={answerQuestion("phoneNumber")}
                ></TextField>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl>
                  <FormLabel>License Photo</FormLabel>
                  <Input
                    type="file"
                    error={!validations.licensePhoto.valid}
                    onChange={(e) => {
                      if (
                        !(e.target instanceof HTMLInputElement) ||
                        e.target.files === null
                      )
                        return;

                      const fail = (valid: { message: string } | "isValid") =>
                        setValidations(
                          valid === "isValid"
                            ? {
                                ...validations,
                                licensePhoto: { message: "", valid: true },
                              }
                            : {
                                ...validations,
                                licensePhoto: {
                                  message: valid.message,
                                  valid: false,
                                },
                              }
                        );

                      const { files } = e.target;

                      if (files.length === 0) {
                        fail({ message: "No file was selected." });
                        return;
                      } else if (files.length > 1) {
                        fail({
                          message: "Selecting multiple files is not supported.",
                        });
                        return;
                      }

                      const file = files[0];
                      const reader = new FileReader();
                      reader.readAsBinaryString(file);
                      reader.onloadend = (_event) => {
                        if (
                          typeof reader.result !== "string" ||
                          reader.result === null
                        ) {
                          fail({ message: "Loading the file failed." });
                          return;
                        }
                        fail("isValid");
                        setPatient({
                          ...patient,
                          licensePhoto: reader.result,
                        });
                      };
                    }}
                  ></Input>
                  <FormHelperText>
                    {validations.licensePhoto.message}
                  </FormHelperText>
                </FormControl>
              </Grid>
            </Grid>
            <Button variant="outlined" onClick={submitForm}>
              Submit
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};
