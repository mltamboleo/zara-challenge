export class comicItem {
  id: number;
  title: string;
  thumbnail: string;

  constructor (id: number, title: string, thumbnail: string) {
    this.id = id;
    this.title = title;
    this.thumbnail = thumbnail;
  }
}
