import { Transform } from 'stream';

export class Counter extends Transform {
  maxSize: number;

  length = 0;

  constructor(maxSize = 100000) {
    super();
    this.maxSize = maxSize;
  }

  _transform(chunk: any, encoding: string, callback: () => void) {
    this.length += chunk.length;

    if (this.length > this.maxSize) {
      this.destroy(new Error(`Max file size - ${this.maxSize} kb exceed!`));
      return;
    }

    this.push(chunk);
    callback();
  }
}
