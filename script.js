    let qr;



    function handleFileSelect(event) {
      const file = event.target.files[0];
      if (!file) return;

      const fileInfo = document.getElementById('fileInfo');
      fileInfo.innerHTML = `<p>Selected file: ${file.name}</p>
                            <p>Type: ${file.type}</p>
                            <p>Size: ${formatBytes(file.size)}</p>`;

      const reader = new FileReader();
      reader.onload = function (event) {
        const fileContent = event.target.result;
        generateQRCode(fileContent);
      };
      reader.readAsText(file);
    }

    function formatBytes(bytes) {
      if (bytes === 0) return '0 Bytes';
      const k = 1024;
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    function generateQRCode(content) {
      let textInput;
      if (content) {
        textInput = content;
      } else {
        textInput = document.getElementById('textInput').value.trim();
      }

      if (!textInput) {
        document.getElementById('errorMessage').textContent = 'Please enter text or select a file.';
        return;
      }

      document.getElementById('errorMessage').textContent = '';

      if (qr) {
        qr.clear();
      }

      const color = document.getElementById('colorPicker').value;
      qr = new QRious({
        element: document.getElementById('qrCodeCanvas'),
        value: textInput,
        size: 300,
        foreground: color
      });
    }
    document.getElementById('clearButton').addEventListener('click', clearQRCode);

    function clearQRCode() {
      const canvas = document.getElementById('qrCodeCanvas');
      const context = canvas.getContext('2d');

      // Reset canvas dimensions to its original size
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;

      // Clear the canvas
      context.clearRect(0, 0, canvas.width, canvas.height);

      // Clear the QRious instance if exists
      if (qr) {
        qr.clear();
      }

      // Clear file input
      const fileInput = document.getElementById('fileInput');
      fileInput.value = '';

      // Clear file info
      const fileInfo = document.getElementById('fileInfo');
      fileInfo.innerHTML = '';

      document.getElementById('errorMessage').textContent = 'QR code cleared.';
    }





    function downloadQRCode() {
      if (!qr) {
        document.getElementById('errorMessage').textContent = 'Please generate a QR code first.';
        return;
      }
      document.getElementById('errorMessage').textContent = '';
      const canvas = document.getElementById('qrCodeCanvas');
      const url = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = url;
      a.download = 'qr_code.png';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }

    document.getElementById('colorPicker').addEventListener('input', function () {
      if (qr) {
        const color = this.value;
        qr.set({ foreground: color });
      }
    });

    function scanQRCode() {
      const fileInput = document.getElementById('fileInput');
      const file = fileInput.files[0];
      if (!file) {
        document.getElementById('ScanErrorMessage').textContent = 'Please select an image file.';
        return;
      }
      document.getElementById('ScanErrorMessage').textContent = '';

      const reader = new FileReader();
      reader.onload = function (event) {
        const img = new Image();
        img.onload = function () {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);

          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const qrCode = jsQR(imageData.data, imageData.width, imageData.height);

          if (qrCode) {
            // Clear previous result content
            document.getElementById('qrResult').innerHTML = '';
            // Display QR code data in a new div
            const resultContent = document.createElement('div');
            resultContent.textContent = qrCode.data;
            document.getElementById('qrResult').appendChild(resultContent);
          } else {
            document.getElementById('ScanErrorMessage').textContent = 'No QR code found in the image.';
          }
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }



    // Function to update the result content and display controls
    function updateResultContent(qrData) {
      const resultContent = document.getElementById('resultContent');
      resultContent.textContent = qrData;

      // Display the controls
      const controls = document.querySelector('.controls');
      controls.style.display = 'block';

      // Enable the buttons
      const copyButton = document.getElementById('copyButton');
      copyButton.disabled = false;

      const downloadTextButton = document.getElementById('downloadTextButton');
      downloadTextButton.disabled = false;

      const downloadPDFButton = document.getElementById('downloadPDFButton');
      downloadPDFButton.disabled = false;
    }

    // Function to copy the result
    function copyResult() {
      const resultContent = document.getElementById('resultContent');
      const tempInput = document.createElement('textarea');
      tempInput.value = resultContent.textContent;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand('copy');
      document.body.removeChild(tempInput);
      alert('Result copied to clipboard');
    }

    // Function to download as text
    function downloadText() {
      const resultContent = document.getElementById('resultContent');
      const textData = resultContent.textContent;
      const blob = new Blob([textData], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'qr_result.txt';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }

    // Function to download as PDF
    // Function to download as PDF
    function downloadPDF() {
      // Get the content to be included in the PDF
      const resultContent = document.getElementById('resultContent').textContent;

      // Create a new instance of jsPDF
      const doc = new jsPDF({
        orientation: 'portrait', // or 'landscape'
        unit: 'mm',
      });

      // Set the initial position and page height
      let y = 10;
      const pageHeight = doc.internal.pageSize.height - 20;

      // Split the content into lines
      const lines = doc.splitTextToSize(resultContent, doc.internal.pageSize.width - 20);

      // Loop through the lines and add them to the PDF
      lines.forEach(line => {
        // Check if adding the line exceeds the page height
        if (y + 10 > pageHeight) {
          doc.addPage(); // Add a new page
          y = 10; // Reset the y position
        }
        doc.text(10, y, line); // Add the line to the PDF
        y += 10; // Increment the y position
      });

      // Save the PDF file
      doc.save('qr_result.pdf');
    }



    // Function to scan QR code
    function scanQRCode() {
      const fileInput = document.getElementById('fileInput');
      const file = fileInput.files[0];
      if (!file) {
        document.getElementById('ScanErrorMessage').textContent = 'Please select an image file.';
        return;
      }
      document.getElementById('ScanErrorMessage').textContent = '';

      const reader = new FileReader();
      reader.onload = function (event) {
        const img = new Image();
        img.onload = function () {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);

          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const qrCode = jsQR(imageData.data, imageData.width, imageData.height);

          if (qrCode) {
            updateResultContent(qrCode.data); // Update the result content
          } else {
            document.getElementById('ScanErrorMessage').textContent = 'No QR code found in the image.';
          }
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }

