# Notes App  

A simple notes application that allows users to create, read, update, and delete notes. This project is built using vanilla JavaScript, `XMLHTTPRequest`, and `JSON Server` for the backend.  

## Features  
- **Add Notes**: Create new notes with title and content validation.  
- **View Notes**: Fetch and display all notes dynamically from the server.  
- **Edit Notes**: Update existing notes easily.  
- **Delete Notes**: Remove notes with a single click.  
- **Validation**:  
  - Title: At least 6 characters.  
  - Content: At least 20 characters.  

## Technologies Used  
- HTML, CSS, JavaScript  
- JSON Server  
- `XMLHTTPRequest` for API requests  

## How to Run  
1. Clone the repository:  
   ```bash
   git clone https://github.com/ZiadGamalDev/notes-app.git
   cd notes-app
   ```
2. Install JSON Server globally (if not installed):
    npm install -g json-server
3. Start the JSON Server:
    json-server --watch db.json
4. Open index.html in your browser to use the app.
