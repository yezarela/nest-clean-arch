import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';

export function validateClass(
  data: Record<string, unknown>,
  dataClass: ClassConstructor<any>,
) {
  const validatedData = plainToInstance(dataClass, data, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedData, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedData;
}
