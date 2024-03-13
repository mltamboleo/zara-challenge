export class characterItem {
  id: number;
  name: string;
  thumbnail: string;
  description?: string;

  constructor (id:number, name: string, thumbnail: string, description?: string) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.thumbnail = thumbnail;
  }
}
