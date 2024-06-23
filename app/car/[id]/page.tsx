import { Metadata } from 'next';
import ClientCarDetail from '@/components/ClientCarDetail';
import axios from 'axios';

interface CarDetailProps {
  params: {
    id: string;
  };
}

const CarDetail: React.FC<CarDetailProps> = async ({ params }) => {
  const { id } = params;

  let car = null;
  try {
    const response = await axios.get(`https://test.taxivoshod.ru/api/test/?w=catalog-car&id=${id}`);
    car = response.data.item;
  } catch (error) {
    console.error('Error fetching car data:', error);
  }

  return (
    <div className="container">
    	<ClientCarDetail car={car} />
	</div>
  );
};

export default CarDetail;

export async function generateMetadata({ params }: CarDetailProps): Promise<Metadata> {
  const { id } = params;
  const metadata: Metadata = {
    title: `Car Detail - ${id}`,
  };
  return metadata;
}
