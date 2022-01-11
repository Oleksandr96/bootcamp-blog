export interface Tag {
  _id?: string;
  count?: number; // for aggregation list of popular tags
  name: string;
}
