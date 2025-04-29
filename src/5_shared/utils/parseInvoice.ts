import bech32 from 'bech32';
import { Buffer } from 'buffer';

import { validateInternetIdentifier } from '../../5_shared/utils/internet-identifier';
import { decode } from 'bolt11';

const LIGHTNING_SCHEME = 'lightning';
const BOLT11_SCHEME_MAINNET = 'lnbc';
const BOLT11_SCHEME_TESTNET = 'lntb';
const LNURL_SCHEME = 'lnurl';

type LNResponse = {
  isLNURL: boolean;
  data: any;
  error?: string;
  isLNAddress?: boolean;
} | null;

export const parseInvoice = async (invoice: string): Promise<LNResponse> => {
  if (!invoice || invoice === '') {
    return null;
  }

  const lcInvoice = invoice.trim().toLowerCase();
  let requestCode = lcInvoice;

  // Check if this is a Lightning Address
  if (validateInternetIdentifier(requestCode)) {
    const response = await handleLightningAddress(requestCode);

    if (!response.success) {
      return {
        data: null,
        error: response.message,
        isLNURL: false,
        isLNAddress: true,
      };
    }

    return {
      data: response.data,
      isLNURL: true,
      isLNAddress: true,
    };
  }

  // Check if Invoice has `lightning` or `lnurl` prefixes
  const hasLightningPrefix = lcInvoice.indexOf(`${LIGHTNING_SCHEME}:`) !== -1;
  if (hasLightningPrefix) {
    requestCode = lcInvoice.slice(10);
  }

  const hasLNURLPrefix = lcInvoice.indexOf(`${LNURL_SCHEME}:`) !== -1;
  if (hasLNURLPrefix) {
    requestCode = lcInvoice.slice(6);
  }

  const isLNURL = requestCode.startsWith(LNURL_SCHEME);
  if (isLNURL) {
    return {
      isLNURL: true,
      data: await handleLNURL(requestCode),
    };
  } else {
    return {
      isLNURL: false,
      data: handleBOLT11(requestCode),
    };
  }
};

const handleLNURL = async (invoice: string): Promise<any> => {
  const decodedLNURL = bech32.decode(invoice, 1500);
  const url = Buffer.from(bech32.fromWords(decodedLNURL.words)).toString();
  const response = await fetch(url);
  return response.json();
};

type LightningAddressResponse = 
  | { success: true; data: any }
  | { success: false; message: string };

const handleLightningAddress = async (internetIdentifier: string): Promise<LightningAddressResponse> => {
  const addressArr = internetIdentifier.split('@');

  if (addressArr.length !== 2) {
    return {
      success: false,
      message: 'Invalid internet identifier format.',
    };
  }

  const [username, domain] = addressArr;

  if (!domain.includes('.')) {
    return {
      success: false,
      message: 'Invalid internet identifier format.',
    };
  }

  const url = `https://${domain}/.well-known/lnurlp/${username}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return {
      success: true,
      data: {
        ...data,
        domain,
        username,
      },
    };
  } catch {
    return {
      success: false,
      message: 'This identifier does not support Lightning Address yet.',
    };
  }
};

const handleBOLT11 = (invoice: string): ReturnType<typeof decode> | null => {
  if (!invoice.includes(BOLT11_SCHEME_MAINNET) && !invoice.includes(BOLT11_SCHEME_TESTNET)) {
    return null;
  }

  return decode(invoice);
};
