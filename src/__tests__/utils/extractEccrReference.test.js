import { extractEccrReference } from '@/utils/extractEccrReference';

describe('extractEccrReference', () => {
  it('returns null if input is null', () => {
    expect(extractEccrReference(null)).toBeNull();
  });

  it('returns null if input is undefined', () => {
    expect(extractEccrReference(undefined)).toBeNull();
  });

  it('returns original string if no slash present', () => {
    expect(extractEccrReference('justOnePart')).toBe('justOnePart');
  });

  it('returns original string if only one slash present', () => {
    expect(extractEccrReference('first/second')).toBe('first/second');
  });

  it('returns last two parts after splitting by "/"', () => {
    expect(extractEccrReference('a/b/c/d')).toBe('c/d');
    expect(extractEccrReference('foo/bar/baz')).toBe('bar/baz');
  });

  it('handles empty string input', () => {
    expect(extractEccrReference('')).toBeNull();
  });

  it('handles edge case: exactly one slash', () => {
    expect(extractEccrReference('abc/def')).toBe('abc/def');
  });
});

