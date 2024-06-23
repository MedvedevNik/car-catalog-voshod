'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import ImageSlider from './ImageSlider';
import { Button, Container, Typography, IconButton, Box } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface ClientCarDetailProps {
  car: any;
}

const ClientCarDetail: React.FC<ClientCarDetailProps> = ({ car }) => {
  const [loading, setLoading] = useState(!car);
  const router = useRouter();

  useEffect(() => {
    if (!car) {
      setLoading(false);
    }
  }, [car]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!car) {
    return <div>Car not found.</div>;
  }

  return (
    <Container>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <IconButton onClick={() => router.back()} sx={{ mr: 1 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" component="h1">
          {car.brand} {car.model}
        </Typography>
      </Box>
      {car.images.length > 1 ? (
        <ImageSlider images={car.images} />
      ) : (
        <Box sx={{ width: 600, height: 400, position: 'relative' }}>
          <Image src={car.images[0].image} alt={car.brand} layout="fill" objectFit="cover" />
        </Box>
      )}
      <Typography variant="h6" sx={{ mt: 2 }}>Price: {car.price}</Typography>
      <Typography variant="h6">Rate: {car.tarif.join(', ') || 'N/A'}</Typography>
    </Container>
  );
};

export default ClientCarDetail;
