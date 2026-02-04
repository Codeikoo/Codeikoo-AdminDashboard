import { HijriDateTimePipe } from './hijri-date-time.pipe';

describe('HijriDateTimePipe', () => {
  it('create an instance', () => {
    const pipe = new HijriDateTimePipe();
    expect(pipe).toBeTruthy();
  });
});
