function breakTextIntoLines(text, maxCharsPerLine, maxWord) {
  const lines = [];
  let currentLine = '';
  let reachedMaxLength = false;

  for (let i = 0; i < text.length; i++) {
      const char = text[i];

      if (char === ' ' && currentLine.length > 0) {
          if (currentLine.length + 1 <= maxCharsPerLine) {
              currentLine += ' ';
          } else {lines.push(currentLine);
              currentLine = '';
          }
      } else { if (!reachedMaxLength) {
              currentLine += char;
          }
      }

      if (currentLine.length === maxCharsPerLine) {
          lines.push(currentLine);
          currentLine = '';
      }

      if (i >= maxWord) {
          if (currentLine.length > 0) {
              lines.push(currentLine.slice(0, maxWord) + '..');
              reachedMaxLength = true;
          }
          break;
      }
  }
 
  if (currentLine.length > 0 && !reachedMaxLength) {
      lines.push(currentLine);
  }

  return lines;
}

export { breakTextIntoLines };