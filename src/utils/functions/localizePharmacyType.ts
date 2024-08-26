function localizePharmacyType(type: string): string {
  switch (type) {
    case "regional":
      return "Lant regional";
    case "national":
      return "Lant national";
    default:
      return "Independenta";
  }
}

export default localizePharmacyType;
