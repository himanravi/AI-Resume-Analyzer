// server/src/services/gemini.service.js

export async function analyzeWithGemini(resumeText, jobTitle, industry) {
    const apiKey = process.env.GEMINI_API_KEY;
    // We use a modern, reliable model name: 'gemini-1.5-flash-latest'
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;

    const prompt = `
    You are an expert career coach providing direct, actionable feedback on a resume.
    Analyze the following resume for a "${jobTitle}" position in the "${industry}" industry.

    RESUME TEXT:
    ${resumeText}

    YOUR TASK:
    For each major section of the resume (Summary, Experience, Skills, Projects, Education), provide a bulleted list of specific, constructive suggestions for improvement. Focus on using stronger action verbs, quantifying achievements with numbers, improving clarity, and ensuring alignment with the target role.

    IMPORTANT: Do NOT simply list or summarize the contents of the resume. Only provide the improvement suggestions for each section.

    OUTPUT FORMAT:
    Return your feedback as a simple JSON object with the following keys: "summary_feedback", "experience_feedback", "skills_feedback", "projects_feedback", and "overall_recommendations". The value for each key should be a single string containing your bulleted list of suggestions for that section.
    `;

    const requestBody = {
        contents: [{
            parts: [{ text: prompt }]
        }],
        generationConfig: {
            responseMimeType: "application/json",
        },
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
            const errorBody = await response.json();
            throw new Error(`API call failed with status ${response.status}: ${errorBody.error.message}`);
        }

        const data = await response.json();
        // The API's JSON response is in this specific location in the data structure
        return data.candidates[0].content.parts[0].text;

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw error;
    }
}