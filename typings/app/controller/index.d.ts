// This file is created by egg-ts-helper@1.35.2
// Do not modify this file!!!!!!!!!
/* eslint-disable */

import 'egg';
import ExportDemo from '../../../app/controller/demo';
import ExportIndex from '../../../app/controller/index';

declare module 'egg' {
  interface IController {
    demo: ExportDemo;
    index: ExportIndex;
  }
}
