import React, { useState } from 'react';
import QuestionResult from './QuestionResult';
import axios from 'axios';
const API_KEY = "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";


const StudentForm = () => {
  // Add your dropdown menu options here
  const levels = ['Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'];
  const courses = ['Agricultural Science', 'Applied Design, Skills, and Technologies', 'Arabic', 'Art Education', 'Biology', 'Business Education', 'Career Education', 'Chemistry', 'Chinese (Mandarin)', 'Civics', 'Coding', 'Computer Science', 'Dance', 'Drama', 'Earth Science', 'Economics', 'Education Career Planning', 'English', 'Entrepreneurship', 'Environmental Science', 'Family Studies', 'Filipino', 'Financial Literacy', 'First Nations Studies', 'Food Studies', 'French', 'Geography', 'Geology', 'German', 'Global Perspectives', 'Health Education', 'History', 'Home Economics', 'Humanities', 'Information Technology', 'Italian', 'Japanese', 'Korean', 'Law Studies', 'Leadership', 'Life Science', 'Marketing', 'Mathematics', 'Media Arts', 'Music Education', 'Native Languages', 'Physical Education', 'Physics', 'Portuguese', 'Pre-Calculus', 'Psychology', 'Science', 'Social Studies', 'Spanish', 'Special Education', 'Technology Education', 'Tourism Studies', 'Visual Arts', 'Work Experience'];
  const countries = ['USA', 'Canada'];

  // Set initial states
  const [level, setLevel] = useState('');
  const [course, setCourse] = useState('');
  const [country, setCountry] = useState('');
  const [question, setQuestion] = useState('');
  const [result, setResult] = useState('');

  // Handle input change
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'level') setLevel(value);
    if (name === 'course') setCourse(value);
    if (name === 'country') setCountry(value);
    if (name === 'question') setQuestion(value);
  };
  const myPrompt = 'I am a student doing '+level + course +' in ' + country +', you are my teacher. I want you to explain to me ' + question;

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("submitted");
    if (!level || !course || !country || !question) {
      alert('Please fill in all fields');
      return;
    }

const APIBody ={ 
  "model": "text-davinci-003",
  "prompt": myPrompt ,
  "temperature": 0,
  "max_tokens": 60,
  "top_p": 1.0,
  "frequency_penalty": 0.0,
  "presence_penalty": 0.0
 };
 

 await fetch("https://api.openai.com/v1/completions", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + API_KEY
  },
  
  body: JSON.stringify(APIBody)
}).then((data) => {
  return data.json();
}).then((data) => {
  console.log(data);
  setResult(data.choices[0].text.trim());
    })  ;

    // try {
    //   const response = await axios.post(
    //     'http://localhost:5000/api/ask',
    //     {
    //       question: `I am a student doing ${level} ${course} in ${country}, you are my teacher. I want you to explain to me ${question}.`,
    //     },
    //     );
    
    //     const answer = response.data;
    //     setResult(answer);
    // } catch (error) {
    //   console.error('Error fetching answer:', error);
    // }
    console.log(myPrompt);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="level">Level/Class: </label>
          <select name="level" value={level} onChange={handleInputChange}>
            <option value="">Select Level/Class</option>
            {levels.map((level, index) => (
              <option key={index} value={level}>{level}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="course">Course/Subject: </label>
          <select name="course" value={course} onChange={handleInputChange}>
            <option value="">Select Course/Subject</option>
            {courses.map((course, index) => (
              <option key={index} value={course}>{course}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="country">Country: </label>
          <select name="country" value={country} onChange={handleInputChange}>
            <option value="">Select Country</option>
            {countries.map((country, index) => (
              <option key={index} value={country}>{country}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="question">Topic/Question: </label>
          <input
            type="text"
            name="question"
            value={question}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Ask Question</button>
      </form>
      <QuestionResult result={result} />
    </div>
  );
};

export default StudentForm;

 
