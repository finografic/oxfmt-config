export { base, css, json, markdown, sorting, typescript } from './config/formatting';

// Composable sorting group constants
export {
  SORTING_GROUP_API,
  SORTING_GROUP_HOOKS,
  SORTING_GROUP_LIB_UTILS,
  SORTING_GROUP_PAGES_COMPONENTS,
  SORTING_GROUP_REACT,
  SORTING_GROUP_SERVER_LAYERS,
  SORTING_GROUP_STYLES,
  SORTING_GROUP_TYPES_CONSTANTS,
  SORTING_GROUP_WORKSPACE,
} from './config/sorting-groups';

// Sorting presets (arrays of groups by project type)
export {
  SORT_PRESET_CLIENT,
  SORT_PRESET_CLI,
  SORT_PRESET_LIBRARY,
  SORT_PRESET_SERVER,
} from './config/sorting-groups/presets';

// Ignore patterns (global, and agent-specifi)
export { ignorePatterns } from './config/patterns/ignore.patterns';
export {
  AGENT_DOC_PATHS,
  AGENT_DOC_MARKDOWN_PATHS,
  agentMarkdown,
} from './config/patterns/agent-docs.patterns';
