const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

// LinkedIn banner dimensions: 1584 x 396 pixels
const BANNER_WIDTH = 1584;
const BANNER_HEIGHT = 396;

// Set canvas to LinkedIn banner size
canvas.width = BANNER_WIDTH;
canvas.height = BANNER_HEIGHT;

// Words that should light up when formed
const words = ['Rust', 'C++20', 'Kubernetes', 'Java', 'Spring Boot', 'CCNA', 'Software Engineer', 'Istanbul Turkey | Brussels, Belgium'];

// Characters to use in the matrix - just individual characters in a loop
const chars = ['R', 'u', 's', 't', 'C', '+', '+', '2', '0', 'K', 'u', 'b', 'e', 'r', 'n', 'e', 't', 'e', 's', 'J', 'a', 'v', 'a', 'S', 'p', 'r', 'i', 'n', 'g', ' ', 'B', 'o', 'o', 't', 'C', 'C', 'N', 'A', 'S', 'o', 'f', 't', 'w', 'a', 'r', 'e', ' ', 'E', 'n', 'g', 'i', 'n', 'e', 'e', 'r', 'I', 's', 't', 'a', 'n', 'b', 'u', 'l', ' ', 'T', 'u', 'r', 'k', 'e', 'y', ' ', '|', ' ', 'B', 'r', 'u', 's', 's', 'e', 'l', 's', ',', ' ', 'B', 'e', 'l', 'g', 'i', 'u', 'm'];

// Function to check if a sequence of characters forms a word
function checkWordMatch(sequence, word) {
    const seqStr = sequence.join('');
    return seqStr.includes(word);
}

// Font size optimized for banner
const fontSize = 18;

// Calculate number of columns
const columns = Math.floor(canvas.width / fontSize);

// Create array for drops - one per column
const drops = [];
const charIndices = []; // Track which character each column is on

for (let x = 0; x < columns; x++) {
    drops[x] = Math.random() * -100; // Random starting position
    charIndices[x] = x % chars.length; // Each column starts at different character
}

// Draw function
function draw() {
    // Semi-transparent black background for trail effect
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = fontSize + 'px monospace';

    // Loop through drops
    for (let i = 0; i < drops.length; i++) {
        const x = i * fontSize;

        // Build the current character sequence for the visible trail (20 characters)
        const trailLength = 20;
        const sequence = [];
        for (let k = 0; k < trailLength; k++) {
            const charIdx = (charIndices[i] - k + chars.length) % chars.length;
            sequence.push(chars[charIdx]);
        }
        sequence.reverse(); // Reverse to get correct order (oldest to newest, j=19 to j=0)

        // Check if any word is formed in this sequence
        let matchedWord = null;
        let wordStartPos = -1;
        let wordEndPos = -1;

        for (const word of words) {
            const wordChars = word.split('');
            // Check if word appears in sequence
            for (let start = 0; start <= sequence.length - wordChars.length; start++) {
                let match = true;
                for (let w = 0; w < wordChars.length; w++) {
                    if (sequence[start + w] !== wordChars[w]) {
                        match = false;
                        break;
                    }
                }
                if (match) {
                    matchedWord = word;
                    wordStartPos = start;
                    wordEndPos = start + wordChars.length - 1;
                    break;
                }
            }
            if (matchedWord) break;
        }

        // Draw a trail of characters falling down this column
        for (let j = 0; j < 20; j++) {
            const y = (drops[i] - j) * fontSize;

            // Only draw if character is visible on screen
            if (y >= -fontSize && y <= canvas.height + fontSize) {
                // Calculate which character to show for this position in the trail
                const charIndex = (charIndices[i] - j + chars.length) % chars.length;
                const text = chars[charIndex];

                // Check if this character is part of a matched word
                // j=0 is head (newest), j=19 is tail (oldest)
                // sequence[0] is oldest, sequence[19] is newest
                // So j maps to sequence index as: sequenceIndex = 19 - j
                const sequenceIndex = 19 - j;
                const isInWord = matchedWord && sequenceIndex >= wordStartPos && sequenceIndex <= wordEndPos;

                // Only light up if part of a word, otherwise faint green
                if (isInWord) {
                    // Cyan/blueish for matched word characters
                    ctx.fillStyle = '#00ffff';
                } else {
                    // Faint green for all other characters
                    ctx.fillStyle = 'rgba(0, 255, 65, 0.2)';
                }

                ctx.fillText(text, x, y);
            }
        }

        // Move to next character in sequence (every frame)
        charIndices[i] = (charIndices[i] + 1) % chars.length;

        // Reset drop to top after it has fallen
        if (drops[i] * fontSize > canvas.height) {
            drops[i] = 0;
        }

        // Increment Y position
        drops[i]++;
    }
}

// Download function - captures the current canvas state
function downloadBanner() {
    // Convert canvas to image and download
    canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'matrix-linkedin-banner.png';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, 'image/png');
}

// Add download button event listener
document.getElementById('downloadBtn').addEventListener('click', downloadBanner);

// Animation loop
setInterval(draw, 35);

