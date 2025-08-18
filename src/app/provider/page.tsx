"use client";

import { ReactNode, useMemo } from "react";
import { AuthProvider } from "./(context)/auth-context";

// MUI (optional but recommended in your case)
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";

export default function Providers({
  children,
  initialUser = null,
}: {
  children: ReactNode;
  initialUser?: { name: string } | null;
}) {
  const theme = useMemo(
    () =>
      createTheme({
        cssVariables: true,
        colorSchemes: { light: true, dark: true },
      }),
    []
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider initialUser={initialUser}>{children}</AuthProvider>
    </ThemeProvider>
  );
}
import { useForm } from "react-hook-form";
