// components/dashboard/transactions/TransactionActions.js
import React, { useState } from 'react';
import {
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  Typography,
  Divider,
  Button,
  Box
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useDispatch } from 'react-redux';
import { markAsPaid, retryCharge, refundTransaction } from '@/store/slices/transactionSlice';

/**
 * TransactionActions - Provides actions for a transaction
 */
const TransactionActions = ({ transaction, onViewDetails }) => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const [openMarkPaidDialog, setOpenMarkPaidDialog] = useState(false);
  const [openRetryDialog, setOpenRetryDialog] = useState(false);
  const [openRefundDialog, setOpenRefundDialog] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleMarkPaidClick = () => {
    setOpenMarkPaidDialog(true);
    handleMenuClose();
  };

  const handleRetryClick = () => {
    setOpenRetryDialog(true);
    handleMenuClose();
  };

  const handleRefundClick = () => {
    setOpenRefundDialog(true);
    handleMenuClose();
  };

  const handleMarkPaidConfirm = async () => {
    setActionLoading(true);
    try {
      await dispatch(markAsPaid(transaction.id));
    } finally {
      setActionLoading(false);
      setOpenMarkPaidDialog(false);
    }
  };

  const handleRetryConfirm = async () => {
    setActionLoading(true);
    try {
      await dispatch(retryCharge(transaction.id));
    } finally {
      setActionLoading(false);
      setOpenRetryDialog(false);
    }
  };

  const handleRefundConfirm = async () => {
    setActionLoading(true);
    try {
      await dispatch(refundTransaction(transaction.id));
    } finally {
      setActionLoading(false);
      setOpenRefundDialog(false);
    }
  };

  return (
    <>
      {/* Action menu trigger */}
      <IconButton 
        onClick={handleMenuOpen}
        aria-label="transaction actions"
      >
        <MoreVertIcon />
      </IconButton>

      {/* Dropdown menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={onViewDetails}>
          View Details
        </MenuItem>
        {transaction.status === 'failed' && (
          <MenuItem onClick={handleRetryClick}>
            Retry Charge
          </MenuItem>
        )}
        {transaction.status === 'pending' && (
          <MenuItem onClick={handleMarkPaidClick}>
            Mark as Paid
          </MenuItem>
        )}
        {transaction.status === 'completed' && (
          <MenuItem onClick={handleRefundClick}>
            Issue Refund
          </MenuItem>
        )}
      </Menu>

      {/* Mark as Paid confirmation dialog */}
      <Dialog open={openMarkPaidDialog} onClose={() => setOpenMarkPaidDialog(false)}>
        <Box sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>Mark as Paid</Typography>
          <Divider sx={{ mb: 2 }} />
          <Typography sx={{ mb: 3 }}>
            Are you sure you want to mark transaction #{transaction.id} as paid?
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button 
              variant="outlined" 
              onClick={() => setOpenMarkPaidDialog(false)}
              disabled={actionLoading}
            >
              Cancel
            </Button>
            <Button 
              variant="contained" 
              onClick={handleMarkPaidConfirm}
              disabled={actionLoading}
            >
              {actionLoading ? 'Processing...' : 'Confirm'}
            </Button>
          </Box>
        </Box>
      </Dialog>

      {/* Retry Charge confirmation dialog */}
      <Dialog open={openRetryDialog} onClose={() => setOpenRetryDialog(false)}>
        <Box sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>Retry Charge</Typography>
          <Divider sx={{ mb: 2 }} />
          <Typography sx={{ mb: 3 }}>
            Retry failed transaction #{transaction.id}?
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button 
              variant="outlined" 
              onClick={() => setOpenRetryDialog(false)}
              disabled={actionLoading}
            >
              Cancel
            </Button>
            <Button 
              variant="contained" 
              color="primary"
              onClick={handleRetryConfirm}
              disabled={actionLoading}
            >
              {actionLoading ? 'Processing...' : 'Retry'}
            </Button>
          </Box>
        </Box>
      </Dialog>

      {/* Refund confirmation dialog */}
      <Dialog open={openRefundDialog} onClose={() => setOpenRefundDialog(false)}>
        <Box sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>Issue Refund</Typography>
          <Divider sx={{ mb: 2 }} />
          <Typography sx={{ mb: 3 }}>
            Refund transaction #{transaction.id} for {transaction.amount}?
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button 
              variant="outlined" 
              onClick={() => setOpenRefundDialog(false)}
              disabled={actionLoading}
            >
              Cancel
            </Button>
            <Button 
              variant="contained" 
              color="error"
              onClick={handleRefundConfirm}
              disabled={actionLoading}
            >
              {actionLoading ? 'Processing...' : 'Confirm Refund'}
            </Button>
          </Box>
        </Box>
      </Dialog>
    </>
  );
};

export default TransactionActions;