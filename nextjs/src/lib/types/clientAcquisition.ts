export interface AvatarSnapshot {
  id: string;
  name: string;
  title: string;
  description: string;
  imageUrl: string;
  targetMarket: string;
  agency: string;
  createdAt: string;
}

export interface IdentifyTask {
  id: string;
  title: string;
  completed: boolean;
  completedAt?: string;
  notes?: string;
}

export interface IdentifySection {
  tasks: IdentifyTask[];
  avatarSnapshots: AvatarSnapshot[];
  date: string;
  completed: boolean;
}

export interface ClientAcquisitionData {
  identify: IdentifySection;
  invite: {
    tasks: IdentifyTask[];
    date: string;
    completed: boolean;
  };
  converse: {
    tasks: IdentifyTask[];
    date: string;
    completed: boolean;
  };
}