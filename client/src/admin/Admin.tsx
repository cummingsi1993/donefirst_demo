import React from "react";
import { getAllRegistrations } from "../repository";

export const Admin: React.FC<{}> = () => {
  getAllRegistrations().then((registrations) => {});
  return <>woot</>;
};
