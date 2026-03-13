import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { alpha, useTheme } from '@mui/material/styles';

const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case 'active':
    case 'under_investigation':
    case 'moderate':
      return 'warning';
    case 'resolved':
    case 'closed':
    case 'mild':
    case 'convicted':
      return 'success';
    case 'severe':
      return 'error';
    case 'pending':
      return 'info';
    default:
      return 'default';
  }
};

export default function DetailedRecordCard({ 
  title, 
  subtitle, 
  details = [], 
  status, 
  date, 
  icon, 
  color = "primary" 
}) {
  const theme = useTheme();
  
  return (
    <Card 
      variant="outlined" 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        borderRadius: 2,
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: theme.shadows[4],
          transform: 'translateY(-4px)',
          borderColor: theme.palette[color].main,
        }
      }}
    >
      <CardContent sx={{ p: 3, flexGrow: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 48,
              height: 48,
              borderRadius: 2,
              bgcolor: alpha(theme.palette[color].main, 0.1),
              color: theme.palette[color].main,
            }}
          >
            {icon}
          </Box>
          {status && (
            <Chip 
              label={status.replace('_', ' ')} 
              color={getStatusColor(status)} 
              size="small" 
              variant="soft" 
              sx={{ textTransform: 'capitalize', fontWeight: 600 }}
            />
          )}
        </Box>

        <Typography variant="h6" component="div" sx={{ fontWeight: 700, mb: 0.5 }}>
          {title}
        </Typography>
        
        {subtitle && (
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2, fontWeight: 500 }}>
            {subtitle}
          </Typography>
        )}

        <Divider sx={{ my: 2, opacity: 0.6 }} />

        <Stack spacing={1.5}>
          {details.map((detail, index) => (
            <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, textTransform: 'uppercase' }}>
                {detail.label}
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {detail.value}
              </Typography>
            </Box>
          ))}
        </Stack>

        {date && (
          <Box sx={{ mt: 'auto', pt: 3 }}>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              Date: {new Date(date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
