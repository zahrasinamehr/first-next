"use client";

import { useAuth } from "@/contexts/AuthContext";
import { Button, Container, TextField } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();

  const { setUserInfo } = useAuth();

  const [mobile, setMobile] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [step, setStep] = useState<"mobile" | "code">("mobile");

  const onSubmit = async () => {
    if (!mobile) {
      return toast.error("Enter your mobile number");
    }

    try {
      await axios.post("https://posapi.7solution.net/auth/login/mobile", {
        mobile,
      });
      setStep("code");
      toast.success("Verification code sent to your mobile");
    } catch (error) {
      toast.error("An error occurred during login");
    }
  };

  const onVerify = async () => {
    if (!code) {
      return toast.error("Enter the verification code");
    }

    try {
      const { data } = await axios.post(
        "https://posapi.7solution.net/auth/login/verify",
        { mobile, code }
      );

      setUserInfo(data.data.sessions[0].user);

      localStorage.setItem("token", data.data.sessions[0].accessToken);
      router.push("/user");
    } catch (error) {
      toast.error("Invalid verification code");
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "2rem" }}>
      {step === "mobile" && (
        <>
          <TextField
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            label="Mobile"
            variant="outlined"
            fullWidth
          />

          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={onSubmit}
          >
            Login
          </Button>
        </>
      )}

      {step === "code" && (
        <>
          <TextField
            value={code}
            onChange={(e) => setCode(e.target.value)}
            label="Verification Code"
            variant="outlined"
            fullWidth
          />

          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={onVerify}
          >
            Verify
          </Button>
        </>
      )}
    </Container>
  );
}
