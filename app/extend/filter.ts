import moment from 'moment';

export function relativeTime(time: number) {
  return moment(new Date(time * 1000)).fromNow();
}

export function domain(url: string) {
  return url && url.split('/')[2];
}
