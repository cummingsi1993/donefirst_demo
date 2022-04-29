import React from "react";

import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormHelperText from "@mui/material/FormHelperText";
import FormLabel from "@mui/material/FormLabel";
import { Typography, TextField } from "@mui/material";
import { savePatientRegistration } from "../repository";

import {
  PatientRegistrationForm,
  ValidatePatientRegistration,
  ValidationResult,
  IsPatientRegistration,
} from "../model";

export const Register: React.FC<{}> = () => {
  const [patient, setPatient] = React.useState<PatientRegistrationForm>({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    phoneNumber: "",
    email: "",
    address: "",
    licensePhoto: {},
    appointmentTime: "",
  });

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
    savePatientRegistration(patient);
  };

  return (
    <Container>
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
