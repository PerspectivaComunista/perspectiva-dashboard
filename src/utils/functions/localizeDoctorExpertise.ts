function localizeDoctorExpertise(expertise: string): string {
  switch (expertise) {
    case "familyMedicine":
      return "Medicină de familie";
    case "pediatrics":
      return "Pediatrie";
    case "otorhinolaryngology":
      return "Otorinolaringologie";
    case "pulmonology":
      return "Pneumologie";
    case "infectiousDiseases":
      return "Boli infecțioase";
    case "allergyClinicalImmunology":
      return "Alergologie și imunologie clinică";
    case "gastroenterology":
      return "Gastroenterologie";
    case "neonatology":
      return "Neonatologie";
    case "nephrology":
      return "Nefrologie";
    case "neurologyPsychiatry":
      return "Neurologie și psihiatrie";
    case "dermatology":
      return "Dermatologie";
    default:
      return "Altele";
  }
}

export default localizeDoctorExpertise;
