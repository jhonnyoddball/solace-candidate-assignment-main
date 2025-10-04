// Type definitions for the Solace Advocates application

export type Advocate = {
  id: number;
  firstName: string;
  lastName: string;
  city: string;
  degree: string;
  specialties: string[];
  yearsOfExperience: number;
  phoneNumber: number;
  createdAt?: string | Date | null;
};

export type PaginationInfo = {
  limit: number;
  offset: number;
  total: number;
  hasMore: boolean;
};

export type ApiResponse<T> = {
  data: T[];
  pagination: PaginationInfo;
};
