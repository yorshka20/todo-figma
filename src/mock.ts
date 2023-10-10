import type { TodoListItem } from './interface';

const tagList = [
  'health',
  'finance',
  'education',
  'casual',
  'travel',
  'pet',
  'reading',
  'movie',
  'food',
  'game',
  'music',
  'art',
];

function getRandomTag(count: number) {
  if (count >= tagList.length) {
    count = tagList.length;
  }
  const list = [];
  for (let i = 0; i < count; i++) {
    list.push(tagList[Math.round(Math.random() * count)]);
  }
  return list;
}

export const mockData: TodoListItem[] = Array.from({ length: 20 }).map(
  (_, i) => ({
    id: `${i}`,
    title: 'Lorem ipsum dolor',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat',
    tags: getRandomTag(Math.round(Math.random() * 5)),
    priority: `P${
      Math.round(Math.random() * 3) + 1
    }` as TodoListItem['priority'],
  }),
);
