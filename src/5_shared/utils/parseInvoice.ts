import { decode } from 'bolt11';

const LIGHTNING_SCHEME = 'lightning';
const BOLT11_SCHEME_MAINNET = 'lnbc';
const LNURL_SCHEME = 'lnurl';

type LNResponse = {
    data: any;
    error?: string;
} | null;

const validateInternetIdentifier = (internetIdentifier: string): boolean => {
    // to check for BOLT-12 payment types (and currnetly reject them)
    const re = /\S+@\S+\.\S+/;
    return re.test(internetIdentifier);
};

export const parseInvoice = async (invoice: string): Promise<LNResponse> => {
    if (!invoice || invoice === '') {
        return null;
    }

    const lcInvoice = invoice.trim().toLowerCase();
    let requestCode = lcInvoice;

    if (validateInternetIdentifier(requestCode)) {
        return {
            data: null,
            error: 'BOLT-12 & LNURL currently not supported',
        };
    }

    const hasLightningPrefix = lcInvoice.indexOf(`${LIGHTNING_SCHEME}:`) !== -1;
    if (hasLightningPrefix) {
        requestCode = lcInvoice.slice(10); // remove `lightning:` prefix
    }

    if (lcInvoice.startsWith(`${LNURL_SCHEME}:`)) {
        return {
            data: null,
            error: 'BOLT-12 & LNURL currently not supported',
        };
    }

    return {
        data: handleBOLT11(requestCode),
    };
};

const handleBOLT11 = (invoice: string): ReturnType<typeof decode> | null => {
    if (!invoice.includes(BOLT11_SCHEME_MAINNET)) {
        return null;
    }

    return decode(invoice);
};
