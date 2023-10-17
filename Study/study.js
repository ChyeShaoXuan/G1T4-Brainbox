// study.js

// Mock API for flashcard content
const flashcardAPI = {
    getFlashcards: (level) => {
      // Replace this with a real API call
      // For simplicity, using static data here
      const data = [
        { topic: "Topic 1", subTopic: "Sub-topic 1" },
        // Add more flashcards as needed
      ];
  
      return Promise.resolve(data);
    }
  };
  
  function goToHome() {
    window.location.href = '../Home/home.html';
  }

  // Function to create a yellow flashcard
  function createFlashcard(topic, subTopic) {
    const cardElement = document.createElement("div");
    cardElement.classList.add("flashcard", "bg-yellow-300", "rounded-lg", "text-gray-800", "w-2/3", "h-80", "mx-auto", "my-4", "p-6", "text-center", "relative");
  
    // Content inside the flashcard
    cardElement.innerHTML = `
      <p class="text-2xl font-bold">${topic}</p>
      <p>${subTopic}</p>
      <div class="flex justify-end absolute bottom-4 right-4 space-x-4">
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded">Previous</button>
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded">Next</button>
      </div>
    `;
  
    return cardElement;
  }
  
  // Function to render flashcards
  function renderFlashcards(level) {
    const flashcardContainer = document.getElementById("flashcard-container");
    flashcardContainer.innerHTML = ""; // Clear previous content
  
    // Fetch flashcards from the API
    flashcardAPI.getFlashcards(level)
      .then(flashcards => {
        flashcards.forEach(flashcard => {
          const cardElement = createFlashcard(flashcard.topic, flashcard.subTopic);
          flashcardContainer.appendChild(cardElement);
        });
      })
      .catch(error => {
        console.error("Error fetching flashcards:", error);
      });
  }
  
  // Initial render
  renderFlashcards("easy"); // You can pass the initial level here
  
  // Event listener for level selection
  document.getElementById("level").addEventListener("change", () => {
    const selectedLevel = document.getElementById("level").value;
    renderFlashcards(selectedLevel);
  });