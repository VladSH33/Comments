export interface CommentType {
  id: string;
  userId: string;
  isLike: boolean;
  isDislike: boolean;
  text: string;
  createdAt: string;
  parentId: string | null;
}
