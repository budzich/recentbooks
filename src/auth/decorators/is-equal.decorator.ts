import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

export function IsEqual(property: string, validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [property],
      validator: IsEqualConstraint,
    });
  };
}

@ValidatorConstraint({ name: 'IsEqual' })
export class IsEqualConstraint implements ValidatorConstraintInterface {

  validate(value: any, args: ValidationArguments) {
    const [relatedPropertyName] = args.constraints;
    const relatedValue = (args.object as any)[relatedPropertyName];
    console.log(value, relatedValue);
    return value === relatedValue;
  }

}
