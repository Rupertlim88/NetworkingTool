export interface Contact {
  id: string
  name: string
  photo: string
  starLevel: 1 | 2 | 3
  starColor: 'yellow' | 'blue'
}

export const MOCK_CONTACTS: Contact[] = [
  { id: '01', name: 'Alex Johnson', photo: '/headshot.jpg', starLevel: 3, starColor: 'yellow' },
  { id: '02', name: 'Maya Patel', photo: '/headshot.jpg', starLevel: 2, starColor: 'yellow' },
  { id: '03', name: 'Jordan Lee', photo: '/headshot.jpg', starLevel: 1, starColor: 'blue' },
  { id: '04', name: 'Sophia Chen', photo: '/headshot.jpg', starLevel: 2, starColor: 'yellow' },
  { id: '05', name: 'Marcus Rivera', photo: '/headshot.jpg', starLevel: 3, starColor: 'blue' },
  { id: '06', name: 'Ava Thompson', photo: '/headshot.jpg', starLevel: 1, starColor: 'yellow' },
  { id: '07', name: 'Ethan Kim', photo: '/headshot.jpg', starLevel: 2, starColor: 'yellow' },
  { id: '08', name: 'Priya Sharma', photo: '/headshot.jpg', starLevel: 1, starColor: 'yellow' },
  { id: '09', name: 'Lucas Martinez', photo: '/headshot.jpg', starLevel: 3, starColor: 'yellow' },
  { id: '10', name: 'Chloe Nguyen', photo: '/headshot.jpg', starLevel: 2, starColor: 'blue' },
  { id: '11', name: 'Daniel Wright', photo: '/headshot.jpg', starLevel: 1, starColor: 'yellow' },
  { id: '12', name: 'Isabella Garcia', photo: '/headshot.jpg', starLevel: 2, starColor: 'yellow' },
  { id: '13', name: 'Ryan Cooper', photo: '/headshot.jpg', starLevel: 3, starColor: 'blue' },
  { id: '14', name: 'Hannah Brooks', photo: '/headshot.jpg', starLevel: 1, starColor: 'yellow' },
  { id: '15', name: 'Omar Hassan', photo: '/headshot.jpg', starLevel: 2, starColor: 'blue' },
  { id: '16', name: 'Emily Sato', photo: '/headshot.jpg', starLevel: 1, starColor: 'yellow' },
  { id: '17', name: 'Nathan Park', photo: '/headshot.jpg', starLevel: 3, starColor: 'yellow' },
  { id: '18', name: 'Lily Zhang', photo: '/headshot.jpg', starLevel: 2, starColor: 'yellow' },
  { id: '19', name: 'James O\'Brien', photo: '/headshot.jpg', starLevel: 1, starColor: 'blue' },
  { id: '20', name: 'Zara Williams', photo: '/headshot.jpg', starLevel: 2, starColor: 'yellow' },
  { id: '21', name: 'Chris Taylor', photo: '/headshot.jpg', starLevel: 3, starColor: 'yellow' },
  { id: '22', name: 'Nadia Petrov', photo: '/headshot.jpg', starLevel: 1, starColor: 'yellow' },
  { id: '23', name: 'Kevin Huang', photo: '/headshot.jpg', starLevel: 2, starColor: 'blue' },
  { id: '24', name: 'Sarah Mitchell', photo: '/headshot.jpg', starLevel: 3, starColor: 'blue' },
  { id: '25', name: 'Diego Santos', photo: '/headshot.jpg', starLevel: 1, starColor: 'yellow' },
  { id: '26', name: 'Mia Anderson', photo: '/headshot.jpg', starLevel: 2, starColor: 'yellow' },
  { id: '27', name: 'Tyler Reed', photo: '/headshot.jpg', starLevel: 3, starColor: 'yellow' },
  { id: '28', name: 'Aisha Mohammed', photo: '/headshot.jpg', starLevel: 1, starColor: 'blue' },
  { id: '29', name: 'Ben Foster', photo: '/headshot.jpg', starLevel: 2, starColor: 'blue' },
  { id: '30', name: 'Rachel Kim', photo: '/headshot.jpg', starLevel: 2, starColor: 'yellow' },
]
