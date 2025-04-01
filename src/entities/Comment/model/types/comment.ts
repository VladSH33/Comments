import { UserType } from '@/entities/User/model/types/user';

export interface CommentType {
  id: string;
  userId: string;
  parentId: string | null;
  parentReplies?: CommentType[];
  isLike: boolean;
  isDislike: boolean;
  text: string;
  createdAt: string;
  replies: CommentType[];
  user: UserType;
  isReplyComment: boolean;
}
