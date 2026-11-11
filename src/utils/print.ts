export function printElement(elementId: string): void {
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

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>UMBRAL - Hoja de Preparación</title>
        <style>
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
          p { margin-bottom: 10px; }
          ul { margin-left: 20px; margin-bottom: 15px; }
          li { margin-bottom: 8px; }
          .checklist-item { display: flex; align-items: start; margin-bottom: 12px; }
          .checkbox { width: 20px; height: 20px; border: 2px solid #000; margin-right: 10px; flex-shrink: 0; }
          .item-text { flex: 1; }
          .item-label { font-weight: bold; }
          .item-desc { font-size: 10pt; color: #555; }
          .footer { margin-top: 40px; font-size: 10pt; border-top: 1px solid #ccc; padding-top: 15px; }
          @page { margin: 2cm; }
        </style>
      </head>
      <body>
        ${element.innerHTML}
      </body>
    </html>
  `);

  printWindow.document.close();
  printWindow.focus();

  setTimeout(() => {
    printWindow.print();
    printWindow.close();
  }, 250);
}
