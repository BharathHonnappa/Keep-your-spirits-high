// Handle "Add Your Product" button click
document.querySelector('.btn-sidebar').addEventListener('click', () => {
    console.log('Add Your Product clicked');
    // Placeholder for future functionality (e.g., open a form)
    alert('Add Your Product functionality coming soon!');
});

// Wave animation
const canvas = document.getElementById('waveCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size to window size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Handle window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Animation parameters
let time = 0;

function drawWave() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Array of wave configurations
    const waves = [
        { amplitude: 100, frequency: 0.005, offsetY: 0, color: '#ff4500' }, // Original wave
        { amplitude: 80, frequency: 0.006, offsetY: 120, color: '#ff6000' }, // Slightly different hue and offset
        { amplitude: 120, frequency: 0.004, offsetY: -120, color: '#ff3000' }, // Another variation
        { amplitude: 90, frequency: 0.007, offsetY: 200, color: '#ff7500' }, // Fourth wave
    ];

    // Draw each wave
    waves.forEach(wave => {
        ctx.beginPath();
        ctx.strokeStyle = wave.color;
        ctx.lineWidth = 5;

        for (let x = 0; x <= canvas.width; x += 5) {
            const y = canvas.height / 2 + Math.sin(x * wave.frequency + time) * wave.amplitude + wave.offsetY;
            if (x === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }

        ctx.stroke();
        ctx.closePath();
    });

    // Update time for animation
    time += 0.06;

    // Request next frame
    requestAnimationFrame(drawWave);
}

// Start animation
drawWave();
//---------------------------------------------------------------------------------------------------------------------------------
// Store ratings in memory
const ratings = {
    tequila: [],
    gin: [],
    rum: [],
    whiskey: []
};

// Initialize star rating system
document.querySelectorAll('.latest-review-box').forEach(box => {
    const stars = box.querySelector('.stars');
    const averageRatingDiv = box.querySelector('.average-rating');
    const productId = box.dataset.id;

    // Handle star clicks
    stars.querySelectorAll('.star').forEach(star => {
        star.addEventListener('click', () => {
            const rating = parseInt(star.dataset.value);
            ratings[productId].push(rating);

            // Update visual stars
            stars.querySelectorAll('.star').forEach(s => {
                s.classList.remove('rated-star');
                s.classList.add('unrated-star');
                if (parseInt(s.dataset.value) <= rating) {
                    s.classList.add('rated-star');
                    s.classList.remove('unrated-star');
                }
            });

            // Calculate and display average rating
            const average = ratings[productId].length
                ? (ratings[productId].reduce((a, b) => a + b, 0) / ratings[productId].length).toFixed(1)
                : 'Not yet rated';
            averageRatingDiv.textContent = `Average Rating: ${average} / 5`;
        });
    });

    // Handle hover effects
    stars.querySelectorAll('.star').forEach(star => {
        star.addEventListener('mouseover', () => {
            stars.querySelectorAll('.star').forEach(s => {
                s.classList.remove('rated-star');
                s.classList.add('unrated-star');
                if (parseInt(s.dataset.value) <= parseInt(star.dataset.value)) {
                    s.classList.add('rated-star');
                    s.classList.remove('unrated-star');
                }
            });
        });
        star.addEventListener('mouseout', () => {
            stars.querySelectorAll('.star').forEach(s => {
                s.classList.remove('rated-star');
                s.classList.add('unrated-star');
            });
            // Restore selected stars based on current rating
            const currentRating = ratings[productId].length
                ? Math.round(ratings[productId].reduce((a, b) => a + b, 0) / ratings[productId].length)
                : 0;
            stars.querySelectorAll('.star').forEach(s => {
                if (parseInt(s.dataset.value) <= currentRating) {
                    s.classList.add('rated-star');
                    s.classList.remove('unrated-star');
                }
            });
        });
    });
});
//----------------------------------------------------------------------------------------------------------------------------------------------
// Handle comment link click
document.querySelectorAll('.comment-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const popup = document.createElement('div');
        popup.className = 'popup';
        popup.innerHTML = '<p>Comment section under construction</p>';
        document.body.appendChild(popup);
        setTimeout(() => {
            popup.style.animation = 'fadeOut 0.5s ease-out forwards';
            setTimeout(() => popup.remove(), 500);
        }, 2500);
    });
});

// Handle read review link click
document.querySelectorAll('.read-review').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const officialLink = link.dataset.link;
        const popup = document.createElement('div');
        popup.className = 'popup review';
        popup.innerHTML = `<p>Official website: <a href="${officialLink}" target="_blank">${officialLink}</a></p>`;
        document.body.appendChild(popup);
        setTimeout(() => {
            popup.style.animation = 'fadeOut 0.5s ease-out forwards';
            setTimeout(() => popup.remove(), 500);
        }, 2500);
    });
});

