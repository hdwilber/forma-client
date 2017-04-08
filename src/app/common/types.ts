export class Enode {
  id: string;
  created: Date;
  updated: Date;
  data: any;
  prevId: string;
  nextId: string;
  parentId: string;
  firstId: string;
  lastId: string;
  children: Enode[];
}
