"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";

export default function Header() {
  const { user, logout } = useAuth();
  const { items, clear } = useCart();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">User Management</Typography>
        <Box sx={{ flexGrow: 1 }} />

        <Typography>{items.length}</Typography>
        <Button variant="contained" color="error" onClick={clear}>
          Clear Cart
        </Button>

        {user ? (
          <Button color="inherit" onClick={logout}>
            Logout ({user.firstName} {user.lastName})
          </Button>
        ) : (
          <Button color="inherit" href="/login">
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
