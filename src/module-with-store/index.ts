import {
  Rule,
  SchematicContext,
  Tree,
  chain,
  schematic,
} from '@angular-devkit/schematics';

export default function (options: any): Rule {
  return (host: Tree, context: SchematicContext) => {
    return chain([
      schematic('crud-store', { ...options }),
      schematic('crud-module', {
        ...options,
      }),
    ])(host, context);
  };
}