# File Manager Backend

A comprehensive Node.js backend application for creating, reading, and managing text files with a beautiful, modern web interface.

## ✨ Features

- 📝 **Create Files** - Create new text files with custom names and content
- 📖 **Read Files** - View complete file content in a dedicated reader page
- ✏️ **Rename Files** - Change file names with a user-friendly form
- 📂 **File Management** - View all files in a modern card layout
- 🎨 **Modern UI** - Beautiful, responsive design with gradient backgrounds
- ✅ **Form Validation** - Client-side and server-side validation
- 📱 **Mobile Responsive** - Works perfectly on all devices
- 🔄 **Real-time Feedback** - Success and error messages for all operations
- 🛡️ **Error Handling** - Comprehensive error handling and user feedback

## 🚀 Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

## 📖 Usage

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The application will be available at `http://localhost:3000`

## 📁 Project Structure

```
backend/
├── index.js              # Main server file with all routes
├── views/
│   ├── index.ejs         # Main dashboard template
│   ├── read.ejs          # File reader page template
│   └── rename.ejs        # File rename form template
├── files/                # Directory where text files are stored
├── package.json          # Dependencies and scripts
└── README.md             # This file
```

## 🔧 API Endpoints

### Main Routes
- `GET /` - Main dashboard with file list and creation form
- `POST /bolimaga` - Create a new text file

### File Operations
- `GET /read/:fileName` - Read complete file content
- `GET /rename/:fileName` - Show rename form for a file
- `POST /rename/:fileName` - Rename a file using fs.rename()

## 🎨 User Interface

### Dashboard Features
- **File Creation Form** - Create new files with name and content
- **File Cards** - Display files with preview content and action buttons
- **Action Buttons** - Read full content and rename options for each file
- **Responsive Grid** - Adaptive layout for different screen sizes

### File Reader Page
- **Full Content Display** - Complete file content with proper formatting
- **Navigation** - Easy navigation back to dashboard or to rename
- **Clean Layout** - Optimized for reading with monospace font

### File Rename Page
- **Current Name Display** - Shows the current file name (read-only)
- **New Name Input** - Form to enter the new file name
- **Validation** - Prevents duplicate names and empty submissions
- **Error Handling** - Clear error messages for all scenarios

## 🛠️ Technologies Used

- **Node.js** - Runtime environment
- **Express.js** - Web framework and routing
- **EJS** - Template engine for dynamic HTML
- **HTML5/CSS3** - Modern frontend styling with gradients and animations
- **JavaScript** - Client-side functionality and form validation
- **File System (fs)** - File operations (read, write, rename)

## 🔒 Security Features

- **Input Validation** - Server-side validation for all inputs
- **File Name Sanitization** - Removes spaces and special characters
- **Error Handling** - Comprehensive error handling for file operations
- **Path Security** - Uses proper path joining for cross-platform compatibility

## 📱 Responsive Design

- **Mobile First** - Optimized for mobile devices
- **Flexible Grid** - Adaptive card layout
- **Touch Friendly** - Large buttons and touch targets
- **Cross Browser** - Works on all modern browsers

## 🎯 Key Features

### File Management
- Create text files with custom names
- View file previews on dashboard
- Read complete file content
- Rename files with validation
- Automatic file directory creation

### User Experience
- Modern gradient design
- Smooth animations and transitions
- Auto-hiding alert messages
- Form validation with feedback
- Intuitive navigation

### Error Handling
- File not found scenarios
- Duplicate file name prevention
- Invalid input validation
- File system error handling
- User-friendly error messages

## 📄 License

ISC

---

**Note**: This application creates a `files/` directory automatically when first run to store all text files.
