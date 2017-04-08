import { Enode } from "../../common/types";

export class Document {
  id: number;
  code: string;
  title: string;
  description: string;
  created: Date;
  updated: Date;
  forms: Enode[];
}
