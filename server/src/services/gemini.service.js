// server/src/services/gemini.service.js

export async function analyzeWithGemini(resumeText, jobTitle, industry) {
    const apiKey = process.env.GEMINI_API_KEY;
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const prompt = `
    You are an expert ATS (Applicant Tracking System) analyzer...
    // (Your full prompt here)
    OUTPUT FORMAT:
    Return ONLY a valid JSON object...
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
        // The actual JSON output is in the first candidate's content part
        return data.candidates[0].content.parts[0].text;

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw error; // Re-throw the error to be caught by the controller
    }
}