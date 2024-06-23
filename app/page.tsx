"use client"
import { useState } from 'react';
import Filter from '@/components/Filter';
import CarList from '@/components/CarList';

interface FiltersState {
	brand: string;
    model: string;
  rate: string[];
}

const Home: React.FC = () => {
  const [filters, setFilters] = useState<FiltersState>({
    brand: "",
    model: "",
    rate: [],
  });
  const [page, setPage] = useState(1);

  const handleFilterChange = (newFilters: FiltersState) => {
    setFilters(newFilters);
    setPage(1); // Reset to first page on filter change
  };

  return (
    <div className="container">
      <Filter filters={filters} onFilterChange={handleFilterChange} />
      <CarList filters={filters} page={page} onPageChange={setPage} />
    </div>
  );
};

export default Home;
