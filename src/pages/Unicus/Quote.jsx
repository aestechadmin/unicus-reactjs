import React, { useState, useEffect, useRef } from 'react';
import { Box, TextField, Button, MenuItem, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';

const textRevealVariants = {
  hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
  visible: (custom) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { delay: custom * 0.1, duration: 0.6, ease: "easeOut" }
  })
};

const progressiveRevealVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: (custom) => ({
    opacity: 1,
    x: 0,
    transition: { delay: custom * 0.08, duration: 0.5, type: "spring", stiffness: 100 }
  })
};

const Quote = () => {
  const sectionRef = useRef(null);
  const [hasRevealed, setHasRevealed] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '', organization: '', designation: '', email: '', phone: '', sector: '', service: '', city: '', message: ''
  });
  const [errors, setErrors] = useState({});

  const sectors = ['Healthcare', 'Commercial', 'Residential', 'Corporate', 'Industrial', 'Educational'];
  const servicesList = ['Cleaning Services', 'Security Services', 'Maintenance', 'Housekeeping', 'Pest Control', 'Manpower Supply'];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHasRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = 'Full name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.phone) newErrors.phone = 'Phone is required';
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    console.log('Form submitted:', formData);
  };

  const inputStyle = {
    '& .MuiOutlinedInput-root': {
      backgroundColor: 'rgba(255,255,255,0.1)',
      borderRadius: 3,
      '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
      '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.4)' },
      '&.Mui-focused fieldset': { borderColor: '#fff' }
    },
    '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)' },
    '& .MuiInputBase-input': { color: '#fff' }
  };

  return (
    <Box ref={sectionRef} sx={{ height: '85%', width: '100%', overflow: 'auto', backgroundColor: '#027EFF' }}>
      <Box sx={{ minHeight: '100%', px: { xs: 2, md: 6 }, py: { xs: 4, md: 10 } }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '0.8fr 1.2fr' }, gap: { xs: 4, md: 10 }, alignItems: 'start', py: { xs: 4, md: 8 } }}>
          
          {/* Left Side - Contact Info */}
          <Box>
            <motion.div custom={0} initial="hidden" animate={hasRevealed ? "visible" : "hidden"} variants={textRevealVariants}>
              <Typography sx={{ color: '#fff', fontSize: { xs: 24, md: 44 }, fontWeight: 700, mb: 2 }}>
                Get a Quote Now
              </Typography>
            </motion.div>
            <motion.div custom={1} initial="hidden" animate={hasRevealed ? "visible" : "hidden"} variants={textRevealVariants}>
              <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: { xs: 14, md: 17 }, lineHeight: 1.6, mb: 5 }}>
                Get a Quote Immediately Upon Form Submission
              </Typography>
            </motion.div>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {[
                { icon: <LocationOnOutlinedIcon sx={{ fontSize: 18 }} />, title: 'Office', value: '3rd Floor, Habsiguda Main Road,<br />Hyderabad, Telangana' },
                { icon: <MailOutlineOutlinedIcon sx={{ fontSize: 18 }} />, title: 'Email', value: 'hello@unicusfacilities.in' },
                { icon: <CallOutlinedIcon sx={{ fontSize: 18 }} />, title: 'Call us', value: '+91 9550322111' },
              ].map((item, idx) => (
                <motion.div key={idx} custom={idx + 2} initial="hidden" animate={hasRevealed ? "visible" : "hidden"} variants={progressiveRevealVariants}>
                  <Box sx={{ display: 'grid', gridTemplateColumns: '40px 100px 1fr', gap: 2, alignItems: 'center' }}>
                    <Box sx={{ width: 40, height: 40, border: '1px solid rgba(255,255,255,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', transition: 'all 0.3s', '&:hover': { transform: 'scale(1.1)', borderColor: '#fff' } }}>
                      {item.icon}
                    </Box>
                    <Typography sx={{ color: '#fff', fontSize: { xs: 16, md: 22 }, fontWeight: 700 }}>{item.title}</Typography>
                    <Typography sx={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, fontSize: { xs: 12, md: 16 } }} dangerouslySetInnerHTML={{ __html: item.value }} />
                  </Box>
                </motion.div>
              ))}
            </Box>
          </Box>
          
          {/* Right Side - Form */}
          <motion.div custom={5} initial="hidden" animate={hasRevealed ? "visible" : "hidden"} variants={progressiveRevealVariants}>
            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'grid', gap: 2 }}>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
                <TextField label="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} error={!!errors.fullName} helperText={errors.fullName} fullWidth sx={inputStyle} />
                <TextField label="Organization Name" name="organization" value={formData.organization} onChange={handleChange} error={!!errors.organization} helperText={errors.organization} fullWidth sx={inputStyle} />
              </Box>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
                <TextField label="Designation" name="designation" value={formData.designation} onChange={handleChange} error={!!errors.designation} helperText={errors.designation} fullWidth sx={inputStyle} />
                <TextField label="Work Email" name="email" value={formData.email} onChange={handleChange} error={!!errors.email} helperText={errors.email} fullWidth sx={inputStyle} />
              </Box>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
                <TextField label="Phone" name="phone" value={formData.phone} onChange={handleChange} error={!!errors.phone} helperText={errors.phone} fullWidth sx={inputStyle} />
                <TextField select label="Sector" name="sector" value={formData.sector} onChange={handleChange} error={!!errors.sector} helperText={errors.sector} fullWidth sx={inputStyle}>
                  {sectors.map((item) => (<MenuItem key={item} value={item}>{item}</MenuItem>))}
                </TextField>
              </Box>
              <TextField select label="Service Needed" name="service" value={formData.service} onChange={handleChange} error={!!errors.service} helperText={errors.service} fullWidth sx={inputStyle}>
                {servicesList.map((item) => (<MenuItem key={item} value={item}>{item}</MenuItem>))}
              </TextField>
              <TextField label="City" name="city" value={formData.city} onChange={handleChange} error={!!errors.city} helperText={errors.city} fullWidth sx={inputStyle} />
              <TextField multiline rows={4} label="Message" name="message" value={formData.message} onChange={handleChange} error={!!errors.message} helperText={errors.message} fullWidth sx={inputStyle} />
              
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button type="submit" sx={{ mt: 1, width: 'fit-content', backgroundColor: '#fff', color: '#000', px: { xs: 3, md: 5 }, py: { xs: 1.5, md: 1.8 }, fontWeight: 700, fontSize: { xs: 13, md: 15 }, textTransform: 'none', borderRadius: 6, transition: 'all 0.3s', '&:hover': { backgroundColor: '#f0f0f0', transform: 'translateY(-2px)' } }}>
                  Request a site assessment
                </Button>
              </motion.div>
            </Box>
          </motion.div>
        </Box>
      </Box>
    </Box>
  );
};

export default Quote;