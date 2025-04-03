import { Entry, EntrySkeletonType } from 'contentful';

export interface IProjectFields {
  title: string;
  type: 'Book' | 'Sign';
  year: string;
  author: string;
  category: string;
  description: string;
  coverImage: any;
  images: any[];
}

export interface ProjectSkeleton extends EntrySkeletonType {
  contentTypeId: 'project';
  fields: IProjectFields;
}

export type Project = Entry<ProjectSkeleton>;

// Export a type for the getEntries query
export interface ProjectQuery {
  content_type: 'project';
  'fields.type'?: 'Book' | 'Sign';
} 