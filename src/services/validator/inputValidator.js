// src/services/validator/inputValidator.js
export const inputValidator = {
    validateJson: (jsonString) => {
        try {
            JSON.parse(jsonString);
            return { isValid: true, error: null };
        } catch (error) {
            return { isValid: false, error: error.message };
        }
    },

    validateXml: (xmlString) => {
        try {
            const parser = new DOMParser();
            const doc = parser.parseFromString(xmlString, 'text/xml');
            const parserError = doc.querySelector('parsererror');

            if (parserError) {
                return { isValid: false, error: parserError.textContent };
            }
            return { isValid: true, error: null };
        } catch (error) {
            return { isValid: false, error: "Invalid XML parser usage" };
        }
    }
};