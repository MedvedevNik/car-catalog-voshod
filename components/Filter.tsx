'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import { SelectChangeEvent } from '@mui/material';

interface BrandModel {
  brand: string;
  models: string[];
}

interface FilterProps {
  filters: {
    brand: string;
    model: string;
    rate: string[];
  };
  onFilterChange: (filters: {
    brand: string;
    model: string;
    rate: string[];
  }) => void;
}

const Filter: React.FC<FilterProps> = ({ filters, onFilterChange }) => {
  const [brands, setBrands] = useState<string[]>([]);
  const [models, setModels] = useState<{ [key: string]: string[] }>({});
  const [rates, setRates] = useState<{ [key: string]: string }>({});
  const [selectedBrand, setSelectedBrand] = useState<string>(filters.brand || '');
  const [selectedModel, setSelectedModel] = useState<string>(filters.model || '');
  const [selectedRate, setSelectedRate] = useState<string[]>(filters.rate || []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://test.taxivoshod.ru/api/test/?w=catalog-filter');
        const data = response.data;
        setBrands(data.brands.values);
        const modelMap: { [key: string]: string[] } = {};
        data.models.values.forEach((item: BrandModel) => {
          modelMap[item.brand] = item.models;
        });
        setModels(modelMap);
        setRates(data.tarif.values);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle error state or display a message to the user
      }
    };

    fetchData();
  }, []);

  const handleBrandChange = (event: SelectChangeEvent<string>) => {
    const selected = event.target.value as string;
    setSelectedBrand(selected);
    setSelectedModel(''); // Reset model when brand changes
    onFilterChange({ ...filters, brand: selected, model: '' });
  };

  const handleModelChange = (event: SelectChangeEvent<string>) => {
    const selected = event.target.value as string;
    setSelectedModel(selected);
    onFilterChange({ ...filters, model: selected });
  };

  const handleRateChange = (event: SelectChangeEvent<string[]>) => {
    const selected = event.target.value as string[];
    setSelectedRate(selected);
    onFilterChange({ ...filters, rate: selected });
  };

  return (
    <div className="filters">
      <FormControl fullWidth variant="outlined" sx={{ marginBottom: '10px' }}>
        <InputLabel id="brand-label">Brand</InputLabel>
        <Select
          labelId="brand-label"
          id="brand-select"
          value={selectedBrand}
          onChange={handleBrandChange}
          label="Brand"
        >
          {brands.map((brand) => (
            <MenuItem key={brand} value={brand}>
              {brand}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth variant="outlined" sx={{ marginBottom: '10px' }}>
        <InputLabel id="model-label">Model</InputLabel>
        <Select
          labelId="model-label"
          id="model-select"
          value={selectedModel}
          onChange={handleModelChange}
          label="Model"
          disabled={!selectedBrand} // Disable model select until brand is selected
        >
          {models[selectedBrand]?.map((model) => (
            <MenuItem key={model} value={model}>
              {model}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth variant="outlined" sx={{ marginBottom: '10px' }}>
        <InputLabel id="rate-label">Rate</InputLabel>
        <Select
          labelId="rate-label"
          id="rate-select"
          multiple
          value={selectedRate}
          onChange={handleRateChange}
          label="Rate"
        >
          {Object.keys(rates).map((rateKey) => (
            <MenuItem key={rateKey} value={rateKey}>
              {rates[rateKey]}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default Filter;
