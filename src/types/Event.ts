export type Attendee = {
  id: string;
  fullName: string;
  team: string;
};

export type Event = {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  capacity: number;
  attendees: Attendee[];
  tags: string[];
};

export type CreateEventInput = {
  title: string;
  description: string;
  date: string;
  location: string;
  capacity: number;
  tags: string[];
};