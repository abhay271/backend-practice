const express = require('express');
const fs = require('fs');
const app = express();
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// Ensure files directory exists
const filesDir = path.join(__dirname, 'files');
if (!fs.existsSync(filesDir)) {
    fs.mkdirSync(filesDir, { recursive: true });
}

app.get('/', (req, res) => {
    fs.readdir(filesDir, (err, files) => {
        if (err) {
            console.error('Error reading files directory:', err);
            return res.render('index', { 
                files: [], 
                error: 'Error loading files',
                success: req.query.success || null
            });
        }
        
        // Filter out non-text files and get file contents
        const textFiles = files.filter(file => file.endsWith('.txt'));
        const fileContents = [];
        
        textFiles.forEach(file => {
            try {
                const content = fs.readFileSync(path.join(filesDir, file), 'utf-8');
                fileContents.push({
                    name: file.replace('.txt', ''),
                    content: content
                });
            } catch (readErr) {
                console.error(`Error reading file ${file}:`, readErr);
            }
        });
        
        res.render('index', { 
            files: fileContents, 
            error: req.query.error || null,
            success: req.query.success || null
        });
    });
});

app.post('/bolimaga', (req, res) => {
    const { url, details } = req.body;
    
    if (!url || !details) {
        return res.redirect('/?error=Please fill all fields');
    }
    
    const fileName = url.split(' ').join('') + '.txt';
    const filePath = path.join(filesDir, fileName);
    
    fs.writeFile(filePath, details, (err) => {
        if (err) {
            console.error('Error writing file:', err);
            return res.redirect('/?error=Error saving file');
        }
        res.redirect('/?success=File saved successfully');
    });
});

// Route to read a specific file
app.get('/read/:fileName', (req, res) => {
    const fileName = req.params.fileName;
    const filePath = path.join(filesDir, fileName + '.txt');
    
    fs.readFile(filePath, 'utf-8', (err, content) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.redirect('/?error=File not found');
        }
        
        res.render('read', { 
            fileName: fileName,
            fileContent: content
        });
    });
});

// Route to show rename form
app.get('/rename/:fileName', (req, res) => {
    const fileName = req.params.fileName;
    const filePath = path.join(filesDir, fileName + '.txt');
    
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            return res.redirect('/?error=File not found');
        }
        
        res.render('rename', { 
            oldFileName: fileName,
            error: req.query.error || null
        });
    });
});

// Route to handle file renaming
app.post('/rename/:fileName', (req, res) => {
    const oldFileName = req.params.fileName;
    const newFileName = req.body.newName;
    
    if (!newFileName || newFileName.trim() === '') {
        return res.redirect(`/rename/${oldFileName}?error=Please enter a new file name`);
    }
    
    if (newFileName === oldFileName) {
        return res.redirect(`/rename/${oldFileName}?error=New name must be different from current name`);
    }
    
    const oldFilePath = path.join(filesDir, oldFileName + '.txt');
    const newFilePath = path.join(filesDir, newFileName + '.txt');
    
    // Check if new file already exists
    fs.access(newFilePath, fs.constants.F_OK, (err) => {
        if (!err) {
            return res.redirect(`/rename/${oldFileName}?error=File with this name already exists`);
        }
        
        // Rename the file
        fs.rename(oldFilePath, newFilePath, (err) => {
            if (err) {
                console.error('Error renaming file:', err);
                return res.redirect(`/rename/${oldFileName}?error=Error renaming file`);
            }
            
            res.redirect('/?success=File renamed successfully');
        });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


