type Objective = {
  id: string;
  createdAt: string;
  objective1: string;
  objective2: string | null;
  isActive: boolean;
  expertises: string[];
  reminder: string | null;
  startingAt: string;
  endingAt: string;
};

export default Objective;
