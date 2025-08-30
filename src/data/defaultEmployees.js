export const defaultEmployees = [
  {
    id: 1001,
    fullName: "Sarah Johnson",
    email: "sarah.johnson@company.com",
    jobRole: "Frontend Developer",
    startDate: "2024-01-15",
    onboarded: false,
    tasks: [
      { id: 1, name: "Complete HR Paperwork", description: "Fill out all required forms and documentation", completed: true },
      { id: 2, name: "Set up IT Equipment", description: "Laptop, phone, and access cards", completed: true },
      { id: 3, name: "Office Tour", description: "Get familiar with office layout and facilities", completed: true },
      { id: 4, name: "Meet Team Members", description: "Introduction to direct team and key stakeholders", completed: false },
      { id: 5, name: "Complete Security Training", description: "Mandatory security awareness training", completed: false },
      { id: 6, name: "Review Company Policies", description: "Read and acknowledge company handbook", completed: false },
      { id: 7, name: "Set up Development Environment", description: "Install tools and access repositories", completed: false },
      { id: 8, name: "First Week Check-in", description: "Meet with manager to discuss progress", completed: false }
    ]
  },
  {
    id: 1002,
    fullName: "Michael Chen",
    email: "michael.chen@company.com",
    jobRole: "Product Manager",
    startDate: "2024-02-01",
    onboarded: true,
    tasks: [
      { id: 1, name: "Complete HR Paperwork", description: "Fill out all required forms and documentation", completed: true },
      { id: 2, name: "Set up IT Equipment", description: "Laptop, phone, and access cards", completed: true },
      { id: 3, name: "Office Tour", description: "Get familiar with office layout and facilities", completed: true },
      { id: 4, name: "Meet Team Members", description: "Introduction to direct team and key stakeholders", completed: true },
      { id: 5, name: "Complete Security Training", description: "Mandatory security awareness training", completed: true },
      { id: 6, name: "Review Company Policies", description: "Read and acknowledge company handbook", completed: true },
      { id: 7, name: "Product Training", description: "Learn about current products and roadmap", completed: true },
      { id: 8, name: "First Week Check-in", description: "Meet with manager to discuss progress", completed: true }
    ]
  }
];