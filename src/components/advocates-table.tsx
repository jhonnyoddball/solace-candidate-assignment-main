"use client";

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {
  Typography,
  Box,
  Chip,
  Stack,
  CircularProgress
} from '@mui/material';
import { Advocate } from '@/types';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

interface AdvocatesTableProps {
  advocates: Advocate[];
  loading: boolean;
}

export default function AdvocatesTable({ advocates, loading }: AdvocatesTableProps) {
  return (
    <TableContainer component={Paper} sx={{ mt: 2 }}>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Table sx={{ minWidth: 700 }} aria-label="advocates table">
          <TableHead>
            <TableRow>
              <StyledTableCell>First Name</StyledTableCell>
              <StyledTableCell>Last Name</StyledTableCell>
              <StyledTableCell>City</StyledTableCell>
              <StyledTableCell>Degree</StyledTableCell>
              <StyledTableCell>Specialties</StyledTableCell>
              <StyledTableCell align="right">Years of Experience</StyledTableCell>
              <StyledTableCell align="right">Phone Number</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {advocates.map((advocate) => (
              <StyledTableRow key={advocate.id}>
                <StyledTableCell component="th" scope="row">
                  {advocate.firstName}
                </StyledTableCell>
                <StyledTableCell>{advocate.lastName}</StyledTableCell>
                <StyledTableCell>{advocate.city}</StyledTableCell>
                <StyledTableCell>{advocate.degree}</StyledTableCell>
                <StyledTableCell>
                  <Stack direction="row" spacing={0.5} flexWrap="wrap">
                    {advocate.specialties.map((specialty, index) => (
                      <Chip
                        key={index}
                        label={specialty}
                        size="small"
                        variant="outlined"
                        sx={{ mb: 0.5 }}
                      />
                    ))}
                  </Stack>
                </StyledTableCell>
                <StyledTableCell align="right">{advocate.yearsOfExperience}</StyledTableCell>
                <StyledTableCell align="right">{advocate.phoneNumber}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </TableContainer>
  );
}
