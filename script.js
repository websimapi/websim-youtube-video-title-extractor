function extractTitle() {
  const urlInput = document.getElementById('videoUrl');
  const resultDiv = document.getElementById('result');
  const url = urlInput.value.trim();

  try {
    // Extract video ID from different YouTube URL formats
    const videoIdMatch = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
                
    if (!videoIdMatch) {
      throw new Error('Invalid YouTube URL');
    }

    const videoId = videoIdMatch[1];
    const embedUrl = `https://www.youtube.com/embed/${videoId}`;

    // Create an iframe to fetch title
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = embedUrl;
                
    iframe.onload = function() {
      try {
        const title = iframe.contentDocument.title;
        resultDiv.textContent = title || 'Title not found';
        document.body.removeChild(iframe);
      } catch (error) {
        resultDiv.textContent = 'Unable to extract title (Cross-Origin restrictions)';
      }
    };

    iframe.onerror = function() {
      resultDiv.textContent = 'Error extracting title';
    };

    document.body.appendChild(iframe);
  } catch (error) {
    resultDiv.textContent = error.message;
  }
}