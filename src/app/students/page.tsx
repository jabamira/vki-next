<<<<<<< HEAD

import Students from '@/components/Students/Students';
import Page from '@/components/layout/Page/Page';
import { type Metadata } from 'next/types';

export const metadata: Metadata = {
  title: 'Группы - Вэб разработка ВКИ - Next.js шаблон',
  description: 'Шаблон для веб-разработки с использованием Next.js, React Hook Form, Yup, SCSS, Eslint, TanStack Query (React Query)',
=======
import Students from '@/components/Students/Students';
import Page from '@/components/layout/Page/Page';
import { META_DESCRIPTION, META_TITLE } from '@/constants/meta';
import { type Metadata } from 'next/types';

export const metadata: Metadata = {
  title: `Студенты - ${META_TITLE}`,
  description: META_DESCRIPTION,
>>>>>>> 32326f3665f87d153f5724e9b61a5c05c281b8e4
};

const StudentsPage = (): React.ReactNode => (
  <Page>
    <h1>Студенты</h1>
    <Students />
  </Page>
);

export default StudentsPage;
