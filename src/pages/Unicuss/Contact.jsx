import React, { useMemo, useState } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  InputAdornment,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import { blueBtn, bodySx, fadeLeft, fadeUp, FONT, stagger, titleSx, viewport } from "./motion";

const icons = [LocationOnOutlinedIcon, MailOutlineOutlinedIcon, CallOutlinedIcon];

const STATES = [
  "Telangana",
  "Andhra Pradesh",
  "Karnataka",
  "Tamil Nadu",
  "Maharashtra",
  "Delhi",
];

const CITIES = {
  Telangana: ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar", "Khammam"],
  "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Tirupati"],
  Karnataka: ["Bengaluru", "Mysuru", "Mangaluru", "Hubballi"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Salem"],
  Maharashtra: ["Mumbai", "Pune", "Nagpur", "Nashik"],
  Delhi: ["New Delhi", "Dwarka", "Rohini"],
};

const initialForm = {
  fullName: "",
  organization: "",
  designation: "",
  workEmail: "",
  phone: "",
  type: "Residential",
  servicesNeeded: "",
  address: "",
  state: "Telangana",
  city: "Hyderabad",
  pincode: "",
  message: "",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[6-9]\d{9}$/;
const PIN_RE = /^\d{6}$/;

const underline = {
  "& .MuiInput-root": {
    color: "#fff",
    fontFamily: FONT,
    fontSize: { xs: 16, md: 18 },
    "&:before": { borderBottom: "1px solid rgba(255,255,255,0.28)" },
    "&:hover:not(.Mui-disabled):before": { borderBottom: "1px solid rgba(255,255,255,0.7)" },
    "&:after": { borderBottom: "2px solid #3B82F6" },
  },
  "& .MuiInputBase-input": { color: "#fff", fontFamily: FONT, fontSize: { xs: 16, md: 18 }, textAlign: "left" },
  "& .MuiSelect-select": { fontSize: { xs: 16, md: 18 }, textAlign: "left" },
  "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.55)", fontFamily: FONT, fontSize: { xs: 14, md: 15 }, textAlign: "left" },
  "& .MuiInputLabel-root.Mui-focused": { color: "#3B82F6" },
  "& .MuiInputLabel-root.Mui-error": { color: "#F87171" },
  "& .MuiSelect-icon": { color: "rgba(255,255,255,0.6)" },
  "& .MuiFormLabel-root": { color: "rgba(255,255,255,0.55)", fontFamily: FONT },
  "& .MuiFormHelperText-root": { fontFamily: FONT, fontSize: 12 },
};

const menuProps = {
  PaperProps: {
    sx: {
      bgcolor: "#111",
      color: "#fff",
      fontFamily: FONT,
      "& .MuiMenuItem-root": { justifyContent: "flex-start", textAlign: "left" },
    },
  },
};

export default function Contact({ data }) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const cities = useMemo(() => CITIES[form.state] || [], [form.state]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => {
      if (name === "state") {
        const nextCities = CITIES[value] || [];
        return { ...prev, state: value, city: nextCities[0] || "" };
      }
      return { ...prev, [name]: value };
    });
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const next = {};
    if (!form.fullName.trim()) next.fullName = "Full name is required";
    else if (form.fullName.trim().length < 2) next.fullName = "Enter a valid name";
    if (!form.organization.trim()) next.organization = "Organization name is required";
    if (!form.designation.trim()) next.designation = "Designation is required";
    if (!form.workEmail.trim()) next.workEmail = "Work email is required";
    else if (!EMAIL_RE.test(form.workEmail.trim())) next.workEmail = "Enter a valid email";
    if (!form.phone.trim()) next.phone = "Phone number is required";
    else if (!PHONE_RE.test(form.phone.trim())) next.phone = "Enter a valid 10-digit mobile number";
    if (!form.type) next.type = "Select a type";
    if (!form.servicesNeeded.trim()) next.servicesNeeded = "Services needed is required";
    if (!form.address.trim()) next.address = "Address is required";
    if (!form.state) next.state = "State is required";
    if (!form.city) next.city = "City is required";
    if (!form.pincode.trim()) next.pincode = "Pincode is required";
    else if (!PIN_RE.test(form.pincode.trim())) next.pincode = "Enter a valid 6-digit pincode";
    if (!form.message.trim()) next.message = "Message is required";
    return next;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const next = validate();
    if (Object.keys(next).length) {
      setErrors(next);
      toast.error("Please fill the required fields.");
      return;
    }

    const scriptUrl = process.env.REACT_APP_GOOGLE_SCRIPT_URL;
    if (!scriptUrl) {
      toast.error("Form is not connected yet. Please try again later.");
      return;
    }

    const payload = {
      timestamp: new Date().toISOString(),
      fullName: form.fullName.trim(),
      organization: form.organization.trim(),
      designation: form.designation.trim(),
      workEmail: form.workEmail.trim(),
      phone: `' +91 ${form.phone.trim()}`,
      type: form.type,
      servicesNeeded: form.servicesNeeded.trim(),
      address: form.address.trim(),
      state: form.state,
      city: form.city,
      pincode: form.pincode.trim(),
      message: form.message.trim(),
    };

    setSubmitting(true);
    const toastId = toast.loading("Submitting your request...");
    try {
      await fetch(scriptUrl, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload),
      });
      toast.success("Your request has been submitted successfully.", {
        id: toastId,
        duration: 5000,
      });
      setForm(initialForm);
      setErrors({});
    } catch {
      toast.error("Could not submit right now. Please try again.", { id: toastId });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box sx={{ bgcolor: "#000", py: { xs: 6, md: 8 } }}>
      <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3, md: 8 } }}>
        <motion.div initial="hidden" whileInView="visible" viewport={viewport} variants={fadeUp}>
          <Typography sx={{ ...titleSx, fontWeight: 600, color: "#fff", textAlign: "left" }}>
            {data.title}
          </Typography>
        </motion.div>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "0.85fr 1.15fr" },
            gap: { xs: 4, md: 6 },
            alignItems: "start",
            mt: { xs: 3, md: 8 },
          }}
        >
          <Box>
            <Typography
              sx={{
                ...bodySx,
                color: "#fff",
                mb: 3.5,
                maxWidth: 420,
                fontWeight: 600,
                textAlign: "left",
              }}
            >
              {data.subtitle}
            </Typography>
            <Box
              component={motion.div}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              variants={stagger}
              sx={{ display: "flex", flexDirection: "column", gap: 3.5 }}
            >
            {data.items.map((item, index) => {
              const Icon = icons[index];
              return (
                <Box
                  key={item.title}
                  component={motion.div}
                  variants={fadeLeft}
                  sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "42px 1fr", md: "42px 120px 1fr" },
                    columnGap: { xs: 1.5, md: 2 },
                    rowGap: 0.4,
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      width: 42,
                      height: 42,
                      borderRadius: "50%",
                      bgcolor: "#fff",
                      color: "#000",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Icon sx={{ fontSize: 20 }} />
                  </Box>
                  <Typography sx={{ ...bodySx, color: "#fff", fontWeight: 600, textAlign: "left" }}>
                    {item.title}
                  </Typography>
                  <Typography
                    component={item.href ? "a" : "p"}
                    href={item.href}
                    sx={{
                      ...bodySx,
                      color: "#fff",
                      textAlign: "left",
                      textDecoration: "none",
                      fontWeight: 600,
                      m: 0,
                      wordBreak: "break-word",
                      gridColumn: { xs: "2", md: "3" },
                    }}
                  >
                    {item.value}
                  </Typography>
                </Box>
              );
            })}
            </Box>
          </Box>

          <Box
            component="form"
            onSubmit={onSubmit}
            noValidate
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
              gap: { xs: 2.5, md: 2.5 },
              width: { xs: "100%", md: "80%" },
              ml: { md: "auto" },
              justifySelf: { md: "end" },
            }}
          >
            <TextField
              name="fullName"
              label="Full Name"
              variant="standard"
              value={form.fullName}
              onChange={onChange}
              error={Boolean(errors.fullName)}
              helperText={errors.fullName}
              fullWidth
              sx={underline}
            />
            <TextField
              name="organization"
              label="Organization Name"
              variant="standard"
              value={form.organization}
              onChange={onChange}
              error={Boolean(errors.organization)}
              helperText={errors.organization}
              fullWidth
              sx={underline}
            />
            <TextField
              name="designation"
              label="Designation"
              variant="standard"
              value={form.designation}
              onChange={onChange}
              error={Boolean(errors.designation)}
              helperText={errors.designation}
              fullWidth
              sx={{ ...underline, gridColumn: { sm: "1 / -1" } }}
            />
            <TextField
              name="workEmail"
              label="Work Email"
              type="email"
              variant="standard"
              value={form.workEmail}
              onChange={onChange}
              error={Boolean(errors.workEmail)}
              helperText={errors.workEmail}
              fullWidth
              sx={{ ...underline, gridColumn: { sm: "1 / -1" } }}
            />
            <TextField
              name="phone"
              label="Phone"
              variant="standard"
              value={form.phone}
              onChange={onChange}
              error={Boolean(errors.phone)}
              helperText={errors.phone}
              fullWidth
              sx={underline}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Typography sx={{ color: "rgba(255,255,255,0.75)", fontFamily: FONT, fontSize: { xs: 16, md: 18 } }}>+91</Typography>
                  </InputAdornment>
                ),
              }}
            />
            <FormControl variant="standard" error={Boolean(errors.type)} sx={underline}>
              <FormLabel sx={{ fontFamily: FONT, fontSize: 12, mb: 0.5, textAlign: "left" }}>Type</FormLabel>
              <RadioGroup row name="type" value={form.type} onChange={onChange} sx={{ flexWrap: "wrap" }}>
                <FormControlLabel
                  value="Residential"
                  control={<Radio sx={{ color: "rgba(255,255,255,0.4)", "&.Mui-checked": { color: "#3B82F6" } }} />}
                  label={<Typography sx={{ color: "#fff", fontFamily: FONT, fontSize: 14 }}>Residential</Typography>}
                />
                <FormControlLabel
                  value="Commercial"
                  control={<Radio sx={{ color: "rgba(255,255,255,0.4)", "&.Mui-checked": { color: "#3B82F6" } }} />}
                  label={<Typography sx={{ color: "#fff", fontFamily: FONT, fontSize: 14 }}>Commercial</Typography>}
                />
              </RadioGroup>
              {errors.type && <FormHelperText>{errors.type}</FormHelperText>}
            </FormControl>
            <TextField
              name="servicesNeeded"
              label="Services Needed"
              variant="standard"
              value={form.servicesNeeded}
              onChange={onChange}
              error={Boolean(errors.servicesNeeded)}
              helperText={errors.servicesNeeded}
              fullWidth
              sx={{ ...underline, gridColumn: { sm: "1 / -1" } }}
            />
            <TextField
              name="address"
              label="Address"
              variant="standard"
              value={form.address}
              onChange={onChange}
              error={Boolean(errors.address)}
              helperText={errors.address}
              fullWidth
              sx={{ ...underline, gridColumn: { sm: "1 / -1" } }}
            />
            <FormControl variant="standard" fullWidth error={Boolean(errors.state)} sx={underline}>
              <InputLabel>State</InputLabel>
              <Select name="state" value={form.state} onChange={onChange} MenuProps={menuProps}>
                {STATES.map((state) => (
                  <MenuItem key={state} value={state}>
                    {state}
                  </MenuItem>
                ))}
              </Select>
              {errors.state && <FormHelperText>{errors.state}</FormHelperText>}
            </FormControl>
            <FormControl variant="standard" fullWidth error={Boolean(errors.city)} sx={underline}>
              <InputLabel>City</InputLabel>
              <Select name="city" value={form.city} onChange={onChange} MenuProps={menuProps}>
                {cities.map((city) => (
                  <MenuItem key={city} value={city}>
                    {city}
                  </MenuItem>
                ))}
              </Select>
              {errors.city && <FormHelperText>{errors.city}</FormHelperText>}
            </FormControl>
            <TextField
              name="pincode"
              label="Pincode"
              variant="standard"
              value={form.pincode}
              onChange={onChange}
              error={Boolean(errors.pincode)}
              helperText={errors.pincode}
              fullWidth
              sx={{ ...underline, gridColumn: { sm: "1 / -1" } }}
            />
            <TextField
              name="message"
              label="Message"
              variant="standard"
              value={form.message}
              onChange={onChange}
              error={Boolean(errors.message)}
              helperText={errors.message}
              fullWidth
              multiline
              minRows={2}
              sx={{ ...underline, gridColumn: { sm: "1 / -1" } }}
            />
            <Box sx={{ gridColumn: { sm: "1 / -1" }, mt: 1 }}>
              <Button
                type="submit"
                fullWidth
                disabled={submitting}
                endIcon={<NorthEastIcon />}
                sx={{ ...blueBtn, py: 1.4, width: "100%" }}
              >
                {submitting ? "Sending..." : data.cta}
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
