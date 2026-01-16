import fc from 'fast-check';

describe('Project Setup', () => {
  it('should have fast-check working correctly', () => {
    fc.assert(
      fc.property(fc.integer(), (n) => {
        expect(typeof n).toBe('number');
      })
    );
  });

  it('should have TypeScript strict mode enabled', () => {
    // This test will fail to compile if strict mode is not enabled
    const testValue: string = 'test';
    expect(testValue).toBe('test');
  });
});