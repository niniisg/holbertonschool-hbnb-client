// document.addEventListener('DOMContentLoaded', () => {
//   const loginForm = document.getElementById('login-form');
//   if (loginForm) {
//     loginForm.addEventListener('submit', async (event) => {
//       event.preventDefault();

//       const email = document.getElementById('email').value;
//       const password = document.getElementById('password').value;

//       try {
//         const response = await fetch('http://127.0.0.1:5000/login', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ email, password })
//         });

//         if (response.ok) {
//           const data = await response.json();
//           document.cookie = `token=${data.access_token}; path=/`;
//           window.location.href = 'index.html';
//         } else {
//           const errorData = await response.json();
//           alert(`login failed: ${errorData.description}`);
//         }
//       } catch (error) {
//         console.error('Error:', error);
//         alert('An error occurred. Please try again.');
//       }
//     });
//   }
// });

// function checkAuthentication() {
//       const token = getCookie('token');
//       const loginLink = document.getElementById('login-link');

//       if (!token) {
//           loginLink.style.display = 'block';
//       } else {
//           loginLink.style.display = 'none';
//           // Fetch places data if the user is authenticated
//           fetchPlaces(token);
//       }
//   }
//   function getCookie(name) {
//     // Get all cookies as a single string
//     const value = `; ${document.cookie}`;
    
//     // Split the string by the cookie name to isolate the desired cookie
//     const parts = value.split(`; ${name}=`);
    
//     // If the cookie is found, split it again to get the value
//     if (parts.length === 2) return parts.pop().split(';').shift();
    
//     // If the cookie is not found, return null
//     return null;
//   }
  
//   async function fetchPlaces(token) {
//     try {
//       // Make a GET request to the /api/places endpoint
//       const response = await fetch('http://127.0.0.1:5000/places', {
//         method: 'GET',
//         headers: {
//           // Include the JWT token in the Authorization header
//           'Authorization': `Bearer ${token}`,
//         }
//       });
  
//       // Check if the response is successful
//       if (response.ok) {
//         // Parse the JSON response
//         const places = await response.json();
        
//         // Pass the data to the displayPlaces function
//         displayPlaces(places);
//       } else {
//         // Handle the case where the response is not successful
//         alert('Failed to fetch places data.');
//       }
//     } catch (error) {
//       // Handle any errors that occur during the fetch operation
//       alert('An error occurred. Please try again.');
//     }
//   }

// function displayPlaces(places) {
//   // Get the element where the places will be displayed
//   const placesList = document.getElementById('places-list');
  
//   // Clear the current content of the places list
//   placesList.innerHTML = '';

//   // Iterate over the places data
//   places.forEach(place => {
//     // Create a div element for each place
//     const placeElement = document.createElement('div');
    
//     // Set the content of the div element
//     placeElement.textContent = `Name: ${place.name}, Location: ${place.location}`;
    
//     // Append the created element to the places list
//     placesList.appendChild(placeElement);
//   });
// }

// document.getElementById('country-filter').addEventListener('change', (event) => {
//   // Get the selected country value
//   const selectedCountry = event.target.value;

//   // Get all place elements
//   const placeElements = document.getElementById('places-list').children;

//   // Iterate over the places and show/hide them based on the selected country
//   Array.from(placeElements).forEach(placeElement => {
//     // Check if the place's location matches the selected country
//     if (placeElement.textContent.includes(`Location: ${selectedCountry}`) || selectedCountry === 'all') {
//       // Show the place element if it matches or if 'all' is selected
//       placeElement.style.display = 'block';
//     } else {
//       // Hide the place element if it doesn't match
//       placeElement.style.display = 'none';
//     }
//   });
// });

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      try {
        const response = await fetch('http://127.0.0.1:5000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password })
        });

        if (response.ok) {
          const data = await response.json();
          document.cookie = `token=${data.access_token}; path=/`;
          window.location.href = 'index.html';
        } else {
          const errorData = await response.json();
          alert(`login failed: ${errorData.description}`);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    });
  }

  checkAuthentication();
});

function checkAuthentication() {
  const token = getCookie('token');
  const loginLink = document.getElementById('login-link');

  if (!token) {
    loginLink.style.display = 'block';
  } else {
    loginLink.style.display = 'none';
    // Fetch places data if the user is authenticated
    fetchPlaces(token);
  }
}

function getCookie(name) {
  // Get all cookies as a single string
  const value = `; ${document.cookie}`;
  
  // Split the string by the cookie name to isolate the desired cookie
  const parts = value.split(`; ${name}=`);
  
  // If the cookie is found, split it again to get the value
  if (parts.length === 2) return parts.pop().split(';').shift();
  
  // If the cookie is not found, return null
  return null;
}

async function fetchPlaces(token) {
  try {
    // Make a GET request to the /api/places endpoint
    const response = await fetch('http://127.0.0.1:5000/places', {
      method: 'GET',
      headers: {
        // Include the JWT token in the Authorization
        'Authorization': `Bearer ${token}`
      }
    });

    // Check if the response is successful
    if (response.ok) {
      // Parse the JSON response
      const places = await response.json();
      
      // Pass the data to the displayPlaces function
      displayPlaces(places);
    } else {
      // Handle the case where the response is not successful
      alert('Failed to fetch places data.');
    }
  } catch (error) {
    // Handle any errors that occur during the fetch operation
    alert('An error occurred. Please try again.');
  }
}

function displayPlaces(places) {
  // Get the element where the places will be displayed
  const placesList = document.getElementById('places-list');
  
  // Clear the current content of the places list
  placesList.innerHTML = '';

  // Iterate over the places data
  places.forEach(place => {
    // Create a div element for each place
    const placeElement = document.createElement('div');
    
    // Set the content of the div element
    placeElement.textContent = `Name: ${place.name}, Location: ${place.location}`;
    
    // Append the created element to the places list
    placesList.appendChild(placeElement);
  });
}

// Add an event listener to the country filter dropdown
document.getElementById('country-filter').addEventListener('change', (event) => {
  // Get the selected country value
  const selectedCountry = event.target.value;

  // Get all place elements
  const placeElements = document.getElementById('places-list').children;

  // Iterate over the places and show/hide them based on the selected country
  Array.from(placeElements).forEach(placeElement => {
    // Check if the place's location matches the selected country
    if (placeElement.textContent.includes(`Location: ${selectedCountry}`) || selectedCountry === 'all') {
      // Show the place element if it matches or if 'all' is selected
      placeElement.style.display = 'block';
    } else {
      // Hide the place element if it doesn't match
      placeElement.style.display = 'none';
    }
  });
});