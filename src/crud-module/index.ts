import {
  apply,
  filter,
  MergeStrategy,
  mergeWith,
  move,
  noop,
  Rule,
  SchematicContext,
  SchematicsException,
  template,
  Tree,
  url,
} from '@angular-devkit/schematics';
import { experimental, normalize } from '@angular-devkit/core';
import { strings } from '@angular-devkit/core';

export async function setupOptions(host: Tree, options: any): Promise<Tree> {
  const workspaceConfig = host.read('/angular.json');
  if (!workspaceConfig) {
    throw new SchematicsException(
      'Could not find Angular workspace configuration'
    );
  }

  // convert workspace to string
  const workspaceContent = workspaceConfig.toString();

  // parse workspace string into JSON object
  const workspace: experimental.workspace.WorkspaceSchema = JSON.parse(
    workspaceContent
  );
  if (!options.project) {
    options.project = workspace.defaultProject;
  }

  const projectName = options.project as string;

  const project = workspace.projects[projectName];

  const projectType = project.projectType === 'application' ? 'app' : 'lib';

  if (options.path === undefined) {
    options.path = `${project.sourceRoot}/${projectType}`;
  }
  return host;
}

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function crudModule(options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    setupOptions(tree, options);

    const movePath = options.flat
      ? normalize(options.path)
      : normalize(options.path + '/' + strings.dasherize(options.name));

    const templateSource = apply(url('./files'), [
      options.spec ? noop() : filter((path) => !path.endsWith('.spec.ts')),
      template({
        ...strings,
        ...options,
      }),
      move(movePath),
    ]);

    const rule = mergeWith(templateSource, MergeStrategy.Default);

    return rule(tree, _context);
  };
}
