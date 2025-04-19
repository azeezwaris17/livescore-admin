// components/dashboard/transactions/TransactionsStat.js
import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box
} from '@mui/material';
import {
  ArrowUpward as ArrowUpIcon,
  ArrowDownward as ArrowDownIcon
} from '@mui/icons-material';

const TransactionStats = ({ title, value, icon, change, bgColor }) => {
  const isPositive = parseFloat(change) >= 0;

  return (
    <Card sx={{ border: '1px solid #EEEEF0' }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box>
            <Typography sx={{ 
              color: '#7A7A9D', 
              fontSize: '0.875rem', 
              fontWeight: 500, 
              mb: 1 
            }}>
              {title}
            </Typography>
            
            <Typography variant="h4" sx={{ 
              color: '#101012', 
              mb: 2, 
              fontWeight: 400 
            }}>
              {value}
            </Typography>
            
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 1 
            }}>
              {isPositive ? (
                <ArrowUpIcon sx={{ 
                  color: '#3C9705', 
                  width: 20, 
                  height: 20 
                }} />
              ) : (
                <ArrowDownIcon sx={{ 
                  color: '#D92D20',
                  width: 20, 
                  height: 20 
                }} />
              )}
              <Typography sx={{ 
                color: isPositive ? '#3C9705' : '#D92D20',
                fontSize: '0.875rem', 
                fontWeight: 500 
              }}>
                {change}%
              </Typography>
              <Typography sx={{ 
                color: '#475467', 
                fontSize: '0.5rem', 
                fontWeight: 500 
              }}>
                vs last month
              </Typography>
            </Box>
          </Box>
          
          <Box sx={{ 
            bgcolor: bgColor || '#F2F4F7',
            width: 40,
            height: 40,
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {React.cloneElement(icon, { sx: { color: '#414147' } })}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TransactionStats;