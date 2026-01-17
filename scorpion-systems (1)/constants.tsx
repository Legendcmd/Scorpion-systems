
import React from 'react';
import { TeamMember, Project } from './types';

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: '1',
    name: 'Alex "Venom" Chen',
    role: 'Lead Architect',
    bio: 'Specializing in high-throughput distributed systems and low-latency networking.',
    image: 'https://picsum.photos/seed/venom/400/400',
    specialties: ['Rust', 'K8s', 'gRPC']
  },
  {
    id: '2',
    name: 'Sarah "Stinger" Vance',
    role: 'AI Research Lead',
    bio: 'Pioneering generative models and neural architecture search for edge devices.',
    image: 'https://picsum.photos/seed/stinger/400/400',
    specialties: ['PyTorch', 'LLMs', 'Computer Vision']
  },
  {
    id: '3',
    name: 'Marcus "Apex" Thorne',
    role: 'Product Strategy',
    bio: 'Bridging the gap between complex engineering and user-centric design.',
    image: 'https://picsum.photos/seed/apex/400/400',
    specialties: ['UX', 'Growth', 'Strategy']
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'p1',
    title: 'Project Obsidian',
    category: 'Security',
    description: 'Next-gen encrypted communication protocol for enterprise sovereignty.',
    image: 'https://picsum.photos/seed/obsidian/600/400'
  },
  {
    id: 'p2',
    title: 'Neural Hive',
    category: 'AI',
    description: 'A distributed training framework that leverages idle GPU cycles across global nodes.',
    image: 'https://picsum.photos/seed/hive/600/400'
  },
  {
    id: 'p3',
    title: 'Aegis Platform',
    category: 'Cloud',
    description: 'Automated infrastructure scaling with predictive anomaly detection.',
    image: 'https://picsum.photos/seed/aegis/600/400'
  }
];

export const STATS_DATA = [
  { name: 'Mon', efficiency: 85, uptime: 99.9 },
  { name: 'Tue', efficiency: 88, uptime: 99.8 },
  { name: 'Wed', efficiency: 94, uptime: 100 },
  { name: 'Thu', efficiency: 91, uptime: 99.9 },
  { name: 'Fri', efficiency: 96, uptime: 99.9 },
  { name: 'Sat', efficiency: 98, uptime: 100 },
  { name: 'Sun', efficiency: 99, uptime: 100 },
];
