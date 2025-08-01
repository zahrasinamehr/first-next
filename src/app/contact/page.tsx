"use client";

import ContactModal from "@/components/ContactModal";
import {
  Container,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useState } from "react";

export default function ContactPage() {
  const [rows, setRows] = useState(
    [
      { id: 1, firstName: "Jon", lastName: "Snow" },
      { id: 2, firstName: "Cersei", lastName: "Lannister" },
      { id: 3, firstName: "Arya", lastName: "Stark" },
    ].map((item, index) => ({ ...item, id: index + 1 }))
  );

  const [openModal, setOpenModal] = useState(false);
  const [editingRow, setEditingRow] = useState<{
    id: number;
    firstName: string;
    lastName: string;
  } | null>(null);

  const onAdd = () => {
    setRows([
      ...rows,
      { id: rows.length + 1, firstName: "zahra", lastName: "sina" },
    ]);
  };

  const onDelete = (id: number) => {
    setRows(rows.filter((row) => row.id !== id));
  };
  const onDeleteAll = () => {
    setRows([]);
  };

  const onEdit = (rowData: {
    id: number;
    firstName: string;
    lastName: string;
  }) => {
    setEditingRow(rowData);
    setOpenModal(true);
  };

  const onSave = (updatedData: { firstName: string; lastName: string }) => {
    if (editingRow) {
      setRows(
        rows.map((row) =>
          row.id === editingRow.id ? { ...row, ...updatedData } : row
        )
      );
      setEditingRow(null);
      setOpenModal(false);
    } else {
      setRows([...rows, { id: rows.length + 1, ...updatedData }]);
      setOpenModal(false);
    }
  };

  return (
    <Container maxWidth="lg">
      {/* Responsive Layout */}
      <Grid spacing={2}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Grid>
            <Grid
              size={{ xs: 12, md: 4 }}
              sx={{ backgroundColor: { xs: "blue", md: "red" }, p: 2 }}
            >
              123
            </Grid>
          </Grid>
        </Grid>
        <Grid
          size={{ xs: 12, md: 4 }}
          sx={{ display: { xs: "none", md: "block" } }}
        >
          <Grid>
            <Grid
              size={{ xs: 12 }}
              sx={{ backgroundColor: "lightgreen", p: 2 }}
            >
              567
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* Button Row */}
      <Grid spacing={2} sx={{ mt: 2 }}>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Button
            variant="contained"
            color="error"
            sx={{ py: 1 }}
            onClick={() => setOpenModal(true)}
          >
            Add
          </Button>
          <Button
            variant="contained"
            color="error"
            sx={{ py: 1, ml: 2 }}
            onClick={onDeleteAll}
          >
            Delete All
          </Button>
        </Grid>
        <Grid size={{ xs: 12, sm: 8 }}>
          <Grid>
            <Grid size={{ xs: 12 }} sx={{ p: 2 }}>
              567
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* Simple Table */}
      <TableContainer component={Paper} sx={{ mt: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.firstName}</TableCell>
                <TableCell>{row.lastName}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => onEdit(row)}
                    sx={{ mr: 1 }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => onDelete(row.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Contact Modal */}
      <ContactModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setEditingRow(null);
        }}
        onSave={onSave}
        initialData={editingRow}
      />
    </Container>
  );
}
