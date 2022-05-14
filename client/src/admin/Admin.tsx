import React from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

import { getAllRegistrations } from "../repository";
import { PatientRegistration } from "../model";

export const Admin: React.FC<{}> = () => {
  const [state, setState] = React.useState<
    | { kind: "registrations"; registrations: PatientRegistration[] }
    | { kind: "loading" }
    | { kind: "error"; error: string }
  >({ kind: "loading" });

  if (state.kind === "loading") {
    getAllRegistrations()
      .then(async (registrations) => {
        setState({
          kind: "registrations",
          registrations: await registrations.json(),
        });
      })
      .catch((error) => {
        setState({ kind: "error", error });
      });
  }

  if (state.kind === "loading") {
    return <>loading...</>;
  } else if (state.kind === "error") {
    return <>There was an Error!</>;
  }

  return (
    <Container>
      <Box
        sx={{
          marginTop: 8,
          padding: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Paper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>DOB</TableCell>
                <TableCell>Phone Number</TableCell>
              </TableHead>
              <TableBody>
                {state.registrations.map((registration) => (
                  <TableRow>
                    <TableCell>{registration.firstName}</TableCell>
                    <TableCell>{registration.lastName}</TableCell>
                    <TableCell>{registration.email}</TableCell>
                    <TableCell>{registration.address}</TableCell>
                    <TableCell>{registration.dateOfBirth.toString()}</TableCell>
                    <TableCell>{registration.phoneNumber}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </Container>
  );
};
