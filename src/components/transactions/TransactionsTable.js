// components/dashboard/transactions/TransactionsTable.js
import React, { useState } from 'react';
import {
  Box,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Checkbox,
  Typography,
  Pagination,
  Stack,
  Button,
  TextField,
  InputAdornment,
  Skeleton,
  Chip,
  Menu,
  MenuItem,
  FormControl,
  Select,
  InputLabel
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterListIcon,
  Download as DownloadIcon,
  NavigateBefore as NavigateBeforeIcon,
  NavigateNext as NavigateNextIcon
} from '@mui/icons-material';

import TransactionActions from './TransactionActions';
import TransactionDetail from './TransactionDetail';

/**
 * TransactionsTable - Displays a table of transactions with filtering and actions
 */
const TransactionsTable = ({
  transactions = [],
  loading = false,
  searchQuery = '',
  onSearchChange,
  statusFilter = 'all',
  paymentMethodFilter = 'all',
  amountRangeFilter = 'all',
  onStatusFilterChange = () => {},
  onPaymentMethodFilterChange = () => {},   
  onAmountRangeFilterChange = () => {},
  onExportCSV,
  exportLoading = false,
  selectedTransaction,
  onTransactionSelect,
  onBackToList,
  page = 1,
  setPage = () => {}
}) => {
  const PAGE_SIZE = 10;
  const pageCount = Math.ceil(transactions.length / PAGE_SIZE);
  const paginatedTransactions = transactions.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const [filterAnchorEl, setFilterAnchorEl] = useState(null);

  const handleFilterMenuOpen = (event) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterMenuClose = () => {
    setFilterAnchorEl(null);
  };

  // If a transaction is selected, show detailed view instead of table
  if (selectedTransaction) {
    return (
      <Box>
        <Button 
          startIcon={<NavigateBeforeIcon />} 
          onClick={onBackToList}
          sx={{ mb: 2 }}
        >
          Back to Transactions
        </Button>
        <TransactionDetail 
          transaction={selectedTransaction} 
          onBack={onBackToList}
        />
      </Box>
    );
  }

  // Helper to get color for status chips
  const getChipColor = (status) => {
    const statusMap = {
      completed: 'success',
      failed: 'error',
      pending: 'warning',
      refunded: 'info'
    };
    return statusMap[status?.toLowerCase()] || 'default';
  };

  // Loading skeleton rows
  const renderLoadingSkeletons = () => {
    return Array(PAGE_SIZE).fill(0).map((_, index) => (
      <TableRow key={`skeleton-${index}`}>
        <TableCell padding="checkbox"><Skeleton variant="rectangular" width={20} height={20} /></TableCell>
        <TableCell><Skeleton variant="text" /></TableCell>
        <TableCell><Skeleton variant="text" /></TableCell>
        <TableCell><Skeleton variant="text" /></TableCell>
        <TableCell><Skeleton variant="text" /></TableCell>
        <TableCell><Skeleton variant="text" /></TableCell>
        <TableCell><Skeleton variant="text" /></TableCell>
      </TableRow>
    ));
  };

  // Empty state display
  const renderEmptyState = () => (
    <TableRow>
      <TableCell colSpan={7} sx={{ border: 'none' }}>
        <Box sx={{ py: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
          <Typography variant="h6" sx={{ color: '#101012', mb: 1 }}>
            {loading ? 'Loading transactions...' : 'No Transactions Found'}
          </Typography>
          <Typography sx={{ color: '#8B8D97' }}>
            {loading ? 'Please wait while we load transaction data' : 'Transactions will appear here once processed.'}
          </Typography>
        </Box>
      </TableCell>
    </TableRow>
  );

  return (
    <Box>
      {/* Table toolbar with search and actions */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <TextField
            placeholder="Search transactions..."
            variant="outlined"
            size="small"
            sx={{ width: 300 }}
            value={searchQuery}
            onChange={onSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'text.secondary' }} />
                </InputAdornment>
              ),
            }}
          />
          
          {/* Filter Button with Dropdown */}
          <Button
            variant="outlined"
            startIcon={<FilterListIcon />}
            onClick={handleFilterMenuOpen}
          >
            Filter
          </Button>
          <Menu
            anchorEl={filterAnchorEl}
            open={Boolean(filterAnchorEl)}
            onClose={handleFilterMenuClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
          >
            <MenuItem sx={{ minWidth: 200 }}>
              <FormControl fullWidth size="small">
                <InputLabel>Status</InputLabel>
                <Select
                  value={statusFilter}
                  label="Status"
                  onChange={(e) => {
                    onStatusFilterChange(e.target.value);
                  }}
                >
                  <MenuItem value="all">All Statuses</MenuItem>
                  <MenuItem value="completed">Completed</MenuItem>
                  <MenuItem value="failed">Failed</MenuItem>
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="refunded">Refunded</MenuItem>
                </Select>
              </FormControl>
            </MenuItem>
            <MenuItem sx={{ minWidth: 200 }}>
              <FormControl fullWidth size="small">
                <InputLabel>Payment Method</InputLabel>
                <Select
                  value={paymentMethodFilter}
                  label="Payment Method"
                  onChange={(e) => {
                    onPaymentMethodFilterChange(e.target.value);
                  }}
                >
                  <MenuItem value="all">All Methods</MenuItem>
                  <MenuItem value="credit_card">Credit Card</MenuItem>
                  <MenuItem value="paypal">PayPal</MenuItem>
                  <MenuItem value="bank_transfer">Bank Transfer</MenuItem>
                  <MenuItem value="crypto">Cryptocurrency</MenuItem>
                </Select>
              </FormControl>
            </MenuItem>
            <MenuItem sx={{ minWidth: 200 }}>
              <FormControl fullWidth size="small">
                <InputLabel>Amount Range</InputLabel>
                <Select
                  value={amountRangeFilter}
                  label="Amount Range"
                  onChange={(e) => {
                    onAmountRangeFilterChange(e.target.value);
                  }}
                >
                  <MenuItem value="all">All Amounts</MenuItem>
                  <MenuItem value="0-50">$0 - $50</MenuItem>
                  <MenuItem value="50-100">$50 - $100</MenuItem>
                  <MenuItem value="100-500">$100 - $500</MenuItem>
                  <MenuItem value="500+">$500+</MenuItem>
                </Select>
              </FormControl>
            </MenuItem>
          </Menu>
        </Box>
        
        <Button
          variant="outlined"
          startIcon={<DownloadIcon />}
          onClick={onExportCSV}
          disabled={exportLoading || transactions.length === 0}
        >
          {exportLoading ? 'Exporting...' : 'Export CSV'}
        </Button>
      </Box>

      {/* Main table content */}
      <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead sx={{ bgcolor: 'grey.50' }}>
            <TableRow>
              <TableCell padding="checkbox">
                {/* <Checkbox disabled={transactions.length === 0} /> */}
              </TableCell>
              <TableCell>Transaction ID</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Payment Method</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? renderLoadingSkeletons() : 
             transactions.length > 0 ? paginatedTransactions.map((transaction) => (
                <TableRow 
                  key={transaction.id} 
                  hover 
                  sx={{ '&:hover': { bgcolor: 'action.hover' } }}
                  selected={selectedTransaction?.id === transaction.id}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedTransaction?.id === transaction.id}
                      onChange={() => onTransactionSelect(transaction)}
                    />
                  </TableCell>
                  <TableCell>#{transaction.id}</TableCell>
                  <TableCell>{transaction.customerName || 'N/A'}</TableCell>
                  <TableCell>{transaction.amount}</TableCell>
                  <TableCell>
                    {new Date(transaction.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </TableCell>
                  <TableCell>
                    {transaction.paymentMethod?.replace('_', ' ') || 'N/A'}
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={transaction.status} 
                      color={getChipColor(transaction.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <TransactionActions 
                      transaction={transaction} 
                      onViewDetails={() => onTransactionSelect(transaction)}
                    />
                  </TableCell>
                </TableRow>
              )) : renderEmptyState()}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination controls */}
      {transactions.length > 0 && (
        <Box sx={{ mt: 3, p: 2, bgcolor: 'background.paper', borderRadius: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Showing {(page - 1) * PAGE_SIZE + 1}-{Math.min(page * PAGE_SIZE, transactions.length)} of {transactions.length} transactions
          </Typography>
          <Stack direction="row" spacing={2} alignItems="center">
            <Button
              variant="outlined"
              startIcon={<NavigateBeforeIcon />}
              disabled={page === 1}
              onClick={() => setPage(p => p - 1)}
              sx={{ whiteSpace: 'nowrap' }}
            >
              Previous
            </Button>
            <Pagination
              count={pageCount}
              page={page}
              onChange={(_, newPage) => setPage(newPage)}
              color="primary"
              shape="rounded"
              sx={{ display: { xs: 'none', sm: 'block' } }}
            />
            <Button
              variant="outlined"
              endIcon={<NavigateNextIcon />}
              disabled={page === pageCount}
              onClick={() => setPage(p => p + 1)}
              sx={{ whiteSpace: 'nowrap' }}
            >
              Next
            </Button>
          </Stack>
        </Box>
      )}
    </Box>
  );
};

export default TransactionsTable;