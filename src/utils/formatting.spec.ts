import { FormatUtils } from './formatting';

describe('FormatUtils', () => {
  test('title uppercases heading', () => {
    expect(FormatUtils.title('hash lab')).toContain('HASH LAB');
  });

  test('keyVal formats key and value', () => {
    expect(FormatUtils.keyVal('algo', 'sha256')).toContain('algo');
    expect(FormatUtils.keyVal('algo', 'sha256')).toContain('sha256');
  });
});
