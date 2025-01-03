// src/hooks/useJsonParser.js
import { useState } from 'react';
import { JsonParserService } from '../services/parser/jsonParser';

export const useJsonParser = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const parse = (jsonString) => {
        setIsLoading(true);
        setError(null);

        try {
            const result = JsonParserService.parse(jsonString);
            setIsLoading(false);

            if (result.error) {
                setError(result.error);
                return null;
            }

            return result;
        } catch (err) {
            setError(err.message);
            setIsLoading(false);
            return null;
        }
    };

    const validate = (jsonString) => {
        return JsonParserService.validate(jsonString);
    };

    return { parse, validate, error, isLoading };
};