export class XmlParserService {
    static parse(input) {
        if (!input || typeof input !== 'string') {
            return {
                data: null,
                error: 'Input must be a non-empty string',
                success: false
            };
        }

        try {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(input.trim(), 'text/xml');

            // Check for parsing errors
            const parserError = xmlDoc.querySelector('parsererror');
            if (parserError) {
                return {
                    data: null,
                    error: parserError.textContent,
                    success: false
                };
            }

            // Convert XML to JSON-like object
            const xmlToObj = (node) => {
                if (node.nodeType === 3) { // Text node
                    const text = node.nodeValue.trim();
                    return text ? text : null;
                }

                const obj = {};

                // Handle attributes
                if (node.attributes && node.attributes.length > 0) {
                    obj['@attributes'] = {};
                    Array.from(node.attributes).forEach(attr => {
                        obj['@attributes'][attr.name] = attr.value;
                    });
                }

                // Handle child nodes
                let hasChildren = false;
                Array.from(node.childNodes).forEach(child => {
                    if (child.nodeType === 3 && !child.nodeValue.trim()) return; // Skip empty text nodes

                    hasChildren = true;
                    const childResult = xmlToObj(child);

                    if (child.nodeType === 3) { // Text node
                        if (childResult) {
                            obj['#text'] = childResult;
                        }
                    } else {
                        const nodeName = child.nodeName;
                        if (obj[nodeName]) {
                            if (!Array.isArray(obj[nodeName])) {
                                obj[nodeName] = [obj[nodeName]];
                            }
                            obj[nodeName].push(childResult);
                        } else {
                            obj[nodeName] = childResult;
                        }
                    }
                });

                // If node has no children or attributes, return text content
                if (!hasChildren && !obj['@attributes']) {
                    return node.textContent.trim() || null;
                }

                return obj;
            };

            const result = {
                [xmlDoc.documentElement.nodeName]: xmlToObj(xmlDoc.documentElement)
            };

            return {
                data: result,
                error: null,
                success: true
            };
        } catch (error) {
            return {
                data: null,
                error: `XML Parse error: ${error.message}`,
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