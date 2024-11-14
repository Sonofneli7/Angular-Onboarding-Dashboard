import { v4 as uuidv4 } from 'uuid';

export class Note {
  id: string | undefined;

  constructor(public title: string | undefined, public content: string | undefined) {
    this.id = uuidv4();
  }
}
