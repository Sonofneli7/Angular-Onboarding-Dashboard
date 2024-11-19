import { v4 as uuidv4 } from 'uuid';

export class Note {
  id: string; // No need for undefined here, it will always be assigned by uuid
  constructor(public title: string, public content: string) {
    this.id = uuidv4();  // Ensure id is generated on creation
  }
}
