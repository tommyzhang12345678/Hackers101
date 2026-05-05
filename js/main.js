import { getFirestore,  doc, getDoc, getDocs, addDoc, collection } from "https://www.gstatic.com/firebasejs/12.12.0/firebase-firestore.js";
import { app, logout} from "./auth.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.12.0/firebase-auth.js";


    var allData = '';
    const db = getFirestore(app);


    const querySnapshot = await getDocs(collection(db, "Service"));
    querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
        
    allData += list(doc.data());
        //console.log(allData);
    });

    const downloadGrid = document.querySelector('.download-grid');
    downloadGrid.innerHTML = allData;



    export function list(data) {
        const cardHTML = `
            <div class="download-card" data-category="${data.category}" data-title="${data.Name.toLowerCase().replace(/\s/g, '-')}">
                <div class="card-header">
                    <div class="card-icon"><i class="fas fa-globe"></i></div>
                    <h3>${data.Name}</h3>
                </div>
                <p>${data.MoreInfo}</p>
                <div class="download-stats">
                    <div class="stat-item"><i class="fas fa-map-marker-alt"></i> ${data.Location}</div>
                    <div class="stat-item"><i class="fas fa-mouse-pointer"></i> ${data.Clicks}</div>
                </div>
                <button class="download-button link-button" 
                        onclick="window.open('${data.Link}', '_blank')"
                        ${data.CanView ? '' : 'disabled'}>
                    <i class="fas fa-download"></i> ${data.Btn}
                </button>
            </div>
        `;

        if (data.CanView) {
            return cardHTML;
        } else {
            return '';
        }
    }


// Search Functionality
document.querySelector('.search-box input').addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    document.querySelectorAll('.download-card').forEach(card => {
        const text = card.textContent.toLowerCase();
        card.style.display = text.includes(term) ? 'block' : 'none';
    });
});

// Category Filtering
document.querySelectorAll('.category-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        // Remove active class from all buttons
        document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        // Filter cards based on category
        const category = this.dataset.category;
        document.querySelectorAll('.download-card').forEach(card => {
            const cardCategory = card.dataset.category;
            card.style.display = (category === 'all' || cardCategory === category) ? 'block' : 'none';
        });
    });
});


//passord
function checkPassword(url) {
    const userInput = prompt("Please enter the password:");
    if (userInput === null) {
        alert("Password entry cancelled.");
        return;
    }
    fetch('/password.txt')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch password file');
            }
            return response.text();
        })
        .then(storedPassword => {
            if (userInput === storedPassword.trim()) {
                alert("Password correct! Redirecting...");
                window.location.href = url;
            } else {
                alert("Incorrect password!");
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert("Error fetching password file. Please try again later.");
        });
}
const auth = getAuth();
auth.onAuthStateChanged((user) => {
  if (user) {
    console.log("User is logged in:", user.email);
    document.body.style.display = "block";
  } else {
    window.location.href = "/Oauth/login.html";
    console.log("No user is logged in. Redirecting to login page.");
  }
});

document.getElementById('logout').addEventListener('click', logout);