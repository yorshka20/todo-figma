export type PriorityText = '1' | '2' | '3' | '4';

export interface TodoListItem {
  id: string;
  title: string;
  content: string;
  tags: string[];
  priority: 'P1' | 'P2' | 'P3' | 'P4';
}
