'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Grid, Card, CardContent, Typography, Button } from '@mui/material';

interface CarListProps {
  filters: any;
  page: number;
  onPageChange: (page: number) => void;
}

const CarList: React.FC<CarListProps> = ({ filters = {}, page, onPageChange }) => {
  const [cars, setCars] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams();
    if (filters && typeof filters === 'object') {
      Object.keys(filters).forEach(key => {
        if (Array.isArray(filters[key])) {
          filters[key].forEach((value: string) => params.append(`${key}[]`, value));
        } else {
          params.append(key, filters[key]);
        }
      });
    }
    params.append('page', page.toString());

    setLoading(true);

    axios.get(`https://test.taxivoshod.ru/api/test/?w=catalog-cars&${params.toString()}`)
      .then(response => {
        setCars(response.data.list || []);
        setTotalPages(response.data.pages || 1);
        setLoading(false);
      })
      .catch(() => {
        setCars([]);
        setTotalPages(1);
        setLoading(false);
      });
  }, [filters, page]);

  const navigateToCarPage = (carId: number) => {
    router.push(`/car/${carId}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (cars.length === 0) {
    return <div>No cars found.</div>;
  }

  return (
    <Grid container spacing={3}>
      {cars.map((car: any) => (
        <Grid item xs={12} sm={6} md={4} key={car.id}>
          <Card>
            <div onClick={() => navigateToCarPage(car.id)} style={{ cursor: 'pointer' }}>
              <div style={{ position: 'relative', paddingTop: '56.25%' }}>
                <Image src={car.image || '/no-image.jpg'} alt={car.brand} layout="fill" objectFit="cover" />
              </div>
              <CardContent>
                <Typography variant="h6" component="div" gutterBottom>
                  {car.brand} {car.model}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Registration Number: {car.number}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Price: {car.price}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Rate: {car.tarif.join(', ') || 'N/A'}
                </Typography>
              </CardContent>
            </div>
            <div style={{ textAlign: 'center', padding: '10px' }}>
              <Button onClick={() => navigateToCarPage(car.id)} variant="contained" color="primary">
                View Details
              </Button>
            </div>
          </Card>
        </Grid>
      ))}
      <Grid item xs={12}>
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          {Array.from({ length: totalPages }, (_, i) => (
            <Button key={i} onClick={() => onPageChange(i + 1)} variant="outlined" style={{ margin: '5px' }}>
              {i + 1}
            </Button>
          ))}
        </div>
      </Grid>
    </Grid>
  );
};

export default CarList;
