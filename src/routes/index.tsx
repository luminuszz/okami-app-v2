import React from "react";
import { AppRoutes } from "@routes/app.routes";
import { AuthRoutes } from "@routes/auth.routes";

export default function Routes() {
  const isLogged = true;

  return isLogged ? <AppRoutes /> : <AuthRoutes />;
}
