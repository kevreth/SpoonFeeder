import { describe, it, expect } from 'vitest';
import { dispatch2 } from './divergence.ts';  // Assuming this is the method name to test

describe('processData tests', () => {
  it('should return "open_multiple_urls" for input with multiple URLs', () => {
    const input = {
      "ID": [62, 63, 64, 356, 388, 389],
      "Name": [
        "Seymore Robert D",
        "Browning Consulting LLC",
      ],
      "URL": [
        "browningconsultingtexas.com",
        "robertseymore.com"
      ],
      "Phone": "8067986207",
      "Street": [
        "8207 HUDSON 100",
        "3330 70TH ST # 202",
      ],
      "Postal": [
        "79423",
        "79413"
      ]
    };

    const result = processData(input);  // Assuming this is the method you want to test
    expect(result).toBe('open_multiple_urls');
  });

  it('should return "open_single_url" for input with one URL', () => {
    const input = {
      "ID": [62, 63],
      "Name": [
        "Seymore  Robert D"
      ],
      "URL": [
        "robertseymore.com"
      ],
      "Phone": "8067986207",
      "Street": [
        "8207 HUDSON 100"
      ],
      "Postal": [
        "79423"
      ]
    };

    const result = processData(input);  // Assuming you want it to return 'open_single_url' in this case
    expect(result).toBe('open_single_url');
  });

  // Additional test cases can be added as needed for different scenarios
});
