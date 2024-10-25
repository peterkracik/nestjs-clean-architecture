import { ConfigurableModuleBuilder } from '@nestjs/common';
import { ResendEmailsModuleOptions } from './constants';

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
  new ConfigurableModuleBuilder<ResendEmailsModuleOptions>().build();
