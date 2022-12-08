import { IsNotEmpty } from 'class-validator';
import { validateClass } from './class.util';
import 'reflect-metadata';

test('validateClass throws error for missing field', () => {
  const config = {
    SAMPLE_CONFIG: '',
  };

  class Config {
    @IsNotEmpty()
    SAMPLE_CONFIG: string;
  }

  const fn = () => {
    validateClass(config, Config);
  };

  expect(fn).toThrowError();
});
