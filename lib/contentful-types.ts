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
  hasAward?: boolean;
  awardUrl?: string;
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

// About Page Types
export interface IServiceFields {
  title: string;
  description: string;
}

export interface ServiceSkeleton extends EntrySkeletonType {
  contentTypeId: 'service';
  fields: IServiceFields;
}

export interface IClientCategoryFields {
  title: string;
  clients: string;
}

export interface ClientCategorySkeleton extends EntrySkeletonType {
  contentTypeId: 'clientCategory';
  fields: IClientCategoryFields;
}

export interface IAboutPageFields {
  introduction: string;
  services: Entry<ServiceSkeleton>[];
  bioText: string[];
  clientCategories: Entry<ClientCategorySkeleton>[];
}

export interface AboutPageSkeleton extends EntrySkeletonType {
  contentTypeId: 'aboutPage';
  fields: IAboutPageFields;
} 