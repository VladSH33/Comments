import { IconName } from '@/shared/assets/icons';

export interface UserType {
  id: string;
  username: string;
  content: string | null;
  icon: IconName;
}
