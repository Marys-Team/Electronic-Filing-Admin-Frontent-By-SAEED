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
