// src/utils/constants.js
export const SUPPORTED_FORMATS = {
    JSON: 'json',
    XML: 'xml',
    PNG: 'png'
};

export const ERROR_MESSAGES = {
    INVALID_JSON: 'Invalid JSON format. Please check your input.',
    INVALID_XML: 'Invalid XML format. Please check your input.',
    EXPORT_FAILED: 'Failed to export the file. Please try again.',
    CLIPBOARD_FAILED: 'Failed to copy to clipboard. Please try again.',
    PARSE_ERROR: 'Failed to parse the input. Please check the format.',
};

export const FILE_TYPES = {
    JSON: {
        extension: '.json',
        mimeType: 'application/json'
    },
    XML: {
        extension: '.xml',
        mimeType: 'application/xml'
    },
    PNG: {
        extension: '.png',
        mimeType: 'image/png'
    }
};

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export const DEBOUNCE_DELAY = 300; // ms