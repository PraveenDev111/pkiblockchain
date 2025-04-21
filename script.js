async function generateKeyPair() {
    try {
        const keyPair = await window.crypto.subtle.generateKey(
            { name: "ECDSA", namedCurve: "P-256" },
            true,
            ["sign", "verify"]
        );

        // Export public and private keys
        const publicKey = await window.crypto.subtle.exportKey("spki", keyPair.publicKey);
        const privateKey = await window.crypto.subtle.exportKey("pkcs8", keyPair.privateKey);

        // Convert ArrayBuffer to Base64 (for easier display & storage)
        document.getElementById("publicKey").value = arrayBufferToBase64(publicKey);
        document.getElementById("privateKey").value = arrayBufferToBase64(privateKey);

        alert("Keys generated successfully!");
    } catch (error) {
        console.error("Key generation failed:", error);
        alert("Error generating keys. Try again.");
    }
}

// Helper function: Convert ArrayBuffer to Base64
function arrayBufferToBase64(buffer) {
    return btoa(String.fromCharCode(...new Uint8Array(buffer)));
}

// Allow user to download the private key securely
function downloadPrivateKey() {
    const privateKey = document.getElementById("privateKey").value;
    if (!privateKey) {
        alert("No private key generated yet!");
        return;
    }

    const blob = new Blob([privateKey], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "private-key.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}
