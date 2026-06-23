'use client';

import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
} from '@mui/material';
import { useState } from 'react';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';

export default function Quote() {
  const [formData, setFormData] = useState({
    fullName: '',
    organization: '',
    designation: '',
    email: '',
    phone: '',
    sector: '',
    service: '',
    city: '',
    message: '',
  });

  const [errors, setErrors] = useState({});

  const sectors = [
    'Healthcare',
    'Education',
    'Commercial',
    'Industrial',
    'Residential',
    'Corporate',
  ];

  const services = [
    'Embroidery service',
    'Printing service',
    'Housekeeping',
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: '',
    });
  };

  const validate = () => {
    let temp = {};

    if (!formData.fullName)
      temp.fullName = 'Required';

    if (!formData.organization)
      temp.organization = 'Required';

    if (!formData.designation)
      temp.designation = 'Required';

    if (!formData.email)
      temp.email = 'Required';

    if (!formData.phone)
      temp.phone = 'Required';

    if (!formData.sector)
      temp.sector = 'Required';

    if (!formData.service)
      temp.service = 'Required';

    if (!formData.city)
      temp.city = 'Required';

    if (!formData.message)
      temp.message = 'Required';

    setErrors(temp);

    return Object.keys(temp).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      console.log(formData);

      alert('Submitted Successfully');

      setFormData({
        fullName: '',
        organization: '',
        designation: '',
        email: '',
        phone: '',
        sector: '',
        service: '',
        city: '',
        message: '',
      });
    }
  };

  const inputStyle = {
    '& .MuiOutlinedInput-root': {
      borderRadius: 0,
      color: '#fff',
      background: 'transparent',
      fontSize: 16,

      '& fieldset': {
        borderColor: 'rgba(255,255,255,0.3)',
      },

      '&:hover fieldset': {
        borderColor: '#fff',
      },

      '&.Mui-focused fieldset': {
        borderColor: '#fff',
      },
    },

    '& .MuiInputLabel-root': {
      color: 'rgba(255,255,255,0.7)',
      fontSize: 16,
    },

    '& .MuiInputLabel-root.Mui-focused': {
      color: '#fff',
    },

    '& .MuiFormHelperText-root': {
      color: '#000',
      fontSize: 12
    },
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: 'secondary.main',
        px: { xs: 2, md: 6 },
        py: { xs: 6, md: 10 },
      }}
    >


      {/* MAIN GRID */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            md: '0.8fr 1.2fr',
          },
          gap: { xs: 8, md: 10 },
          alignItems: 'start',
          py: 8
        }}
      >

        {/* ================= LEFT SECTION ================= */}
        <Box>

          <Typography
            sx={{
              color: '#fff',
              fontSize: { xs: 28, md: 44 },
              fontWeight: 600,
              mb: 2, textAlign: 'left'
            }}
          >
            Get a Quote Now
          </Typography>

          <Typography
            sx={{
              color: 'rgba(255,255,255,0.7)',
              fontSize: 17,
              lineHeight: 1.8,
              mb: 7, textAlign: 'left'
            }}
          >
            Get a Quote Immediately Upon Form Submission
          </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: '50px 140px 1fr', gap: 2,  alignItems: 'flex-start' }}  >
                <Box sx={{ width: 45, height: 45, border: '1px solid rgba(255,255,255,0.2)', borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff',
                    }} >
                    <LocationOnOutlinedIcon sx={{ fontSize: 22 }} />
                </Box>
                <Typography sx={{ color: '#fff', fontSize: 22, mt: 2, fontWeight: 700, }} >
                    Office
                </Typography>

                {/* DATA */}

                <Typography

                sx={{

                    color: 'rgba(255,255,255,0.7)',

                    lineHeight: 1.8,

                    fontSize: 16, textAlign: 'left'

                }}

                >

                3rd Floor, Habsiguda Main Road,

                <br />

                Hyderabad, Telangana

                </Typography>

            </Box>

            {/* EMAIL */}

            <Box

                sx={{

                display: 'grid',

                gridTemplateColumns: '50px 140px 1fr',

                gap: 2,

                alignItems: 'center',

                }}

            >

                {/* ICON */}

                <Box

                sx={{

                    width: 45,

                    height: 45,

                    border: '1px solid rgba(255,255,255,0.2)',

                    borderRadius: '50%',

                    display: 'flex',

                    alignItems: 'center',

                    justifyContent: 'center',

                    color: '#fff',

                }}

                >

                <MailOutlineOutlinedIcon sx={{ fontSize: 22 }} />

                </Box>

                {/* TITLE */}

                <Typography

                sx={{

                    color: '#fff',

                    fontSize: 22,

                    fontWeight: 700,

                }}

                >

                Email

                </Typography>

                {/* DATA */}

                <Typography

                sx={{

                    color: 'rgba(255,255,255,0.7)',

                    lineHeight: 1.8,

                    fontSize: 16,textAlign: 'left'

                }}

                >

                hellow@unicusfacilities.in

                </Typography>

            </Box>

            {/* CALL */}

            <Box

                sx={{

                display: 'grid',

                gridTemplateColumns: '50px 140px 1fr',

                gap: 2,

                alignItems: 'center',

                }}

            >

                {/* ICON */}

                <Box

                sx={{

                    width: 45,

                    height: 45,

                    border: '1px solid rgba(255,255,255,0.2)',

                    borderRadius: '50%',

                    display: 'flex',

                    alignItems: 'center',

                    justifyContent: 'center',

                    color: '#fff',

                }}

                >

                <CallOutlinedIcon sx={{ fontSize: 22 }} />

                </Box>

                {/* TITLE */}

                <Typography

                sx={{

                    color: '#fff',

                    fontSize: 22,

                    fontWeight: 700,

                }}

                >

                Call us

                </Typography>

                {/* DATA */}

                <Typography

                sx={{

                    color: 'rgba(255,255,255,0.7)',

                    lineHeight: 1.8,

                    fontSize: 16,textAlign: 'left'

                }}

                >

                +91 9550322111

                </Typography>

            </Box>

            </Box>

        </Box>

        {/* ================= RIGHT FORM ================= */}
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: 'grid',
            gap: 3,
          }}
        >

          {/* ROW 1 */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                md: '1fr 1fr',
              },
              gap: 3,
            }}
          >
            <TextField
              label="Full Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              error={!!errors.fullName}
              helperText={errors.fullName}
              fullWidth
              sx={inputStyle}
            />

            <TextField
              label="Organization Name"
              name="organization"
              value={formData.organization}
              onChange={handleChange}
              error={!!errors.organization}
              helperText={errors.organization}
              fullWidth
              sx={inputStyle}
            />
          </Box>

          {/* ROW 2 */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                md: '1fr 1fr',
              },
              gap: 3,
            }}
          >
            <TextField
              label="Designation"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              error={!!errors.designation}
              helperText={errors.designation}
              fullWidth
              sx={inputStyle}
            />

            <TextField
              label="Work Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              fullWidth
              sx={inputStyle}
            />
          </Box>

          {/* ROW 3 */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                md: '1fr 1fr',
              },
              gap: 3,
            }}
          >
            <TextField
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              error={!!errors.phone}
              helperText={errors.phone}
              fullWidth
              sx={inputStyle}
            />

            <TextField
              select
              label="Sector"
              name="sector"
              value={formData.sector}
              onChange={handleChange}
              error={!!errors.sector}
              helperText={errors.sector}
              fullWidth
              sx={inputStyle}
            >
              {sectors.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </TextField>
          </Box>

          {/* SERVICE */}
          <TextField
            select
            label="Service Needed"
            name="service"
            value={formData.service}
            onChange={handleChange}
            error={!!errors.service}
            helperText={errors.service}
            fullWidth
            sx={inputStyle}
          >
            {services.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </TextField>

          {/* CITY */}
          <TextField
            label="City"
            name="city"
            value={formData.city}
            onChange={handleChange}
            error={!!errors.city}
            helperText={errors.city}
            fullWidth
            sx={inputStyle}
          />

          {/* MESSAGE */}
          <TextField
            multiline
            rows={5}
            label="Message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            error={!!errors.message}
            helperText={errors.message}
            fullWidth
            placeholder="Submit Your Order Information - Item Name, Decoration Size, Quantity, Due Date and any other details"
            sx={inputStyle}
          />

          {/* BUTTON */}
          <Button
            type="submit"
            sx={{
              mt: 2,
              width: 'fit-content',
              backgroundColor: '#fff',
              color: '#000',
              px: 5,
              py: 1.8,
              borderRadius: 0,
              fontWeight: 700,
              fontSize: 15,
              textTransform: 'none',
              borderRadius: 6,

              '&:hover': {
                backgroundColor: '#e5e5e5',
              },
            }}
          >
            Request a site assessment
          </Button>

        </Box>

      </Box>

    </Box>
  );
}