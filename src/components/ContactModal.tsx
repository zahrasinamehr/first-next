import { Modal, Box, TextField, Button } from "@mui/material";
import { useState, useEffect } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  onSave: (data: { firstName: string; lastName: string }) => void;
  initialData: { id: number; firstName: string; lastName: string } | null;
};

export default function ContactModal({
  open,
  onClose,
  onSave,
  initialData,
}: Props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  //   const [formData, setFormData] = useState({
  //     firstName: "",
  //     lastName: "",
  //   });

  //   if changing initialData, update formData
  useEffect(() => {
    if (initialData) {
      setFirstName(initialData.firstName);
      setLastName(initialData.lastName);
    } else {
      setFirstName("");
      setLastName("");
    }
  }, [initialData]);

  //   // after mounting the component
  //   useEffect(() => {
  //     //
  //   }, []);

  //   // after opening the modal
  //   useEffect(() => {
  //     //
  //   }, [open]);

  const handleSubmit = () => {
    onSave({ firstName, lastName });
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <h2>Edit Contact</h2>
        <TextField
          fullWidth
          label="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          margin="normal"
        />
        <Box
          sx={{ mt: 2, display: "flex", justifyContent: "flex-end", gap: 1 }}
        >
          <Button onClick={onClose} color="error">
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
