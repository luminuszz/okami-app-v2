import React from "react";
import { AuthRoutes } from "@routes/auth.routes";
import { useAppSelector } from "@store/index";
import { AppRoutes } from "@routes/app.routes";

export default function Routes() {
  const isLogged = useAppSelector((state) => state.auth.token);

  return <AuthRoutes />;
}
