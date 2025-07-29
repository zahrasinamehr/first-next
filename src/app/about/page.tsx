import {
  Button,
  FormControlLabel,
  FormGroup,
  Rating,
  Switch,
} from "@mui/material";

export default function AboutPage() {
  return (
    <div>
      <h1>About This Project</h1>
      <p>This is a Next.js project that showcases various features.</p>

      <Button variant="contained">Contained</Button>

      <Rating name="half-rating" defaultValue={2.5} precision={0.5} />

      <FormGroup>
        <FormControlLabel control={<Switch defaultChecked />} label="Label" />
        <FormControlLabel required control={<Switch />} label="Required" />
        <FormControlLabel disabled control={<Switch />} label="Disabled" />
      </FormGroup>
    </div>
  );
}
