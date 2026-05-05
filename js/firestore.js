import { getFirestore,  doc, getDoc, getDocs, addDoc, collection } from "https://www.gstatic.com/firebasejs/12.12.0/firebase-firestore.js";
import { app } from "./auth.js";

const db = getFirestore(app);

var allData = '';

const querySnapshot = await getDocs(collection(db, "Service"));
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
    
  //allData += list(doc.data());
    //console.log(allData);
});



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

async function updateDB() {
    const data = {
        Btn: "Visit" ,
        CanView: true,
        Clicks: 0,
        Link: "/page/traffic.html",
        Location: "Website",
        MoreInfo: "See CCTV footage for macau",
        Name: "Macau Traffic",
        category: "Website",
    }
    try {
        const docRef = await addDoc(collection(db, "Service"), data);
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
};

document.getElementById('debug').addEventListener('click', updateDB);
