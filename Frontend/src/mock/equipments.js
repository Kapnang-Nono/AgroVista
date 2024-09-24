import { havester, seeder, sprayer, Tractor, Plow } from '../assets/images';
export const initialEquipmentList = [
    { id: 1, name: 'Tractor', type: 'Heavy Machinery', price: 100000, location: 'Yaounde', availability: ['2024-09-05', '2024-09-06', '2024-09-07'], image: Tractor },
    { id: 2, name: 'Harvester', type: 'Heavy Machinery', price: 150000, location: 'Buea', availability: ['2024-09-08', '2024-09-09', '2024-09-10'], image: havester },
    { id: 3, name: 'Plow', type: 'Attachment', price: 50000, location: 'Yaounde', availability: ['2024-09-11', '2024-09-12', '2024-09-13'], image: Plow },
    { id: 4, name: 'Seeder', type: 'Attachment', price: 75000, location: 'Bamenda', availability: ['2024-09-14', '2024-09-15', '2024-09-16'], image: seeder },
    { id: 5, name: 'Sprayer', type: 'Attachment', price: 80000, location: 'Bamenda', availability: ['2024-09-17', '2024-09-18', '2024-09-19'], image: sprayer },
  ];

