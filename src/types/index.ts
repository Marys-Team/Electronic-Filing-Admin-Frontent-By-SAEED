interface User {
  id: string;
  username: string;
  email: string;
}

interface FormField {
  name: string;
  defaultValue: string;
  position: string;
  dataType: string;
  required: boolean;
  justification: string;
  description: string;
}

interface RecordDefinition {
  name: string;
  indicator: string;
  indicatorType: string;
  length: string;
  position: string;
  repeat: boolean;
  repeatCount?: string;
  fieldCount: string;
  fields: FormField[];
}