export function printElement(
  elementId: string,
  options: { title?: string; language?: string } = {}
): void {
  const element = document.getElementById(elementId);
  if (!element) {
    console.warn(`Element with id "${elementId}" not found`);
    return;
  }

  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    console.warn('Could not open print window');
    return;
  }

  // Clone React-rendered DOM so translated strings are never interpolated as HTML.
  printWindow.opener = null;
  printWindow.document.documentElement.lang = options.language ?? document.documentElement.lang;
  printWindow.document.title = options.title ?? document.title;
  const style = printWindow.document.createElement('style');
  style.textContent = `
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: #000;
            padding: 2cm;
            max-width: 21cm;
            margin: 0 auto;
          }
          h1 { font-size: 24pt; margin-bottom: 20px; }
          h2 { font-size: 18pt; margin-top: 30px; margin-bottom: 15px; border-bottom: 2px solid #000; }
          h3 { font-size: 14pt; margin-top: 20px; margin-bottom: 10px; }
          h4 { font-size: 12pt; margin-top: 15px; margin-bottom: 8px; }
          p { margin-bottom: 10px; }
          ul, ol { margin-left: 20px; margin-bottom: 15px; }
          li { margin-bottom: 8px; }
          a { color: #000; overflow-wrap: anywhere; }
          h2, h3, h4 { break-after: avoid; }
          .checklist-item { display: flex; align-items: start; margin-bottom: 12px; }
          .checkbox { width: 20px; height: 20px; border: 2px solid #000; margin-right: 10px; flex-shrink: 0; }
          .item-text { flex: 1; }
          .item-label { font-weight: bold; }
          .item-desc { font-size: 10pt; color: #555; }
          .footer { margin-top: 40px; font-size: 10pt; border-top: 1px solid #ccc; padding-top: 15px; }
          @page { margin: 2cm; }
  `;
  printWindow.document.head.appendChild(style);
  element.childNodes.forEach(node => {
    printWindow.document.body.appendChild(printWindow.document.importNode(node, true));
  });

  printWindow.addEventListener('afterprint', () => printWindow.close(), { once: true });

  setTimeout(() => {
    printWindow.focus();
    printWindow.print();
  }, 250);
}
