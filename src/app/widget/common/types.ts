export class Widget{
  id: number;
  code: string;
  label: string;
  description: string;
  parentId: string;
  nextId: string;
  prevId: string;
  firstId: string;
  lastId: string;
  formId: string;
  type: string;
  subType: string;
};

export class InputWidget extends Widget {
  placeholder: string;
};

export class LabelWidget extends Widget{
  text: string;
  data: string;
}

export class OptionWidget extends Widget{
  text: string;
}
