import { ConfigurableModuleBuilder } from '@nestjs/common';
import { DatabaseModuleOptions } from './constants';

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
  new ConfigurableModuleBuilder<DatabaseModuleOptions>().build();
