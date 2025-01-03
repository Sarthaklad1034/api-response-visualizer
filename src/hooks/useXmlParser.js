import { useState } from 'react';
import { XmlParserService } from '../services/parser/xmlParser';

export const useXmlParser = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const parse = (xmlString) => {
        setIsLoading(true);
        setError(null);

        try {
            const result = XmlParserService.parse(xmlString);
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

    const validate = (xmlString) => {
        return XmlParserService.validate(xmlString);
    };

    return { parse, validate, error, isLoading };
};