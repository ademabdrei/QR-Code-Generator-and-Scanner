
# QR Code Generator and Scanner

The QR Code Generator and Scanner is a web-based application that allows users to generate and scan QR codes. It provides a simple and intuitive interface for creating QR codes from text or files, as well as scanning QR codes from uploaded images.

## Demo
You can try the QR Code Generator and Scanner live at: [https://qr-code-generator-and-scanners.netlify.app](https://qr-code-generator-and-scanners.netlify.app)
 
## Features
- Generate QR codes from text or files (TXT/PDF)
- Choose the color of the QR code
- Download the generated QR code as an image
- Scan QR codes from uploaded images
- Display the scanned QR code content
- Copy the scanned QR code content
- Download the scanned QR code content as a text file or PDF

## Technologies Used
- HTML
- CSS
- JavaScript
- [QRious](https://github.com/neocotic/qrious) (for generating QR codes)
- [jsQR](https://github.com/cozmo/jsQR) (for scanning QR codes)
- [jsPDF](https://github.com/parallax/jsPDF) (for generating PDF files)

## How to Use
1. Open the QR Code Generator and Scanner in your web browser.
2. In the "Generate QR Code" section:
   - Enter the text or URL you want to convert to a QR code.
   - (Optional) Choose a color for the QR code using the color picker.
   - Click the "Generate" button to create the QR code.
   - The generated QR code will be displayed in the canvas.
   - Click the "Download QR Code" button to download the QR code as an image.
3. In the "Scan QR Code" section:
   - Click the "Upload Image" button or drag and drop an image file (JPEG, PNG, etc.) containing a QR code.
   - The application will scan the image and display the QR code content.
   - Use the provided buttons to copy the result, download it as a text file, or download it as a PDF.

## Code Explanation
The QR Code Generator and Scanner is built using HTML, CSS, and JavaScript. It utilizes the following libraries:

1. **QRious**: This library is used to generate the QR codes and handle the display and color customization.
2. **jsQR**: This library is used to detect and extract the QR code data from the uploaded images.
3. **jsPDF**: This library is used to generate PDF files from the scanned QR code content.

The main JavaScript functions include:

- `generateQRCode()`: This function generates the QR code based on the input text or file content.
- `downloadQRCode()`: This function downloads the generated QR code as an image.
- `scanQRCode()`: This function scans the uploaded image for a QR code and displays the content.
- `copyResult()`, `downloadText()`, and `downloadPDF()`: These functions handle the copying and downloading of the scanned QR code content.

The HTML structure includes the input fields, color picker, canvas for displaying the QR code, and the file input for scanning QR codes. The CSS styles the layout and appearance of the application.

## Getting Started
To use the QR Code Generator and Scanner, simply open the `index.html` file in a web browser. No server-side setup is required, as the application is entirely client-side.

## Contributions
Contributions to this project are welcome. If you find any issues or have suggestions for improvements, please feel free to open a new issue or submit a pull request on the [GitHub repository](https://github.com/ademabdrei/QR-Code-Generator-and-Scanner).
