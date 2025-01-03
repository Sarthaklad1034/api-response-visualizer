// src/services/parser/jsonParser.js
export class JsonParserService {
    static parse(input) {
        if (!input || typeof input !== 'string') {
            throw new Error('Input must be a non-empty string');
        }

        try {
            // Remove comments and whitespace
            const cleanInput = input
                .replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, '$1')
                .trim();

            // Handle empty input after cleaning
            if (!cleanInput) {
                throw new Error('Input is empty after cleaning');
            }

            const parsed = JSON.parse(cleanInput);
            return {
                data: parsed,
                error: null,
                success: true
            };
        } catch (error) {
            return {
                data: null,
                error: `Parse error: ${error.message}`,
                success: false
            };
        }
    }

    static validate(input) {
        const result = this.parse(input);
        return {
            isValid: result.success,
            error: result.error
        };
    }
}