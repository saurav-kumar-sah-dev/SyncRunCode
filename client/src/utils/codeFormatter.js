// Simple code formatting utilities
export const formatCode = (code, language) => {
  if (!code || !language) return code;

  switch (language.toLowerCase()) {
    case 'javascript':
    case 'typescript':
      return formatJavaScript(code);
    case 'python':
      return formatPython(code);
    case 'json':
      return formatJSON(code);
    default:
      return code;
  }
};

const formatJavaScript = (code) => {
  // Basic JavaScript formatting
  return code
    .replace(/\s*{\s*/g, ' {\n  ')
    .replace(/;\s*/g, ';\n')
    .replace(/\s*}\s*/g, '\n}\n')
    .replace(/\n\s*\n/g, '\n')
    .trim();
};

const formatPython = (code) => {
  // Basic Python formatting - just clean up whitespace
  const lines = code.split('\n');
  let indentLevel = 0;
  
  return lines.map(line => {
    const trimmed = line.trim();
    if (trimmed.startsWith('}') || trimmed.startsWith(']') || trimmed.startsWith(')')) {
      indentLevel = Math.max(0, indentLevel - 1);
    }
    const result = '  '.repeat(indentLevel) + trimmed;
    if (trimmed.endsWith('{') || trimmed.endsWith('[') || trimmed.endsWith('(')) {
      indentLevel++;
    }
    return result;
  }).join('\n');
};

const formatJSON = (code) => {
  try {
    const parsed = JSON.parse(code);
    return JSON.stringify(parsed, null, 2);
  } catch (e) {
    return code; // Return original if not valid JSON
  }
};

export const validateCode = (code, language) => {
  if (!code || !language) return { isValid: true, errors: [] };

  const errors = [];

  switch (language.toLowerCase()) {
    case 'json':
      try {
        JSON.parse(code);
      } catch (e) {
        errors.push({
          line: 1,
          column: 1,
          message: e.message
        });
      }
      break;
    case 'javascript':
    case 'typescript':
      // Basic syntax validation
      const openBraces = (code.match(/{/g) || []).length;
      const closeBraces = (code.match(/}/g) || []).length;
      const openParens = (code.match(/\(/g) || []).length;
      const closeParens = (code.match(/\)/g) || []).length;
      const openBrackets = (code.match(/\[/g) || []).length;
      const closeBrackets = (code.match(/\]/g) || []).length;

      if (openBraces !== closeBraces) {
        errors.push({
          line: 1,
          column: 1,
          message: 'Mismatched braces'
        });
      }
      if (openParens !== closeParens) {
        errors.push({
          line: 1,
          column: 1,
          message: 'Mismatched parentheses'
        });
      }
      if (openBrackets !== closeBrackets) {
        errors.push({
          line: 1,
          column: 1,
          message: 'Mismatched brackets'
        });
      }
      break;
    default:
      // For other languages, basic validation
      break;
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};
