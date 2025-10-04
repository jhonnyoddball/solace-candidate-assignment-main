"use client";

import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Pagination
} from '@mui/material';
import { Clear } from '@mui/icons-material';
import { Advocate, PaginationInfo, ApiResponse } from '@/types';
import AdvocatesTable from '@/components/advocates-table';

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [pagination, setPagination] = useState<PaginationInfo>({ 
    limit: 10, 
    offset: 0, 
    total: 0, 
    hasMore: false 
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchAdvocates = async (page: number = 1, limit: number = 10) => {
    setLoading(true);
    const offset = (page - 1) * limit;
    console.log(`Fetching advocates... page ${page}, limit ${limit}, offset ${offset}`);
    
    try {
      const response = await fetch(`/api/advocates?limit=${limit}&offset=${offset}`);
      const jsonResponse: ApiResponse<Advocate> = await response.json();
      setAdvocates(jsonResponse.data);
      setFilteredAdvocates(jsonResponse.data);
      setPagination(jsonResponse.pagination);
    } catch (error) {
      console.error("Error fetching advocates:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdvocates(currentPage, 10); // Use fixed limit for now
  }, [currentPage]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
    setSearchTerm(""); // Clear search when changing pages
  };

  const onChange = (e: { target: { value: any; }; }) => {
    const searchedTerm = e.target.value;
    setSearchTerm(searchedTerm);
    console.log("search term:", searchedTerm);

    console.log("filtering advocates...");
    const filteredAdvocates = advocates.filter((advocate) => {
      return (
        advocate.firstName.includes(searchedTerm) ||
        advocate.lastName.includes(searchedTerm) ||
        advocate.city.includes(searchedTerm) ||
        advocate.degree.includes(searchedTerm) ||
        advocate.specialties.includes(searchedTerm) ||
        advocate.yearsOfExperience.toString().includes(searchedTerm)
      );
    });

    setFilteredAdvocates(filteredAdvocates);
  };

  const onClick = () => {
    console.log(advocates);
    setSearchTerm("");
    setFilteredAdvocates(advocates);
  };

  const totalPages = Math.ceil(pagination.total / pagination.limit);

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        Solace Advocates
      </Typography>

      <Box sx={{ mb: 4, display: 'flex', gap: 2, alignItems: 'center', justifyContent: 'center' }}>
        <Typography gutterBottom align="center">
          Search
        </Typography>
        <TextField
          label="Search advocates"
          variant="outlined"
          value={searchTerm}
          onChange={onChange}
          placeholder="Search by name, city, degree, specialties, or experience..."
          sx={{ minWidth: 500 }}
        />
        <Button
          variant="outlined"
          onClick={onClick}
          startIcon={<Clear />}
        >
          Reset Search
        </Button>
      </Box>

      {searchTerm && (
        <Typography variant="body1" sx={{ mb: 2, textAlign: 'center' }}>
          Searching for: <strong>{searchTerm}</strong>
        </Typography>
      )}

      <AdvocatesTable advocates={filteredAdvocates} loading={loading} />

      {/* Pagination Controls */}
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 3, gap: 2 }}>
        <Typography variant="body2" color="text.secondary">
          Showing {pagination.offset + 1} to {Math.min(pagination.offset + pagination.limit, pagination.total)} of {pagination.total} advocates
        </Typography>
        <Pagination 
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          showFirstButton 
          showLastButton
          disabled={loading}
        />
      </Box>

      {filteredAdvocates.length === 0 && advocates.length > 0 && (
        <Typography variant="body1" sx={{ mt: 2, textAlign: 'center', color: 'text.secondary' }}>
          No advocates found matching your search criteria.
        </Typography>
      )}
    </Container>
  );
}
