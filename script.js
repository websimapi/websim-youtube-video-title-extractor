function extractTitle() {
  const urlInput = document.getElementById('videoUrl');
  const resultDiv = document.getElementById('result');
  const url = urlInput.value.trim();

  try {
    // Extract video ID from various YouTube URL formats
    const videoIdMatch = url.match(
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );
    if (!videoIdMatch) {
      throw new Error('Invalid YouTube URL');
    }
    const videoId = videoIdMatch[1];

    // Using the YouTube Data API v3 to fetch video details avoids cross-origin issues.
    // Replace 'YOUR_YOUTUBE_API_KEY' with your actual API key.
    const apiKey = 'YOUR_YOUTUBE_API_KEY';
    if (apiKey === 'YOUR_YOUTUBE_API_KEY') {
      resultDiv.textContent = 'You must provide a valid YouTube API key in the code.';
      return;
    }
    const apiUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`;

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`API request error: ${response.statusText}`);
        }
        return response.json();
      })
      .then(data => {
        if (data.items && data.items.length > 0) {
          const title = data.items[0].snippet.title;
          resultDiv.textContent = title || 'Title not found';
        } else {
          resultDiv.textContent = 'Video not found';
        }
      })
      .catch(error => {
        resultDiv.textContent = `Error: ${error.message}`;
      });
  } catch (error) {
    resultDiv.textContent = error.message;
  }
}