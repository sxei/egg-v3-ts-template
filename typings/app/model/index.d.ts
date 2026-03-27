// This file is created by egg-ts-helper@1.35.2
// Do not modify this file!!!!!!!!!
/* eslint-disable */

import 'egg';
import ExportDemo from '../../../app/model/Demo';

declare module 'egg' {
  interface IModel {
    Demo: ReturnType<typeof ExportDemo>;
  }
}
