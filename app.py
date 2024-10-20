import os
from flask import Flask, request, jsonify
import PyPDF2 as pdf
import google.generativeai as genai
from dotenv import load_dotenv
from flask_cors import CORS

# Load environment variables
load_dotenv()

# Configure the Google Generative AI
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

app = Flask(__name__)
CORS(app)  # Enable CORS to allow requests from the React frontend

# Function to get the response from the Gemini model
def get_gemini_response(text):
    # Modify the prompt to extract only the relevant fields
    prompt = f"""
    Please extract the following details from the resume text: 
    Full Name, Email, Phone Number, Skills, LinkedIn URL, and GitHub URL. 
    Return the data in the following format:
    Full Name: [Name]
    Email: [Email or check it twice]
    Phone: [Phone Number]
    Skills: [Skills (comma-separated)]
    LinkedIn: [LinkedIn URL or https://www.linkedin.com/]
    GitHub: [GitHub URL or https://www.github.com/]
    
    Here is the resume text:
    {text}
    """
    
    # Call Gemini model to generate the structured response
    model = genai.GenerativeModel('gemini-pro')
    response = model.generate_content(prompt)
    return response.text

# Function to extract text from the uploaded PDF
def extract_pdf_text(file):
    reader = pdf.PdfReader(file)
    text = ""
    for page in range(len(reader.pages)):
        text += reader.pages[page].extract_text()
    return text

@app.route("/process", methods=["POST"])
def process_pdf():
    if 'pdf_doc' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['pdf_doc']
    
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    if file:
        # Extract text from the uploaded PDF
        extracted_text = extract_pdf_text(file)

        # Get a structured response from Gemini
        response_text = get_gemini_response(extracted_text)

        # Parse the response into structured fields
        data = parse_gemini_response(response_text)

        return jsonify(data)

    return jsonify({"error": "File upload failed"}), 500

# Function to parse the Gemini response into structured data for the form
def parse_gemini_response(response_text):
    data = {
        'fullName': '',
        'email': '',
        'phone': '',
        'skills': '',
        'linkedin': '',
        'github': ''
    }

    # Parse the Gemini response line by line
    for line in response_text.splitlines():
        if 'Full Name:' in line:
            data['fullName'] = line.split('Full Name:')[1].strip()
        elif 'Email:' in line:
            data['email'] = line.split('Email:')[1].strip()
        elif 'Phone:' in line:
            data['phone'] = line.split('Phone:')[1].strip()
        elif 'Skills:' in line:
            data['skills'] = line.split('Skills:')[1].strip()
        elif 'LinkedIn:' in line:
            data['linkedin'] = line.split('LinkedIn:')[1].strip()
        elif 'GitHub:' in line:
            data['github'] = line.split('GitHub:')[1].strip()

    return data

if __name__ == "__main__":
    app.run(port=8000, debug=True)
