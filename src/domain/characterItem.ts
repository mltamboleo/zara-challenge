export class CharacterItem {
  id: number;
  name: string;
  thumbnail: string;
  description?: string;

  constructor (id:number, name: string, thumbnail: string, description?: string) {
    this.id = id;
    this.name = name;
    this.thumbnail = thumbnail;
    this.description = description;
  }
}
