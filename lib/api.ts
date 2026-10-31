export async function fetchAIAnswer(question: string): Promise<string> {
  const token = 'm6b1iix3k6owOFDDKm7qkYfS2bHTTYdTzvMLpbdWix0';

  try {
    const response = await fetch('/backend-api/answer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Opsi 1: Format Bearer standar
        'Authorization': `Bearer ${token}`,
        // Opsi 2: Cadangan jika backend meminta tanpa 'Bearer '
        'x-api-key': token,
      },
      body: JSON.stringify({ question }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText} (${response.status})`);
    }

    const data = await response.json();
    return data.answer || data.response || data.message || 'Maaf, Himu belum bisa menjawab saat ini.';
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}