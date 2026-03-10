export interface Contact {
  id: string
  name: string
  photo: string
  role?: string
  company?: string
  starLevel: 1 | 2 | 3
  starColor: 'yellow' | 'blue'
}

export const MOCK_CONTACTS: Contact[] = [
  { id: '01', name: 'Aaron Bernstein', photo: '/contacts/Aaron_Bernstein.jpeg', role: 'Head of Partnerships', company: 'Gigascale Capital', starLevel: 2, starColor: 'yellow' },
  { id: '02', name: 'Amelia Ong', photo: '/contacts/Amelia_Ong.gif', role: 'Executive Director', company: 'OSK Ventures International Berhad', starLevel: 3, starColor: 'blue' },
  { id: '03', name: 'Andrew Clarke', photo: '/contacts/Andrew_Clarke.jpeg', role: 'Senior Investment Strategist, Principal', company: 'Vanguard', starLevel: 1, starColor: 'yellow' },
  { id: '04', name: 'Andrew Goldsmith', photo: '/contacts/Andrew_Goldsmith.jpeg', role: 'Managing Director, Global Head of Business Development', company: 'BroadRiver Asset Management', starLevel: 2, starColor: 'yellow' },
  { id: '05', name: 'Andrew Saunders', photo: '/contacts/Andrew_Saunders.jpeg', starLevel: 3, starColor: 'yellow' },
  { id: '06', name: 'Augustus Helson', photo: '/contacts/Augustus_Helson.jpeg', starLevel: 1, starColor: 'blue' },
  { id: '07', name: 'Bill Ings', photo: '/contacts/Bill_Ings.jpeg', starLevel: 2, starColor: 'yellow' },
  { id: '08', name: 'Brian McDaid', photo: '/contacts/Brian_McDaid.gif', starLevel: 3, starColor: 'yellow' },
  { id: '09', name: 'Charles Robinson', photo: '/contacts/Charles_Robinson.jpeg', starLevel: 1, starColor: 'yellow' },
  { id: '10', name: 'David Belton', photo: '/contacts/David_Belton.jpeg', starLevel: 2, starColor: 'blue' },
  { id: '11', name: 'Frank Ballantine', photo: '/contacts/Frank_Ballantine.jpeg', starLevel: 1, starColor: 'yellow' },
  { id: '12', name: 'Fritz Kaegi', photo: '/contacts/Fritz_Kaegi.jpeg', starLevel: 3, starColor: 'yellow' },
  { id: '13', name: 'George Huffman', photo: '/contacts/George_Huffman.jpeg', starLevel: 2, starColor: 'yellow' },
  { id: '14', name: 'Guy Lebas', photo: '/contacts/Guy_Lebas_Image.jpeg', starLevel: 1, starColor: 'blue' },
  { id: '15', name: 'James Farrow', photo: '/contacts/James_Farrow.jpeg', starLevel: 3, starColor: 'blue' },
  { id: '16', name: 'James Kinsella', photo: '/contacts/James_Kinsella.jpeg', starLevel: 2, starColor: 'yellow' },
  { id: '17', name: 'Jeff Millman', photo: '/contacts/Jeff_Millman.jpeg', starLevel: 1, starColor: 'yellow' },
  { id: '18', name: 'Jonathan Jenny', photo: '/contacts/Jonathan_Jenny.jpeg', starLevel: 2, starColor: 'yellow' },
  { id: '19', name: 'Jonathan Sprogell', photo: '/contacts/Jonathan_Sprogell.jpeg', starLevel: 3, starColor: 'yellow' },
  { id: '20', name: 'Kate Westhuis', photo: '/contacts/Kate_Westhuis.jpeg', starLevel: 1, starColor: 'yellow' },
  { id: '21', name: 'Kevin A. Conn', photo: '/contacts/Kevin_A._Conn.jpeg', starLevel: 2, starColor: 'blue' },
  { id: '22', name: 'Laura Boyd', photo: '/contacts/Laura_Boyd.jpeg', starLevel: 3, starColor: 'yellow' },
  { id: '23', name: 'Max Gerard', photo: '/contacts/Max_Gerard.jpeg', starLevel: 1, starColor: 'yellow' },
  { id: '24', name: 'Michel Lerner', photo: '/contacts/Michel_Lerner.jpeg', starLevel: 2, starColor: 'yellow' },
  { id: '25', name: 'Nelson Wicas', photo: '/contacts/Nelson_Wicas.jpeg', starLevel: 3, starColor: 'blue' },
  { id: '26', name: 'Nick Colas', photo: '/contacts/Nick_Colas.jpeg', starLevel: 1, starColor: 'yellow' },
  { id: '27', name: 'Ray Garman', photo: '/contacts/Ray_Garman.jpeg', starLevel: 2, starColor: 'yellow' },
  { id: '28', name: 'Rupert', photo: '/contacts/Rupert.jpeg', starLevel: 3, starColor: 'yellow' },
  { id: '29', name: 'Shellyn Yang', photo: '/contacts/Shellyn_Yang.jpeg', starLevel: 2, starColor: 'blue' },
  { id: '30', name: 'Steven Begleiter', photo: '/contacts/Steven_Begleiter.jpeg', starLevel: 1, starColor: 'yellow' },
  { id: '31', name: 'Tean Ly', photo: '/contacts/Tean_Ly.jpeg', starLevel: 2, starColor: 'yellow' },
  { id: '32', name: 'Thu Tran', photo: '/contacts/Thu_Tran.jpeg', starLevel: 3, starColor: 'yellow' },
  { id: '33', name: 'Tommy Whelan', photo: '/contacts/Tommy_Whelan.jpeg', starLevel: 1, starColor: 'blue' },
  { id: '34', name: 'Victoria Carlin', photo: '/contacts/Victoria_Carlin.jpeg', starLevel: 2, starColor: 'yellow' },
]
