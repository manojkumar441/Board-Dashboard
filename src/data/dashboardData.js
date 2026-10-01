// Dashboard static mock data matching design specifications

export const statsData = [
  {
    id: "revenues",
    title: "Total Revenues",
    value: "$2,129,430",
    icon: "Banknote",
    bgClass: "bg-[#DDEFE0]",
    textColor: "text-[#333333]",
    badge: "+2.5%",
    badgeColor: "text-emerald-700 bg-emerald-100"
  },
  {
    id: "transactions",
    title: "Total Transactions",
    value: "1,520",
    icon: "Tags",
    bgClass: "bg-[#F4ECDD]",
    textColor: "text-[#333333]",
    badge: "+1.8%",
    badgeColor: "text-amber-800 bg-amber-100"
  },
  {
    id: "likes",
    title: "Total Likes",
    value: "9,721",
    icon: "ThumbsUp",
    bgClass: "bg-[#EFDADA]",
    textColor: "text-[#333333]",
    badge: "+4.1%",
    badgeColor: "text-rose-700 bg-rose-100"
  },
  {
    id: "users",
    title: "Total Users",
    value: "892",
    icon: "Users",
    bgClass: "bg-[#DEE0EF]",
    textColor: "text-[#333333]",
    badge: "+0.9%",
    badgeColor: "text-indigo-700 bg-indigo-100"
  }
];

export const activitiesByPeriod = {
  "May - June 2021": [
    { week: "Week 1", guest: 380, user: 420 },
    { week: "Week 2", guest: 210, user: 300 },
    { week: "Week 3", guest: 290, user: 440 },
    { week: "Week 4", guest: 450, user: 220 }
  ],
  "July - August 2021": [
    { week: "Week 1", guest: 280, user: 350 },
    { week: "Week 2", guest: 390, user: 410 },
    { week: "Week 3", guest: 410, user: 490 },
    { week: "Week 4", guest: 320, user: 450 }
  ],
  "September - October 2021": [
    { week: "Week 1", guest: 420, user: 390 },
    { week: "Week 2", guest: 310, user: 470 },
    { week: "Week 3", guest: 460, user: 510 },
    { week: "Week 4", guest: 490, user: 480 }
  ]
};

export const productsByPeriod = {
  "May - June 2021": [
    { name: "Basic Tees", percentage: 55, value: 55, color: "#98D89E" },
    { name: "Custom Short Pants", percentage: 31, value: 31, color: "#F6DC7D" },
    { name: "Super Hoodies", percentage: 14, value: 14, color: "#EE8484" }
  ],
  "July - August 2021": [
    { name: "Basic Tees", percentage: 48, value: 48, color: "#98D89E" },
    { name: "Custom Short Pants", percentage: 37, value: 37, color: "#F6DC7D" },
    { name: "Super Hoodies", percentage: 15, value: 15, color: "#EE8484" }
  ],
  "September - October 2021": [
    { name: "Basic Tees", percentage: 42, value: 42, color: "#98D89E" },
    { name: "Custom Short Pants", percentage: 28, value: 28, color: "#F6DC7D" },
    { name: "Super Hoodies", percentage: 30, value: 30, color: "#EE8484" }
  ]
};

export const schedulesData = [
  {
    id: 1,
    title: "Meeting with suppliers from Kuta Bali",
    time: "14:00-15:00",
    location: "at Sunset Road, Kuta, Bali",
    borderColor: "#9BDD7C"
  },
  {
    id: 2,
    title: "Check operation at Giga Factory 1",
    time: "18:00-20:00",
    location: "at Central Jakarta",
    borderColor: "#6972C4"
  },
  {
    id: 3,
    title: "Product Design Sprint Review",
    time: "09:30-11:00",
    location: "at Headquarters Conference Room 3",
    borderColor: "#F6DC7D"
  },
  {
    id: 4,
    title: "Quarterly Financial Overview",
    time: "16:00-17:30",
    location: "Virtual Meeting Room Alpha",
    borderColor: "#EE8484"
  }
];

export const decorativeAvatars = [
  {
    id: 1,
    name: "Alex Morgan",
    role: "Lead Designer",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80"
  },
  {
    id: 2,
    name: "David Kim",
    role: "Product Manager",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80"
  },
  {
    id: 3,
    name: "Sarah Chen",
    role: "Senior Engineer",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80"
  },
  {
    id: 4,
    name: "James Wilson",
    role: "Data Analyst",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80"
  }
];

export const transactionsList = [
  { id: "TXN-8941", customer: "Sophia Rodriguez", date: "May 28, 2021", amount: "$3,420.00", status: "Completed", method: "Credit Card" },
  { id: "TXN-8942", customer: "Liam Johnson", date: "May 29, 2021", amount: "$1,890.50", status: "Completed", method: "PayPal" },
  { id: "TXN-8943", customer: "Emma Williams", date: "May 30, 2021", amount: "$720.00", status: "Pending", method: "Google Pay" },
  { id: "TXN-8944", customer: "Noah Brown", date: "Jun 01, 2021", amount: "$5,110.25", status: "Completed", method: "Bank Transfer" },
  { id: "TXN-8945", customer: "Olivia Davis", date: "Jun 02, 2021", amount: "$940.00", status: "Failed", method: "Credit Card" },
  { id: "TXN-8946", customer: "Lucas Miller", date: "Jun 03, 2021", amount: "$2,640.80", status: "Completed", method: "Apple Pay" },
  { id: "TXN-8947", customer: "Ava Wilson", date: "Jun 04, 2021", amount: "$4,300.00", status: "Completed", method: "Credit Card" }
];

export const usersList = [
  { id: 1, name: "Sundar Pichai", email: "sundar@google.com", role: "Administrator", status: "Active", department: "Executive", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80" },
  { id: 2, name: "Alex Morgan", email: "alex.m@board.dev", role: "Lead Designer", status: "Active", department: "Design", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80" },
  { id: 3, name: "David Kim", email: "david.k@board.dev", role: "Product Manager", status: "Away", department: "Management", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80" },
  { id: 4, name: "Sarah Chen", email: "sarah.c@board.dev", role: "Senior Engineer", status: "Active", department: "Engineering", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80" },
  { id: 5, name: "James Wilson", email: "james.w@board.dev", role: "Data Analyst", status: "Offline", department: "Analytics", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80" }
];
