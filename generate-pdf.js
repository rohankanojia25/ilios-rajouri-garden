const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const PORT = 3456;
const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const HTML_DIR = __dirname;
const OUTPUT_PDF = path.join(HTML_DIR, 'ilios-rajouri-garden-full-website.pdf');
const ROOT_OUTPUT_PDF = path.join('D:\\', 'ilios-website.pdf');

// 1. Simple HTTP static server
const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml'
};

const server = http.createServer((req, res) => {
  let reqPath = req.url === '/' ? '/index.html' : req.url;
  let filePath = path.join(HTML_DIR, reqPath.split('?')[0]);
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }
    const ext = path.extname(filePath);
    res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
    res.end(data);
  });
});

async function main() {
  server.listen(PORT, async () => {
    console.log(`Server listening on port ${PORT}`);

    // 2. Launch headless Chrome with debugging port
    const chrome = spawn(CHROME_PATH, [
      '--headless=new',
      '--disable-gpu',
      '--remote-debugging-port=9222',
      '--no-first-run',
      '--no-default-browser-check',
      '--user-data-dir=' + path.join(__dirname, '.chrome-temp'),
      `http://localhost:${PORT}/index.html`
    ]);

    // Give Chrome time to start debugging port
    await new Promise(r => setTimeout(r, 2000));

    try {
      // 3. Get WebSocket debugger URL from Chrome
      const versionRes = await fetch('http://localhost:9222/json/version');
      const versionData = await versionRes.json();
      const wsUrl = versionData.webSocketDebuggerUrl;
      console.log('Connecting to Chrome CDP at:', wsUrl);

      const ws = new WebSocket(wsUrl);

      await new Promise((resolve, reject) => {
        ws.onopen = resolve;
        ws.onerror = reject;
      });

      let id = 1;
      function send(method, params = {}) {
        return new Promise((resolve, reject) => {
          const reqId = id++;
          const handler = (evt) => {
            const data = JSON.parse(evt.data);
            if (data.id === reqId) {
              ws.removeEventListener('message', handler);
              if (data.error) reject(data.error);
              else resolve(data.result);
            }
          };
          ws.addEventListener('message', handler);
          ws.send(JSON.stringify({ id: reqId, method, params }));
        });
      }

      // 4. Create a target or find page target
      const targetsRes = await fetch('http://localhost:9222/json');
      const targets = await targetsRes.json();
      const pageTarget = targets.find(t => t.type === 'page');

      const pageWs = new WebSocket(pageTarget.webSocketDebuggerUrl);
      await new Promise((resolve, reject) => {
        pageWs.onopen = resolve;
        pageWs.onerror = reject;
      });

      function sendPage(method, params = {}) {
        return new Promise((resolve, reject) => {
          const reqId = id++;
          const handler = (evt) => {
            const data = JSON.parse(evt.data);
            if (data.id === reqId) {
              pageWs.removeEventListener('message', handler);
              if (data.error) reject(data.error);
              else resolve(data.result);
            }
          };
          pageWs.addEventListener('message', handler);
          pageWs.send(JSON.stringify({ id: reqId, method, params }));
        });
      }

      await sendPage('Page.enable');
      await sendPage('DOM.enable');
      await sendPage('Runtime.enable');

      // Set viewport
      await sendPage('Emulation.setDeviceMetricsOverride', {
        width: 1280,
        height: 900,
        deviceScaleFactor: 1,
        mobile: false
      });

      console.log('Waiting for network idle & rendering...');
      await new Promise(r => setTimeout(r, 3000));

      // Scroll through page to activate lazy-loading and observers
      await sendPage('Runtime.evaluate', {
        expression: `
          (async () => {
            document.querySelectorAll('.reveal').forEach(el => el.classList.add('active'));
            document.querySelectorAll('.counter').forEach(counter => {
              const target = parseFloat(counter.getAttribute('data-target'));
              const isDecimal = counter.getAttribute('data-decimal') === '1';
              const isComma = counter.getAttribute('data-format') === 'comma';
              if (isDecimal) counter.textContent = target.toFixed(1);
              else if (isComma) counter.textContent = target.toLocaleString('en-IN');
              else counter.textContent = target;
            });
            window.scrollTo(0, document.body.scrollHeight);
            await new Promise(r => setTimeout(r, 1000));
            window.scrollTo(0, 0);
            await new Promise(r => setTimeout(r, 500));
            await document.fonts.ready;
          })()
        `,
        awaitPromise: true
      });

      console.log('Generating PDF via Page.printToPDF...');
      const pdfResult = await sendPage('Page.printToPDF', {
        printBackground: true,
        preferCSSPageSize: false,
        marginTop: 0.4,
        marginBottom: 0.4,
        marginLeft: 0.4,
        marginRight: 0.4,
        paperWidth: 8.27, // A4 width in inches
        paperHeight: 11.69, // A4 height in inches
        scale: 0.92
      });

      const pdfBuffer = Buffer.from(pdfResult.data, 'base64');
      fs.writeFileSync(OUTPUT_PDF, pdfBuffer);
      fs.writeFileSync(ROOT_OUTPUT_PDF, pdfBuffer);

      console.log(`PDF saved successfully (${pdfBuffer.length} bytes):`);
      console.log('1.', OUTPUT_PDF);
      console.log('2.', ROOT_OUTPUT_PDF);

      pageWs.close();
      ws.close();
      chrome.kill();
      server.close();
      process.exit(0);
    } catch (err) {
      console.error('Error during PDF generation:', err);
      chrome.kill();
      server.close();
      process.exit(1);
    }
  });
}

main();
