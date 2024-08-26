function localizeUserRole(role: string): string {
  switch (role) {
    case "Admin":
      return "Administrator";
    case "Manager":
      return "Manager";
    default:
      return "Agent";
  }
}

export default localizeUserRole;
