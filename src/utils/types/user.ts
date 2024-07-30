type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  role: string;
  notificationToken: string | null;
  agentIds: string[] | null;
};

export default User;
