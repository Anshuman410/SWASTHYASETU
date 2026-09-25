// In-memory persistent user repository for SwasthyaSetu
// Supports Admin creation of ASHA workers and Patient self-registration

export interface StoredUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "ADMIN" | "DOCTOR" | "ASHA" | "PATIENT";
  abhaId?: string;
  phone?: string;
  village?: string;
  specialty?: string;
  gender?: string;
  age?: number;
  createdAt: string;
}

// Global variable to survive hot-reloads in Node runtime
const globalForUsers = globalThis as unknown as {
  swasthyaUsers: StoredUser[] | undefined;
};

const INITIAL_USERS: StoredUser[] = [
  // Primary requested Admin credentials
  {
    id: "admin-1",
    name: "System Administrator",
    email: "admin@gmail.com",
    password: "admin@123",
    role: "ADMIN",
    createdAt: new Date().toISOString(),
  },
  // Secondary gov admin
  {
    id: "admin-2",
    name: "Vikram Malhotra",
    email: "admin@swasthya.gov.in",
    password: "password123",
    role: "ADMIN",
    createdAt: new Date().toISOString(),
  },
  // Default Doctor
  {
    id: "doctor-1",
    name: "Dr. Ramesh Sharma",
    email: "doctor@swasthya.gov.in",
    password: "password123",
    specialty: "General Medicine & Cardiology",
    role: "DOCTOR",
    createdAt: new Date().toISOString(),
  },
  // Default ASHA Worker
  {
    id: "asha-1",
    name: "Sunita Devi",
    email: "asha@swasthya.gov.in",
    password: "password123",
    village: "Sitapur Village Node A",
    phone: "+91 98765 43210",
    role: "ASHA",
    createdAt: new Date().toISOString(),
  },
  // Default Patient
  {
    id: "patient-1",
    name: "Rahul Kumar",
    email: "patient@swasthya.gov.in",
    abhaId: "9821-4432-1001",
    password: "password123",
    phone: "+91 98111 22334",
    role: "PATIENT",
    gender: "Male",
    age: 38,
    createdAt: new Date().toISOString(),
  },
];

export const userStore = {
  getUsers(): StoredUser[] {
    if (!globalForUsers.swasthyaUsers) {
      globalForUsers.swasthyaUsers = [...INITIAL_USERS];
    }
    return globalForUsers.swasthyaUsers;
  },

  findUser(identifier: string): StoredUser | undefined {
    const users = this.getUsers();
    const cleanId = identifier.trim().toLowerCase();
    return users.find(
      (u) =>
        u.email.toLowerCase() === cleanId ||
        (u.abhaId && u.abhaId.toLowerCase() === cleanId) ||
        (u.phone && u.phone.toLowerCase() === cleanId)
    );
  },

  verifyCredentials(identifier: string, password: string): StoredUser | null {
    const user = this.findUser(identifier);
    if (!user) return null;
    if (user.password === password) {
      return user;
    }
    return null;
  },

  registerPatient(data: {
    name: string;
    email: string;
    password: string;
    phone?: string;
    abhaId?: string;
    gender?: string;
    age?: number;
  }): { success: boolean; user?: StoredUser; error?: string } {
    const users = this.getUsers();
    const cleanEmail = data.email.trim().toLowerCase();

    if (users.some((u) => u.email.toLowerCase() === cleanEmail)) {
      return { success: false, error: "An account with this email already exists." };
    }

    const generatedAbha =
      data.abhaId && data.abhaId.trim().length > 4
        ? data.abhaId.trim()
        : `9821-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newUser: StoredUser = {
      id: `patient-${Date.now()}`,
      name: data.name.trim(),
      email: cleanEmail,
      password: data.password,
      role: "PATIENT",
      abhaId: generatedAbha,
      phone: data.phone?.trim() || "",
      gender: data.gender || "Not Specified",
      age: data.age || 25,
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    return { success: true, user: newUser };
  },

  createAshaWorker(data: {
    name: string;
    email: string;
    password: string;
    phone?: string;
    village: string;
  }): { success: boolean; user?: StoredUser; error?: string } {
    const users = this.getUsers();
    const cleanEmail = data.email.trim().toLowerCase();

    if (users.some((u) => u.email.toLowerCase() === cleanEmail)) {
      return { success: false, error: "An account with this email already exists." };
    }

    const newAsha: StoredUser = {
      id: `asha-${Date.now()}`,
      name: data.name.trim(),
      email: cleanEmail,
      password: data.password,
      role: "ASHA",
      village: data.village.trim(),
      phone: data.phone?.trim() || "",
      createdAt: new Date().toISOString(),
    };

    users.push(newAsha);
    return { success: true, user: newAsha };
  },

  getAshaWorkers(): StoredUser[] {
    return this.getUsers().filter((u) => u.role === "ASHA");
  },
};
