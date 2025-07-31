/* eslint-disable import/no-anonymous-default-export */

import aggregationsData from './aggregations.data';
import courseData from './course.data';

export default {
  hits: [courseData],
  total: 1,
  aggregations: [aggregationsData],
};
