import { getIsAuthenticated } from '@/storage/auth';

export function authGuard(to: any, from: any, next: any) {
  if (getIsAuthenticated()) {
    next();
  } else {
  }
}