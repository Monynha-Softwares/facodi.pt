
import { Playlist } from '../types';

export const PLAYLISTS: Playlist[] = [
  {
    id: 'pl-01',
    title: 'Foundations of Computation',
    description: 'The core essentials for any aspiring engineer. Logic, programming basics, and hardware understanding.',
    units: ['19411000', '19411005', '19411009'],
    estimatedHours: 450,
    creator: 'FACODI Core'
  },
  {
    id: 'pl-02',
    title: 'Modern Intelligence Stack',
    description: 'From classic AI to modern Machine Learning. Understand the transition from logic to statistics.',
    units: ['19411022', '19411013', '19411020'],
    estimatedHours: 400,
    creator: 'AI Guild'
  },
  {
    id: 'pl-03',
    title: 'Math for Data Science',
    description: 'Linear algebra and probability tracks specifically selected for data-heavy applications.',
    units: ['19411003', '19411018', '19411002'],
    estimatedHours: 350,
    creator: 'Math Dept'
  }
];
