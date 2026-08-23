import { parsePhoneNumberFromString } from 'libphonenumber-js';

export interface NormalizedPhoneNumber {
  phoneNumber: string;
  countryCode: string;
}

export function normalizePhoneNumber(
  value: string,
): NormalizedPhoneNumber | null {
  const parsed = parsePhoneNumberFromString(value.trim(), 'GH');
  if (!parsed?.isValid()) return null;

  return {
    phoneNumber: parsed.number,
    countryCode: `+${parsed.countryCallingCode}`,
  };
}
