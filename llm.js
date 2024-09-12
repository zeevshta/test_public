<script>
  console.log('JavaScript is running');
  const chatContainer = document.getElementById('chat-container');
  const chatMessages = document.getElementById('chat-messages');
  const messageInput = document.getElementById('message-input');
  const answerField = document.getElementById('answerField');
  const chatForm = document.getElementById('chat-form');

  const apiUrl = 'https://wiki.supersmart.me/llm/query';

  chatForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent page refresh
    console.log('Form submit event prevented');

    const message = messageInput.value;
    if (!message) {
      return;
    }

    console.log('Sending message:', message);

    const requestBody = {
      query: message,
      top_k: 5,
    };

    console.log('Request body:', requestBody);

    // Send the message to the API
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
      .then(response => {
      console.log('Response status:', response.status);
      if (!response.ok) {
        console.error('API request failed with status:', response.status);
        return Promise.reject('API request failed');
      }
      return response.text(); // Parse the response as text
    })
      .then(data => {
      console.log('Response data:', data);
      answerField.value = data; // Populate the answerField with the response
    })
      .catch(error => {
      console.error('Error occurred:', error);
      answerField.value = 'An error occurred while fetching the response';
    });

    messageInput.value = ''; // Clear the input field
  });
</script>